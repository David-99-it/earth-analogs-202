#!/usr/bin/env python3
r"""Переименовывает подписи фильтров на главной: «Тема» -> «Фильтр по метке».
Запуск из папки проекта: python tools\rename_filter.py
Меняет только одну строку в locator_app/assets/app.js; повторный запуск безопасен."""
from pathlib import Path

P = Path(__file__).resolve().parent.parent / "locator_app" / "assets" / "app.js"
OLD = 'fTask:["Задача","Task"],fTopic:["Тема","Topic"],'
NEW = ('fTask:["Задача (меняет веса)","Task (sets the weights)"],'
       'fTopic:["Фильтр по метке (только скрывает места)","Tag filter (only hides sites)"],')

s = P.read_text(encoding="utf-8")
if NEW in s:
    print("уже исправлено")
elif s.count(OLD) == 1:
    P.write_text(s.replace(OLD, NEW), encoding="utf-8")
    print("Готово: подписи заменены")
else:
    print("Строка не найдена: откройте app.js, найдите fTopic и замените вручную (см. туториал)")
