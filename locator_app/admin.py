from django.contrib import admin
from .models import EarthAnalog


@admin.register(EarthAnalog)
class EarthAnalogAdmin(admin.ModelAdmin):
    list_display = ("name_ru", "latitude", "longitude", "is_unexplored")
    list_filter = ("is_unexplored",)
    search_fields = ("name_ru", "name_en")
