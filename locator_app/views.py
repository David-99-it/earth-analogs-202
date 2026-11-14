from django.shortcuts import render
from django.http import JsonResponse
from .models import EarthAnalog


def index(request):
    return render(request, "index.html")


def get_analogs(request):
    analogs = EarthAnalog.objects.all()
    data = []
    for a in analogs:
        row = [
            a.name_ru,
            a.name_en,
            a.latitude,
            a.longitude,
            [
                a.score_geology,
                a.score_relief,
                a.score_temperature,
                a.score_water_ice,
                a.score_dust_wind,
                a.score_caves,
                a.score_life,
            ],
            1 if a.is_unexplored else 0,
            a.fit_ru,
            a.fit_en,
            a.break_ru,
            a.break_en,
            0,  # Индекс 10: системная локация
            a.moon_target_ru or "",  # 11
            a.moon_target_en or "",  # 12
            a.moon_desc_ru or "",  # 13
            a.moon_desc_en or "",  # 14
            a.mars_target_ru or "",  # 15
            a.mars_target_en or "",  # 16
            a.mars_desc_ru or "",  # 17
            a.mars_desc_en or "",  # 18
            # ТРИ ПОЛЯ КАРТИНОК ВМЕСТО ОДНОГО:
            getattr(a, "earth_image_url", getattr(a, "image_url", ""))
            or "",  # 19: Фото Земли
            getattr(a, "moon_image_url", "") or "",  # 20: Фото Луны
            getattr(a, "mars_image_url", "") or "",  # 21: Фото Марса
        ]
        data.append(row)
    return JsonResponse(data, safe=False)
