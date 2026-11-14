#!/usr/bin/env python3
"""Скачивает реальные данные NASA для каждого места из locator_app/data/sites.json.

Что берётся:
  * NASA POWER (климатология, точка на сетке ~50 км; метеорология MERRA-2):
        T2M, T2M_MAX, T2M_MIN  -> средняя, самая низкая, самая высокая температура, суточный размах
        PRECTOTCORR            -> осадки, мм/год
        WS2M                   -> скорость ветра на 2 м
  * ASTER GDEM v3 (NASA/METI) через OpenTopoData: сетка 9×9 точек на площади 20×20 км -> перепад высот.
    Если ASTER не покрывает точку (например, севернее 83° с. ш.), пробуется запасной набор, и это записывается в источник.

Результат: locator_app/data/measured.json. Каждое число хранит источник, ссылку и дату получения.
Недоступное значение НЕ заменяется нулём: оно просто не записывается (на сайте будет «нет данных»).

Запуск (нужен только Python 3.8+ и интернет, ничего устанавливать не надо):
    python tools/fetch_nasa_data.py                  все места
    python tools/fetch_nasa_data.py --only lonar,el-tatio
    python tools/fetch_nasa_data.py --force          перекачать заново
Можно прерывать и запускать снова: уже скачанное пропускается.
"""
import argparse
import datetime
import json
import math
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "locator_app" / "data"
POWER_BASE = "https://power.larc.nasa.gov/api/temporal/climatology/point"
TOPO_BASE = "https://api.opentopodata.org/v1/"
POWER_PARAMS = "T2M,T2M_MAX,T2M_MIN,PRECTOTCORR,WS2M"
COMMUNITIES = ["AG", "SB", "RE"]          # в разных «сообществах» POWER доступны разные параметры
TOPO_DATASETS = [("aster30m", "ASTER GDEM v3 (NASA/METI)"), ("mapzen", "Mapzen/Tilezen (сводный рельеф, запасной набор)")]
MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
UA = "NASA-Locator-hackathon/1.0 (student project)"
GRID_N = 9
HALF_KM = 10.0


def log(*a):
    print(*a, flush=True)


def http_json(url, timeout=90, retries=4):
    last = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            body = ""
            try:
                body = e.read().decode("utf-8", "replace")[:300]
            except Exception:
                pass
            last = f"HTTP {e.code}: {body}"
            if e.code in (429, 500, 502, 503, 504) and attempt < retries - 1:
                time.sleep(3 * (attempt + 1))
                continue
            raise RuntimeError(last)
        except (urllib.error.URLError, TimeoutError, ConnectionError, json.JSONDecodeError) as e:
            last = str(e)
            if attempt < retries - 1:
                time.sleep(3 * (attempt + 1))
                continue
            raise RuntimeError(last)
    raise RuntimeError(last or "неизвестная ошибка")


def clean(v):
    """Значения -999 и ниже в POWER означают «нет данных»."""
    if v is None:
        return None
    try:
        v = float(v)
    except (TypeError, ValueError):
        return None
    return None if v <= -900 or math.isnan(v) else v


def derive_power(par):
    """Из ответа POWER ({параметр: {JAN..DEC, ANN}}) получает наши параметры. Пропуски остаются пропусками."""
    out = {}
    t2m = par.get("T2M") or {}
    mx = par.get("T2M_MAX") or {}
    mn = par.get("T2M_MIN") or {}
    pr = par.get("PRECTOTCORR") or {}
    ws = par.get("WS2M") or {}
    v = clean(t2m.get("ANN"))
    if v is not None:
        out["temp_mean_c"] = round(v, 1)
    hi = [clean(mx.get(m)) for m in MONTHS]
    lo = [clean(mn.get(m)) for m in MONTHS]
    hi_ok = [x for x in hi if x is not None]
    lo_ok = [x for x in lo if x is not None]
    if len(hi_ok) >= 10:
        out["temp_max_c"] = round(max(hi_ok), 1)
    if len(lo_ok) >= 10:
        out["temp_min_c"] = round(min(lo_ok), 1)
    spans = [h - l for h, l in zip(hi, lo) if h is not None and l is not None]
    if len(spans) >= 10:
        out["temp_diurnal_c"] = round(sum(spans) / len(spans), 1)
    v = clean(pr.get("ANN"))
    if v is not None and v >= 0:
        out["precip_mm"] = round(v * 365.0, 1)       # POWER даёт мм/сутки
    v = clean(ws.get("ANN"))
    if v is not None and v >= 0:
        out["wind_ms"] = round(v, 1)
    return out


def fetch_power(lat, lon, base=POWER_BASE):
    """Пробует сообщества AG, SB, RE и берёт первое, что ответило. Возвращает (значения, сообщество)."""
    err = None
    for community in COMMUNITIES:
        q = urllib.parse.urlencode({"parameters": POWER_PARAMS, "community": community,
                                    "longitude": f"{lon:.4f}", "latitude": f"{lat:.4f}", "format": "JSON"})
        try:
            data = http_json(f"{base}?{q}")
        except RuntimeError as e:
            err = str(e)
            continue
        par = ((data.get("properties") or {}).get("parameter")) or {}
        got = derive_power(par)
        if got:
            return got, community
        err = "в ответе нет данных"
    raise RuntimeError("NASA POWER: " + (err or "нет ответа"))


def grid_points(lat, lon, half_km=HALF_KM, n=GRID_N):
    step = 2 * half_km / (n - 1)
    cos = max(math.cos(math.radians(lat)), 0.02)
    pts = []
    for i in range(n):
        for j in range(n):
            dy = -half_km + i * step
            dx = -half_km + j * step
            la = max(-89.999, min(89.999, lat + dy / 110.574))
            lo = lon + dx / (111.320 * cos)
            lo = ((lo + 180.0) % 360.0) - 180.0
            pts.append((la, lo))
    return pts


def fetch_relief(lat, lon, base=TOPO_BASE):
    """Перепад высот (макс. минус мин.) на сетке 9×9. Возвращает (метры, название набора) или (None, причина)."""
    pts = grid_points(lat, lon)
    loc = "|".join(f"{la:.5f},{lo:.5f}" for la, lo in pts)
    why = "нет данных"
    for ds, label in TOPO_DATASETS:
        try:
            data = http_json(f"{base}{ds}?" + urllib.parse.urlencode({"locations": loc}))
        except RuntimeError as e:
            why = str(e)
            continue
        if data.get("status") != "OK":
            why = str(data.get("error", data.get("status")))
            continue
        elev = [r.get("elevation") for r in data.get("results", [])]
        ok = [e for e in elev if isinstance(e, (int, float))]
        if len(ok) >= 0.7 * len(pts):
            return round(max(ok) - min(ok)), label
        why = f"{label}: покрытие {len(ok)} из {len(pts)} точек"
        time.sleep(1.1)
    return None, why


def load_json(path, default):
    if path.exists():
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    return default


def save_json(path, data):
    tmp = path.with_suffix(".tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    tmp.replace(path)


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", default="", help="коды мест через запятую")
    ap.add_argument("--force", action="store_true", help="перекачать, даже если уже есть")
    ap.add_argument("--skip-power", action="store_true")
    ap.add_argument("--skip-relief", action="store_true")
    ap.add_argument("--power-base", default=POWER_BASE)
    ap.add_argument("--topo-base", default=TOPO_BASE)
    ap.add_argument("--pause", type=float, default=1.2, help="пауза между запросами, секунды")
    ap.add_argument("--data-dir", default=str(DATA))
    args = ap.parse_args(argv)

    data_dir = Path(args.data_dir)
    sites = load_json(data_dir / "sites.json", [])
    if not sites:
        log("Не найден sites.json в", data_dir)
        return 2
    out_path = data_dir / "measured.json"
    measured = load_json(out_path, {})
    only = {x.strip() for x in args.only.split(",") if x.strip()}
    today = datetime.date.today().isoformat()

    done = failed = skipped = 0
    for s in sites:
        slug = s["slug"]
        if only and slug not in only:
            continue
        if not s.get("surface_data", True):
            log(f"[пропуск] {slug}: подземное место, климат поверхности его не описывает")
            skipped += 1
            continue
        cur = measured.get(slug, {})
        need_power = not args.skip_power and (args.force or "temp_mean_c" not in cur)
        need_relief = not args.skip_relief and (args.force or "relief_m" not in cur)
        if not need_power and not need_relief:
            log(f"[есть]    {slug}")
            skipped += 1
            continue
        log(f"[качаю]   {slug} ({s['lat']}, {s['lon']})")
        rec = dict(cur)
        ok_any = False
        if need_power:
            try:
                vals, community = fetch_power(s["lat"], s["lon"], args.power_base)
                src = "NASA POWER, климатология (метеорология MERRA-2, ячейка сетки ~50 км)"
                for k, v in vals.items():
                    rec[k] = {"v": v, "kind": "measured", "src": src, "url": "https://power.larc.nasa.gov/", "date": today}
                ok_any = True
                missing = [k for k in ("temp_mean_c", "temp_max_c", "temp_min_c", "temp_diurnal_c", "precip_mm", "wind_ms") if k not in vals]
                log("          POWER:", ", ".join(f"{k}={v}" for k, v in vals.items()) + (f"  (нет: {', '.join(missing)})" if missing else ""))
            except RuntimeError as e:
                log("          POWER не удалось:", e)
            time.sleep(args.pause)
        if need_relief:
            rel, label = fetch_relief(s["lat"], s["lon"], args.topo_base)
            if rel is not None:
                rec["relief_m"] = {"v": rel, "kind": "measured",
                                   "src": f"{label} через OpenTopoData: сетка {GRID_N}×{GRID_N} на площади {int(2 * HALF_KM)}×{int(2 * HALF_KM)} км",
                                   "url": "https://www.opentopodata.org/", "date": today}
                ok_any = True
                log(f"          рельеф: {rel} м ({label})")
            else:
                log("          рельеф не удалось:", label)
            time.sleep(args.pause)
        if ok_any:
            measured[slug] = rec
            save_json(out_path, measured)
            done += 1
        else:
            failed += 1

    log(f"\nГотово. Скачано: {done}, пропущено: {skipped}, с ошибкой: {failed}. Файл: {out_path}")
    if failed:
        log("Часть мест не скачалась. Запустите скрипт ещё раз: готовое он пропустит.")
    return 0 if (done or skipped) else 1


if __name__ == "__main__":
    sys.exit(main())
