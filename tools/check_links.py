r"""Проверка всех ссылок-источников в locator_app/data (sites.json, targets.json).

Запуск из корня проекта (при включённом venv):
    python tools\check_links.py

Для каждой ссылки печатает код ответа. 200 = страница открывается.
403/999 у научных издателей (doi.org, Science, Nature) часто значат «не пускают скрипты»,
а не «ссылка битая»: такие пометки проверьте в браузере. 404 и «ошибка» = нужно чинить.
"""
import json
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "locator_app" / "data"
UA = "Mozilla/5.0 (compatible; NASA-Locator-linkcheck/1.0)"


def walk(node, path, out):
    if isinstance(node, dict):
        for k, v in node.items():
            if k in ("url", "u") and isinstance(v, str) and v.startswith("http"):
                out.setdefault(v, []).append(path or "?")
            else:
                walk(v, f"{path}.{k}" if path else str(k), out)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk(v, f"{path}[{i}]", out)


def check(url):
    ctx = ssl.create_default_context()
    for method in ("HEAD", "GET"):
        safe = urllib.parse.quote(url, safe=":/?#[]@!$&'()*+,;=%~")
        req = urllib.request.Request(safe, method=method, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
                return r.status, r.geturl()
        except urllib.error.HTTPError as e:
            if method == "HEAD" and e.code in (403, 405, 400, 501):
                continue  # некоторые сайты не любят HEAD, пробуем GET
            return e.code, url
        except Exception as e:  # сеть, таймаут, SSL
            return f"ошибка: {type(e).__name__}", url
    return 0, url


def main():
    urls = {}
    for name in ("sites.json", "targets.json"):
        p = DATA / name
        if not p.exists():
            print("нет файла", p)
            continue
        walk(json.loads(p.read_text(encoding="utf-8")), name.split(".")[0], urls)
    print(f"Ссылок к проверке: {len(urls)}\n")
    with ThreadPoolExecutor(8) as ex:
        res = dict(zip(urls, ex.map(check, urls)))
    bad = 0
    for u in sorted(urls, key=lambda x: (str(res[x][0]) == "200", x)):
        code, final = res[u]
        ok = code == 200
        warn = code in (403, 999, 429)
        mark = "OK  " if ok else ("??  " if warn else "FAIL")
        if not ok and not warn:
            bad += 1
        print(f"{mark} {code!s:>14}  {u}")
        if not ok:
            print("                     где:", ", ".join(urls[u][:3]))
        elif final != u and final.rstrip("/") != u.rstrip("/"):
            print("                     перенаправление ->", final)
    print(f"\nИтого: {len(urls)} ссылок, из них не открылось: {bad}")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
