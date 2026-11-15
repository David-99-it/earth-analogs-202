r"""Правка текста про Деште-Лут в locator_app/data/sites.json: «около 70 °C» -> «80,8 °C».

Источник нового значения: NASA Earth Observatory, спутник MODIS, 2002-2019
(80,8 °C в пустынях Лут и Сонора). Запуск из корня проекта:
    python tools\fix_lut.py
Потом на сервере: git pull, python manage.py import_sites --clear, Reload.
"""
from pathlib import Path

P = Path(__file__).resolve().parent.parent / "locator_app" / "data" / "sites.json"
PAIRS = [
    (
        "здесь зафиксированы одни из самых высоких температур поверхности Земли, около 70 °C. Это температура грунта, а не воздуха.",
        "здесь зафиксирована одна из самых высоких температур поверхности Земли: 80,8 °C (MODIS, 2002–2019; столько же в пустыне Сонора). Это температура грунта, а не воздуха.",
    ),
    (
        "recorded some of the highest land-surface temperatures on Earth here, about 70 C. That is ground temperature, not air.",
        "recorded one of the highest land-surface temperatures on Earth here: 80.8 C (2002-2019; the same value as in the Sonoran Desert). That is ground temperature, not air.",
    ),
]

with open(P, encoding="utf-8", newline="") as f:
    text = f.read()
changed = 0
for old, new in PAIRS:
    if old in text:
        text = text.replace(old, new)
        changed += 1
    elif new in text:
        print("уже исправлено:", new[:50], "...")
    else:
        print("НЕ НАЙДЕНО (правьте вручную):", old[:60], "...")
if changed:
    with open(P, "w", encoding="utf-8", newline="") as f:
        f.write(text)
print(f"Готово, заменено фрагментов: {changed} из {len(PAIRS)}")
