#!/usr/bin/env python3
"""Проверяет файлы данных без Django: python tools/check_data.py
Печатает ошибки (если есть) и сводку: сколько мест, малоизученных, у скольких есть числа NASA и фото."""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from locator_app import dataset, metrics  # noqa: E402


def main():
    errors = dataset.validate()
    sites = dataset.load_sites()
    measured = dataset.load_measured()
    images = dataset.load_images()
    under = [s for s in sites if s.get("understudied")]
    with_nasa = [s["slug"] for s in sites if any(k in (measured.get(s["slug"]) or {}) for k in metrics.NUM_KEYS)]
    surface = [s["slug"] for s in sites if s.get("surface_data", True)]
    with_img = [k for k, e in images.items() if e.get("public_id")]
    print(f"Мест: {len(sites)}, малоизученных: {len(under)}")
    print(f"Числа NASA скачаны: {len(with_nasa)} из {len(surface)} мест с данными поверхности"
          + ("" if with_nasa else "  ← запустите python tools/fetch_nasa_data.py"))
    print(f"Фото в Cloudinary: {len(with_img)}" + ("" if with_img else "  ← см. tools/upload_images.py"))
    if errors:
        print(f"\nОШИБКИ ({len(errors)}):")
        for e in errors:
            print(" -", e)
        return 1
    print("\nДанные в порядке.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
