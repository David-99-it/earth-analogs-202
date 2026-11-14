#!/usr/bin/env python3
"""Находит свободные фото мест на Wikimedia Commons и загружает выбранные в облако Cloudinary.

Зачем облако: фото не лежат на вашем сервере. Сайт отдаёт браузеру только ссылку res.cloudinary.com,
а Cloudinary сам сжимает картинку (f_auto,q_auto) и подгоняет размер под экран, поэтому страница лёгкая.

Порядок работы:
  1) python tools/upload_images.py search            ищет кандидатов, ничего не загружает
  2) python tools/upload_images.py show              печатает выбор и ссылки, чтобы посмотреть глазами
  3) python tools/upload_images.py approve --all     (или --only lonar,el-tatio) отмечает проверенные
     Другая картинка: откройте locator_app/data/images.json и поменяйте "pick" на номер другого кандидата.
  4) python tools/upload_images.py upload            загружает одобренные в Cloudinary

Для шага 4 нужны три переменные окружения из панели Cloudinary (Dashboard):
  CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
Только стандартная библиотека Python. Лицензия и автор сохраняются и показываются на сайте под фото.
"""
import argparse
import hashlib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "locator_app" / "data"
COMMONS_API = "https://commons.wikimedia.org/w/api.php"
CLOUDINARY_API = "https://api.cloudinary.com/v1_1/"
UA = "NASA-Locator-hackathon/1.0 (student project; images via Wikimedia Commons API)"
OK_LICENSE = re.compile(r"^(CC BY(-SA)?\b|CC0|Public domain|PD)", re.I)
BAD_LICENSE = re.compile(r"\b(NC|ND)\b", re.I)
BAD_TITLE = re.compile(r"\b(map|maps|logo|flag|coat of arms|diagram|chart|icon|locator|location)\b", re.I)


def log(*a):
    print(*a, flush=True)


def http_json(url, data=None, timeout=90):
    req = urllib.request.Request(url, data=data, headers={"User-Agent": UA, "Accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = ""
        try:
            body = e.read().decode("utf-8", "replace")[:300]
        except Exception:
            pass
        raise RuntimeError(f"HTTP {e.code}: {body}")
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as e:
        raise RuntimeError(str(e))


def download_as_data_uri(url, retries=5):
    """Скачивает картинку на этом компьютере и возвращает data:-ссылку для загрузки в Cloudinary.
    Нужна, когда Wikimedia отказывает самому Cloudinary (429): с вашего компьютера лимит свой."""
    import base64
    last = None
    for attempt in range(retries):
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                ctype = r.headers.get("Content-Type", "image/jpeg").split(";")[0]
                return f"data:{ctype};base64," + base64.b64encode(r.read()).decode("ascii")
        except urllib.error.HTTPError as e:
            last = f"HTTP {e.code}"
            if e.code == 429 and attempt < retries - 1:
                time.sleep(20 * (attempt + 1))
                continue
            break
        except (urllib.error.URLError, TimeoutError) as e:
            last = str(e)
            time.sleep(5)
    raise RuntimeError("не удалось скачать картинку: " + str(last))


def strip_html(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


def load(path, default):
    if path.exists():
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    return default


def save(path, data):
    tmp = path.with_suffix(".tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    tmp.replace(path)


def wanted(data_dir):
    """Список (код, поисковая фраза) для всех мест и целей."""
    out = []
    for s in load(data_dir / "sites.json", []):
        out.append((s["slug"], s.get("image_query") or s["name"][1]))
    for t in load(data_dir / "targets.json", {}).get("targets", []):
        out.append((t["key"], t.get("image_query") or t["name"][1]))
    return out


def search_commons(query, api=COMMONS_API, limit=12):
    q = urllib.parse.urlencode({
        "action": "query", "format": "json", "generator": "search", "gsrnamespace": 6, "gsrlimit": limit,
        "gsrsearch": query + " filetype:bitmap", "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata", "iiurlwidth": 1600,
    })
    data = http_json(f"{api}?{q}")
    pages = list(((data.get("query") or {}).get("pages") or {}).values())
    pages.sort(key=lambda p: p.get("index", 999))
    out = []
    for p in pages:
        info = (p.get("imageinfo") or [{}])[0]
        meta = info.get("extmetadata") or {}
        lic = strip_html((meta.get("LicenseShortName") or {}).get("value"))
        title = p.get("title", "")
        if info.get("mime") not in ("image/jpeg", "image/png"):
            continue
        if (info.get("width") or 0) < 900:
            continue
        if not OK_LICENSE.search(lic) or BAD_LICENSE.search(lic):
            continue
        if BAD_TITLE.search(title):
            continue
        out.append({
            "title": title, "url": info.get("thumburl") or info.get("url"),
            "page": info.get("descriptionurl", ""),
            "author": strip_html((meta.get("Artist") or {}).get("value"))[:120] or "Wikimedia Commons",
            "license": lic, "w": info.get("width"), "h": info.get("height"),
        })
    return out[:5]


def cmd_search(args):
    data_dir = Path(args.data_dir)
    path = data_dir / "images.json"
    images = load(path, {})
    todo = [(k, q) for k, q in wanted(data_dir) if (not args.only or k in args.only)]
    for key, query in todo:
        cur = images.get(key, {})
        if (cur.get("public_id") or cur.get("candidates")) and not args.force:
            continue
        cands, err = None, None
        for attempt in range(6):
            try:
                cands = search_commons(query, args.commons_api)
                break
            except RuntimeError as e:
                err = e
                if "429" in str(e) and attempt < 5:
                    log(f"[ждём]    {key}: сервер просит притормозить, пауза {30 * (attempt + 1)} с")
                    time.sleep(30 * (attempt + 1))
                    continue
                break
        if cands is None:
            log(f"[ошибка]  {key}: {str(err)[:120]}")
            continue
        images[key] = {"query": query, "candidates": cands, "pick": 0, "approved": False,
                       "public_id": "", "credit": "", "license": "", "page": ""}
        log(f"[{'ok' if cands else 'пусто'}]    {key}: найдено {len(cands)}" + (f"  → {cands[0]['title']}" if cands else ""))
        save(path, images)
        time.sleep(args.pause)
    log("\nДальше: python tools/upload_images.py show")


def cmd_show(args):
    images = load(Path(args.data_dir) / "images.json", {})
    for key, e in images.items():
        c = e.get("candidates") or []
        mark = "загружено" if e.get("public_id") else ("одобрено" if e.get("approved") else "не проверено")
        log(f"{key}  [{mark}]")
        if c:
            p = c[min(e.get("pick", 0), len(c) - 1)]
            log(f"    {p['title']} | {p['license']} | {p['author']}\n    {p['page']}")
        else:
            log("    кандидатов нет: измените image_query в sites.json и повторите search")


def cmd_approve(args):
    path = Path(args.data_dir) / "images.json"
    images = load(path, {})
    n = 0
    for key, e in images.items():
        if (args.all or key in args.only) and e.get("candidates"):
            e["approved"] = True
            n += 1
    save(path, images)
    log(f"Одобрено: {n}")


def sign(params, secret):
    s = "&".join(f"{k}={v}" for k, v in sorted(params.items()) if k not in ("file", "cloud_name", "resource_type", "api_key"))
    return hashlib.sha1((s + secret).encode("utf-8")).hexdigest()


def cmd_upload(args):
    cloud = os.environ.get("CLOUDINARY_CLOUD_NAME", "")
    key = os.environ.get("CLOUDINARY_API_KEY", "")
    secret = os.environ.get("CLOUDINARY_API_SECRET", "")
    if not (cloud and key and secret):
        log("Не заданы CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET (см. инструкцию, шаг про Cloudinary).")
        return 2
    path = Path(args.data_dir) / "images.json"
    images = load(path, {})
    done = 0
    for k, e in images.items():
        if not e.get("approved") or (e.get("public_id") and not args.force):
            continue
        c = e.get("candidates") or []
        if not c:
            continue
        p = c[min(e.get("pick", 0), len(c) - 1)]
        pid = f"nasa-locator/{k}"
        params = {"public_id": pid, "timestamp": str(int(time.time())), "overwrite": "true"}
        def send(file_value):
            body = urllib.parse.urlencode({**params, "file": file_value, "api_key": key, "signature": sign(params, secret)}).encode()
            return http_json(f"{args.cloudinary_api}{cloud}/image/upload", data=body)
        try:
            try:
                res = send(p["url"])
            except RuntimeError as first:
                log(f"[повтор]  {k}: облако не смогло скачать файл ({str(first)[:60]}...), скачиваю сам")
                params["timestamp"] = str(int(time.time()))
                res = send(download_as_data_uri(p["url"]))
        except RuntimeError as err:
            log(f"[ошибка]  {k}: {str(err)[:200]}")
            continue
        e["public_id"] = res.get("public_id", pid)
        e["credit"] = f"{p['author']}, {p['license']}, Wikimedia Commons"
        e["license"] = p["license"]
        e["page"] = p["page"]
        save(path, images)
        done += 1
        log(f"[ok]      {k} → {e['public_id']}")
        time.sleep(0.3)
    log(f"\nЗагружено: {done}. Теперь: python manage.py import_sites  (подтянет фото в базу) и в settings.py укажите CLOUDINARY_CLOUD_NAME.")
    return 0


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("cmd", choices=["search", "show", "approve", "upload"])
    ap.add_argument("--only", default="", type=lambda s: {x.strip() for x in s.split(",") if x.strip()})
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--pause", type=float, default=2.5)
    ap.add_argument("--data-dir", default=str(DATA))
    ap.add_argument("--commons-api", default=COMMONS_API)
    ap.add_argument("--cloudinary-api", default=CLOUDINARY_API)
    args = ap.parse_args(argv)
    return {"search": cmd_search, "show": cmd_show, "approve": cmd_approve, "upload": cmd_upload}[args.cmd](args) or 0


if __name__ == "__main__":
    sys.exit(main())
