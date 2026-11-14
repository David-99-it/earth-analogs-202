from django.db import models


class EarthAnalog(models.Model):
    name_ru = models.CharField("Название (RU)", max_length=200)
    name_en = models.CharField("Название (EN)", max_length=200)
    latitude = models.FloatField("Широта")
    longitude = models.FloatField("Долгота")

    # Оценки (0-10)
    score_geology = models.FloatField("Геология")
    score_relief = models.FloatField("Рельеф")
    score_temperature = models.FloatField("Температура")
    score_water_ice = models.FloatField("Вода и лед")
    score_dust_wind = models.FloatField("Пыль и ветер")
    score_caves = models.FloatField("Пещеры")
    score_life = models.FloatField("Жизнь")

    is_unexplored = models.BooleanField("Малоизученная", default=False)

    fit_ru = models.CharField("Для чего подходит (RU)", max_length=255)
    fit_en = models.CharField("Для чего подходит (EN)", max_length=255)

    break_ru = models.CharField("Где аналогия ломается (RU)", max_length=255)
    break_en = models.CharField("Где аналогия ломается (EN)", max_length=255)

    def __str__(self):
        return self.name_ru
