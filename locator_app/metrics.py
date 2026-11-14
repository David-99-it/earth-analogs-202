"""Реестр параметров сравнения. Единственный источник правды для сервера и страницы.

Тип параметра:
  num  - число в реальных единицах. Сходство = 1 / (1 + ((a - b) / tau) ** 2).
         tau - допуск: разница, при которой совпадение равно 50 %.
  bool - да/нет. Совпадение 1 или 0.
  set  - набор признаков (происхождение породы). Совпадение = доля общих признаков (индекс Жаккара).

Главное правило: пропуск (None) НИКОГДА не считается нулём.
Параметр без значения у места или у цели просто исключается из расчёта, а доля учтённых данных
показывается отдельно как «покрытие».
"""

ORIGINS = {
    "impact": ("Ударное", "Impact"),
    "volcanic": ("Вулканическое", "Volcanic"),
    "hydrothermal": ("Гидротермальное", "Hydrothermal"),
    "sedimentary": ("Осадочное", "Sedimentary"),
    "evaporite": ("Соляные отложения", "Evaporite"),
    "glacial": ("Ледниковое", "Glacial"),
    "aeolian": ("Эоловое (ветровое)", "Aeolian"),
}

# Как получено значение. Показывается на странице значком рядом с числом.
KINDS = {
    "measured": ("Измерено NASA", "Measured by NASA"),
    "literature": ("Публикация", "Publication"),
    "inferred": ("Вывод по географии и климату", "Inferred from geography and climate"),
    "estimate": ("Оценка по диапазону из источника", "Estimate from a range in the source"),
    "physical": ("Физическое следствие", "Physical consequence"),
    "user": ("Введено вами", "Entered by you"),
}

METRICS = [
    dict(key="origin", type="set", unit="", unit_en="", tau=None,
         ru="Происхождение породы", en="Rock origin",
         hint_ru="Геологические карты и публикации. Сравнивается набор признаков: совпадение = доля общих.",
         hint_en="Geological maps and publications. A set of features is compared: match = share in common."),
    dict(key="relief_m", type="num", unit="м", unit_en="m", tau=800, min=0, max=9000, step=10,
         ru="Перепад высот на 20×20 км", en="Relief across 20x20 km",
         hint_ru="Максимум минус минимум высоты на сетке 9×9 точек вокруг места (квадрат 20×20 км): ASTER GDEM (NASA/METI). У Шеклтона: глубина кратера.",
         hint_en="Max minus min elevation on a 9x9 grid around the site (20x20 km square): ASTER GDEM (NASA/METI). Shackleton: crater depth."),
    dict(key="temp_mean_c", type="num", unit="°C", unit_en="°C", tau=20, min=-260, max=60, step=0.1,
         ru="Средняя температура воздуха", en="Mean air temperature",
         hint_ru="Среднегодовая температура на высоте 2 м: NASA POWER (T2M). У Марса: прибор MEDA. У Луны: температура дна кратера.",
         hint_en="Mean annual 2 m air temperature: NASA POWER (T2M). Mars: MEDA. Moon: crater floor temperature."),
    dict(key="temp_diurnal_c", type="num", unit="°C", unit_en="°C", tau=15, min=0, max=300, step=0.1,
         ru="Суточный размах температур", en="Daily temperature range",
         hint_ru="Средний T2M_MAX минус средний T2M_MIN за год: NASA POWER. У Езеро: 50–60 °C (MEDA).",
         hint_en="Mean T2M_MAX minus mean T2M_MIN over the year: NASA POWER. Jezero: 50-60 C (MEDA)."),
    dict(key="temp_min_c", type="num", unit="°C", unit_en="°C", tau=30, min=-260, max=60, step=0.1,
         ru="Самая низкая температура", en="Lowest temperature",
         hint_ru="Самый холодный месяц, среднее суточных минимумов: NASA POWER. У Луны: дно полярного кратера.",
         hint_en="Coldest month, mean daily minimum: NASA POWER. Moon: polar crater floor."),
    dict(key="temp_max_c", type="num", unit="°C", unit_en="°C", tau=30, min=-260, max=150, step=0.1,
         ru="Самая высокая температура", en="Highest temperature",
         hint_ru="Самый тёплый месяц, среднее суточных максимумов: NASA POWER.",
         hint_en="Warmest month, mean daily maximum: NASA POWER."),
    dict(key="precip_mm", type="num", unit="мм/год", unit_en="mm/yr", tau=100, min=0, max=6000, step=1,
         ru="Осадки", en="Precipitation",
         hint_ru="Годовая сумма осадков: NASA POWER (PRECTOTCORR × 365). У Луны и Марса жидких осадков нет.",
         hint_en="Annual precipitation: NASA POWER (PRECTOTCORR x 365). No liquid precipitation on the Moon or Mars."),
    dict(key="wind_ms", type="num", unit="м/с", unit_en="m/s", tau=3, min=0, max=40, step=0.1,
         ru="Скорость ветра", en="Wind speed",
         hint_ru="Среднегодовая скорость ветра на высоте 2 м: NASA POWER (WS2M). У Марса: MEDA. На Луне ветра нет.",
         hint_en="Mean annual wind speed at 2 m: NASA POWER (WS2M). Mars: MEDA. No wind on the Moon."),
    dict(key="ice", type="bool", unit="", unit_en="", tau=None,
         ru="Лёд или мерзлота", en="Ice or permafrost",
         hint_ru="Есть ли постоянный лёд или многолетняя мерзлота. Источник: публикации и карты мерзлоты.",
         hint_en="Whether permanent ice or permafrost is present. Source: publications and permafrost maps."),
    dict(key="caves", type="bool", unit="", unit_en="", tau=None,
         ru="Пещеры и лавовые трубки", en="Caves and lava tubes",
         hint_ru="Есть ли природные пещеры или лавовые трубки. Для Луны: ямы и возможная лавовая трубка по снимкам LRO.",
         hint_en="Whether natural caves or lava tubes exist. Moon: pits and a possible lava tube from LRO images."),
    dict(key="bio", type="bool", unit="", unit_en="", tau=None,
         ru="Интерес для поиска жизни", en="Astrobiology relevance",
         hint_ru="На Земле: найдены экстремофилы или признаки жизни. У цели: ищут ли там жизнь.",
         hint_en="On Earth: extremophiles or signs of life documented. For a target: whether life is searched for."),
]
METRIC_KEYS = [m["key"] for m in METRICS]
METRIC_BY_KEY = {m["key"]: m for m in METRICS}
NUM_KEYS = [m["key"] for m in METRICS if m["type"] == "num"]
BOOL_KEYS = [m["key"] for m in METRICS if m["type"] == "bool"]

TAGS = [
    ("rover", "Тест ровера", "Rover tests"),
    ("ice", "Лёд и ресурсы", "Ice and resources"),
    ("life", "Поиск жизни", "Life search"),
    ("shelter", "Укрытия и пещеры", "Shelters and caves"),
    ("thermal", "Жара и холод", "Heat and cold"),
    ("dust", "Пыль и ветер", "Dust and wind"),
]
TAG_KEYS = [t[0] for t in TAGS]


def _w(**kw):
    """Веса 0–5. Не названные параметры получают вес 1."""
    return {k: kw.get(k, 1) for k in METRIC_KEYS}


PRESETS = [
    dict(key="balanced", ru="Сбалансированно", en="Balanced", w={k: 3 for k in METRIC_KEYS}),
    dict(key="rover", ru="Тест ровера", en="Rover test",
         w=_w(relief_m=5, wind_ms=4, origin=3, temp_diurnal_c=3, temp_mean_c=2, precip_mm=2, ice=0, caves=0, bio=0)),
    dict(key="ice", ru="Лёд и ресурсы", en="Ice and resources",
         w=_w(ice=5, temp_min_c=5, temp_mean_c=4, precip_mm=3, origin=2, relief_m=2)),
    dict(key="life", ru="Поиск жизни", en="Life search",
         w=_w(bio=5, origin=4, precip_mm=3, temp_mean_c=3, temp_diurnal_c=2, ice=2)),
    dict(key="shelter", ru="Укрытия", en="Shelters",
         w=_w(caves=5, origin=4, temp_diurnal_c=3, temp_min_c=3, relief_m=2)),
    dict(key="thermal", ru="Жара и холод", en="Heat and cold",
         w=_w(temp_min_c=5, temp_max_c=5, temp_diurnal_c=5, temp_mean_c=4)),
    dict(key="dust", ru="Пыль и ветер", en="Dust and wind",
         w=_w(wind_ms=5, precip_mm=4, origin=3)),
]


# --------------------------------------------------------------------------------------
# Расчёт сходства. Страница считает то же самое на JavaScript (формулы совпадают 1 в 1).
# --------------------------------------------------------------------------------------

def metric_score(metric, a, b):
    """Совпадение одного параметра, от 0 до 1. None, если сравнить нельзя (нет значения)."""
    if a is None or b is None:
        return None
    t = metric["type"]
    if t == "num":
        d = (float(a) - float(b)) / metric["tau"]
        return 1.0 / (1.0 + d * d)
    if t == "bool":
        return 1.0 if bool(a) == bool(b) else 0.0
    if t == "set":
        A, B = set(a), set(b)
        if not A or not B:
            return None
        return len(A & B) / len(A | B)
    return None


def similarity(site, target, weights=None):
    """site, target: {ключ: значение или None}. weights: {ключ: 0..5}, по умолчанию 3 для всех.

    Возвращает dict:
      match    - итоговое сходство 0..1 или None, если сравнивать нечего
      coverage - доля веса параметров, по которым у места ЕСТЬ данные (среди тех, что определены у цели)
      parts    - {ключ: совпадение 0..1, None (у места нет данных) или отсутствует (у цели нет значения)}
      used, total - сколько параметров реально сравнено / сколько можно было сравнить
    """
    weights = weights or {k: 3 for k in METRIC_KEYS}
    num = den = w_all = 0.0
    used = total = 0
    parts = {}
    for m in METRICS:
        k = m["key"]
        w = weights.get(k, 0)
        if not w > 0:
            continue
        tv = target.get(k)
        if tv is None or (isinstance(tv, (list, tuple, set)) and not tv):
            continue  # у цели нет значения: сравнивать нечего, в расчёт не входит
        total += 1
        w_all += w
        s = metric_score(m, site.get(k), tv)
        if s is None:
            parts[k] = None
            continue
        parts[k] = s
        num += w * s
        den += w
        used += 1
    return dict(
        match=(num / den) if den else None,
        coverage=(den / w_all) if w_all else 0.0,
        parts=parts, used=used, total=total,
    )
