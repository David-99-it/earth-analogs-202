from django.shortcuts import render
from django.http import JsonResponse
from .models import EarthAnalog


def index(request):
    return render(request, "index.html")


def get_analogs(request):
    analogs = EarthAnalog.objects.all()
    data = []
    for a in analogs:
        # Формируем структуру массива, точно как в var S в исходном файле
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
            0,  # Индекс 10: системная локация (не пользовательская)
            a.moon_target_ru,
            a.moon_target_en,
            a.moon_desc_ru,
            a.moon_desc_en,
            a.mars_target_ru,
            a.mars_target_en,
            a.mars_desc_ru,
            a.mars_desc_en,
        ]
        data.append(row)
    return JsonResponse(data, safe=False)
