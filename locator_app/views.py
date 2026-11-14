from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render

from . import dataset, metrics
from .models import Site


def index(request):
    return render(request, "index.html")


def _fact(m):
    metric = metrics.METRIC_BY_KEY.get(m.key)
    if not metric or not m.has_data():
        return None
    if metric["type"] == "set":
        v = [x.strip() for x in m.text.split(",") if x.strip()]
    elif metric["type"] == "bool":
        v = bool(m.value)
    else:
        v = m.value
    return {"v": v, "kind": m.kind, "src": m.source, "url": m.url, "date": m.date}


def _site(s):
    values = {}
    for m in s.measurements.all():
        f = _fact(m)
        if f:
            values[m.key] = f
    image = None
    if s.cloudinary_id:
        image = {"id": s.cloudinary_id, "credit": s.image_credit, "license": s.image_license, "page": s.image_page}
    return {
        "slug": s.slug,
        "name": [s.name_ru, s.name_en or s.name_ru],
        "region": [s.region_ru, s.region_en or s.region_ru],
        "lat": s.lat, "lon": s.lon, "area_km2": s.area_km2,
        "analog_for": s.analog_for, "tags": s.tag_list(),
        "understudied": s.understudied, "surface_data": s.surface_data,
        "values": values,
        "use": [s.use_ru, s.use_en or s.use_ru],
        "study": [s.study_ru, s.study_en or s.study_ru],
        "quirk": [s.quirk_ru, s.quirk_en or s.quirk_ru],
        "refs": s.refs or [],
        "image": image,
    }


def api(request):
    """Все данные одним ответом: параметры, цели, места. Сходство считает страница в браузере."""
    cfg = dataset.load_targets()
    images = dataset.load_images()
    targets = []
    for t in cfg.get("targets", []):
        t = dict(t)
        t["image"] = dataset.image_info(images.get(t["key"]))
        targets.append(t)
    sites = [_site(s) for s in Site.objects.filter(published=True).prefetch_related("measurements")]
    payload = {
        "config": {"cloud": getattr(settings, "CLOUDINARY_CLOUD_NAME", "") or ""},
        "metrics": metrics.METRICS,
        "origins": {k: list(v) for k, v in metrics.ORIGINS.items()},
        "kinds": {k: list(v) for k, v in metrics.KINDS.items()},
        "tags": [list(t) for t in metrics.TAGS],
        "presets": metrics.PRESETS,
        "targets": targets,
        "physics": cfg.get("physics", []),
        "sites": sites,
    }
    response = JsonResponse(payload, json_dumps_params={"ensure_ascii": False})
    response["Cache-Control"] = "public, max-age=60"
    return response
