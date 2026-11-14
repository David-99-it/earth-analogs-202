"""Чтение и проверка файлов данных. Без Django, поэтому проверяется и командой, и отдельным скриптом.

Файлы лежат в locator_app/data/:
  sites.json     места: координаты, тексты, факты из публикаций (лёд, пещеры, жизнь, происхождение) с источниками
  targets.json   эталоны Луны и Марса и физические различия планет
  measured.json  числа, скачанные скриптом tools/fetch_nasa_data.py из NASA POWER и ASTER GDEM
  images.json    фото в облаке Cloudinary (создаёт tools/upload_images.py)
"""
import json
from pathlib import Path

from .metrics import KINDS, METRIC_BY_KEY, METRIC_KEYS, ORIGINS, TAG_KEYS

DATA_DIR = Path(__file__).resolve().parent / "data"
ANALOG = ("moon", "mars", "both")


def read_json(name, default=None, data_dir=None):
    path = Path(data_dir or DATA_DIR) / name
    if not path.exists():
        return default
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def load_sites(data_dir=None):
    return read_json("sites.json", [], data_dir)


def load_targets(data_dir=None):
    return read_json("targets.json", {"targets": [], "physics": []}, data_dir)


def load_measured(data_dir=None):
    return read_json("measured.json", {}, data_dir)


def load_images(data_dir=None):
    return read_json("images.json", {}, data_dir)


def image_info(entry):
    """Из записи images.json делает {id, credit, license, page} или None, если фото ещё не загружено."""
    if not entry or not entry.get("public_id"):
        return None
    return {"id": entry["public_id"], "credit": entry.get("credit", ""),
            "license": entry.get("license", ""), "page": entry.get("page", "")}


def row_from_fact(key, fact):
    """Превращает факт {v, kind, src, url, date} в строку для модели Measurement."""
    metric = METRIC_BY_KEY[key]
    v = fact.get("v")
    value, text = None, ""
    if v is not None:
        if metric["type"] == "set":
            text = ",".join(v)
        elif metric["type"] == "bool":
            value = 1.0 if v else 0.0
        else:
            value = float(v)
    return dict(key=key, value=value, text=text, kind=fact.get("kind", "literature"),
                source=(fact.get("src") or "")[:300], url=(fact.get("url") or "")[:500],
                date=(fact.get("date") or "")[:20])


def site_rows(site, measured_for_site):
    """Все строки измерений места. Факты из sites.json важнее скачанных чисел."""
    rows = {}
    for key, fact in (measured_for_site or {}).items():
        if key in METRIC_BY_KEY and isinstance(fact, dict):
            rows[key] = row_from_fact(key, fact)
    for key, fact in (site.get("facts") or {}).items():
        rows[key] = row_from_fact(key, fact)
    return [r for r in rows.values() if r["value"] is not None or r["text"]]


def _check_fact(where, key, fact, errors):
    metric = METRIC_BY_KEY.get(key)
    if not metric:
        errors.append(f"{where}: неизвестный параметр «{key}»")
        return
    if not isinstance(fact, dict) or "v" not in fact:
        errors.append(f"{where}.{key}: нужен объект с полем v")
        return
    v = fact["v"]
    if fact.get("kind") not in KINDS:
        errors.append(f"{where}.{key}: kind должен быть одним из {list(KINDS)}")
    if v is None:
        return
    t = metric["type"]
    if t == "num":
        if isinstance(v, bool) or not isinstance(v, (int, float)):
            errors.append(f"{where}.{key}: ожидается число, получено {v!r}")
        elif not metric["min"] <= v <= metric["max"]:
            errors.append(f"{where}.{key}: {v} вне диапазона {metric['min']}…{metric['max']}")
    elif t == "bool":
        if not isinstance(v, bool):
            errors.append(f"{where}.{key}: ожидается true/false, получено {v!r}")
    elif t == "set":
        if not isinstance(v, list) or not v or any(x not in ORIGINS for x in v):
            errors.append(f"{where}.{key}: список из {list(ORIGINS)}")
    if not fact.get("src"):
        errors.append(f"{where}.{key}: не указан источник (src)")


def validate(data_dir=None):
    """Возвращает список ошибок (пустой список = данные в порядке)."""
    errors = []
    sites = load_sites(data_dir)
    measured = load_measured(data_dir)
    targets = load_targets(data_dir)
    seen = set()
    for s in sites:
        slug = s.get("slug", "?")
        if slug in seen:
            errors.append(f"{slug}: повторяющийся slug")
        seen.add(slug)
        if not (-90 <= s.get("lat", 999) <= 90 and -180 <= s.get("lon", 999) <= 180):
            errors.append(f"{slug}: координаты вне диапазона")
        if s.get("analog_for") not in ANALOG:
            errors.append(f"{slug}: analog_for должен быть moon, mars или both")
        bad = [t for t in s.get("tags", []) if t not in TAG_KEYS]
        if bad:
            errors.append(f"{slug}: неизвестные теги {bad}")
        for lang in ("name", "region", "use", "study", "quirk"):
            if len(s.get(lang, [])) != 2:
                errors.append(f"{slug}: поле {lang} должно быть парой [ru, en]")
        for key, fact in (s.get("facts") or {}).items():
            _check_fact(slug, key, fact, errors)
    for slug, facts in measured.items():
        if slug not in seen:
            errors.append(f"measured.json: места «{slug}» нет в sites.json")
            continue
        for key, fact in facts.items():
            if not key.startswith("_"):
                _check_fact("measured." + slug, key, fact, errors)
    keys = set()
    for t in targets.get("targets", []):
        if t["key"] in keys:
            errors.append(f"цель {t['key']}: повторяющийся key")
        keys.add(t["key"])
        for key, fact in t.get("values", {}).items():
            _check_fact("цель " + t["key"], key, fact, errors)
    return errors


def numeric_coverage(site, measured_for_site):
    """Сколько числовых параметров у места есть (для сводки при импорте)."""
    keys = {k for k, m in METRIC_BY_KEY.items() if m["type"] == "num"}
    have = {k for k in (measured_for_site or {}) if k in keys}
    return len(have), len(keys)
