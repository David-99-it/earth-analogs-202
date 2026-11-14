from django.contrib import admin

from .metrics import METRIC_BY_KEY
from .models import Measurement, Site


class MeasurementInline(admin.TabularInline):
    model = Measurement
    extra = 0
    fields = ("key", "value", "text", "kind", "source", "url", "date")


@admin.register(Site)
class SiteAdmin(admin.ModelAdmin):
    list_display = ("name_ru", "region_ru", "analog_for", "understudied", "data_filled", "published")
    list_filter = ("analog_for", "understudied", "published")
    search_fields = ("name_ru", "name_en", "slug")
    prepopulated_fields = {"slug": ("name_en",)}
    inlines = [MeasurementInline]
    fieldsets = (
        ("Основное", {"fields": ("slug", "name_ru", "name_en", "region_ru", "region_en", "lat", "lon", "area_km2",
                                 "analog_for", "tags", "understudied", "surface_data", "published")}),
        ("Тексты", {"fields": ("use_ru", "use_en", "study_ru", "study_en", "quirk_ru", "quirk_en", "refs")}),
        ("Фото в облаке", {"fields": ("cloudinary_id", "image_credit", "image_license", "image_page")}),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related("measurements")

    @admin.display(description="Данные")
    def data_filled(self, obj):
        have = sum(1 for m in obj.measurements.all() if m.key in METRIC_BY_KEY and m.has_data())
        return f"{have} из {len(METRIC_BY_KEY)}"
