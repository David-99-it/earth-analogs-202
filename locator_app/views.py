"""Views for the Earth analog locator app."""

from django.http import JsonResponse
from django.shortcuts import render

from .models import EarthAnalog


def index(request):
    """Render the main page with the interactive map and filters."""
    return render(request, "index.html")


def serialize_analog(analog):
    """Convert a model instance to the flat structure expected by the frontend."""
    return [
        analog.name_ru,
        analog.name_en,
        analog.latitude,
        analog.longitude,
        [
            analog.score_geology,
            analog.score_relief,
            analog.score_temperature,
            analog.score_water_ice,
            analog.score_dust_wind,
            analog.score_caves,
            analog.score_life,
        ],
        1 if analog.is_unexplored else 0,
        analog.fit_ru,
        analog.fit_en,
        analog.break_ru,
        analog.break_en,
        0,
        analog.moon_target_ru,
        analog.moon_target_en,
        analog.moon_desc_ru,
        analog.moon_desc_en,
        analog.mars_target_ru,
        analog.mars_target_en,
        analog.mars_desc_ru,
        analog.mars_desc_en,
    ]


def get_analogs(request):
    """Return all database analogs as JSON consumed by the map and list widgets."""
    data = [serialize_analog(analog) for analog in EarthAnalog.objects.all()]
    return JsonResponse(data, safe=False)
