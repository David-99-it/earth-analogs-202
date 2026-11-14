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

    # --- НОВЫЕ ПОЛЯ ДЛЯ КОСМИЧЕСКИХ ОБЪЕКТОВ ---
    moon_target_ru = models.CharField(
        "Объект на Луне (RU)",
        max_length=255,
        default="Южный полюс (Кратер Шеклтон)",
        blank=True,
    )
    moon_target_en = models.CharField(
        "Объект на Луне (EN)",
        max_length=255,
        default="South Pole (Shackleton Crater)",
        blank=True,
    )
    moon_desc_ru = models.CharField(
        "Что это на Луне (RU)",
        max_length=255,
        default="Зона вечной тени с залежами водяного льда в реголите",
        blank=True,
    )
    moon_desc_en = models.CharField(
        "Что это на Луне (EN)",
        max_length=255,
        default="Permanently shadowed region with water ice in regolith",
        blank=True,
    )

    mars_target_ru = models.CharField(
        "Объект на Марсе (RU)", max_length=255, default="Кратер Езеро", blank=True
    )
    mars_target_en = models.CharField(
        "Объект на Марсе (EN)", max_length=255, default="Jezero Crater", blank=True
    )
    mars_desc_ru = models.CharField(
        "Что это на Марсе (RU)",
        max_length=255,
        default="Древняя дельта реки с глинистыми и сульфатными породами",
        blank=True,
    )
    mars_desc_en = models.CharField(
        "Что это на Марсе (EN)",
        max_length=255,
        default="Ancient river delta with clay and sulfate minerals",
        blank=True,
    )

    # Ссылка на фото объекта (например, с Википедии или сайта NASA)
    image_url = models.CharField(
        "Ссылка на фото (URL)", max_length=500, blank=True, default=""
    )

    # Фотографии для визуального сравнения (URL)
    earth_image_url = models.CharField(
        "Фото на Земле (URL)", max_length=500, blank=True, default=""
    )
    moon_image_url = models.CharField(
        "Фото на Луне (URL)", max_length=500, blank=True, default=""
    )
    mars_image_url = models.CharField(
        "Фото на Марсе (URL)", max_length=500, blank=True, default=""
    )

    def __str__(self):
        return self.name_ru
