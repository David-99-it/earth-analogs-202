from django.core.exceptions import ValidationError
from django.db import models

from .metrics import KINDS, METRIC_BY_KEY, METRICS, ORIGINS, TAG_KEYS

ANALOG_CHOICES = [("moon", "Луна"), ("mars", "Марс"), ("both", "Луна и Марс")]
KIND_CHOICES = [(k, v[0]) for k, v in KINDS.items() if k != "user"]
METRIC_CHOICES = [(m["key"], m["ru"]) for m in METRICS]


class Site(models.Model):
    """Место на Земле, которое сравнивается с целью на Луне или Марсе."""

    id = models.BigAutoField(primary_key=True)
    slug = models.SlugField("Код", max_length=80, unique=True, help_text="Латиницей, без пробелов. Например: lonar")
    name_ru = models.CharField("Название (рус)", max_length=200)
    name_en = models.CharField("Название (англ)", max_length=200)
    region_ru = models.CharField("Регион (рус)", max_length=200, blank=True)
    region_en = models.CharField("Регион (англ)", max_length=200, blank=True)
    lat = models.FloatField("Широта", help_text="−90…90")
    lon = models.FloatField("Долгота", help_text="−180…180")
    area_km2 = models.FloatField("Площадь, км²", null=True, blank=True)
    analog_for = models.CharField("Аналог для", max_length=10, choices=ANALOG_CHOICES, default="both")
    tags = models.CharField("Теги", max_length=200, blank=True,
                            help_text="Через запятую: " + ", ".join(TAG_KEYS))
    understudied = models.BooleanField("Малоизученное место", default=False)
    surface_data = models.BooleanField(
        "Метеоданные поверхности применимы", default=True,
        help_text="Снимите галочку для подземных мест (шахты, глубокие пещеры): климат поверхности их не описывает.")
    use_ru = models.TextField("Что здесь отрабатывают (рус)", blank=True)
    use_en = models.TextField("Что здесь отрабатывают (англ)", blank=True)
    study_ru = models.TextField("Исследование: что известно, чего не хватает (рус)", blank=True)
    study_en = models.TextField("Исследование: что известно, чего не хватает (англ)", blank=True)
    quirk_ru = models.TextField("Неожиданный факт (рус)", blank=True)
    quirk_en = models.TextField("Неожиданный факт (англ)", blank=True)
    refs = models.JSONField("Ссылки", default=list, blank=True,
                            help_text='Список вида [{"t": "Название", "u": "https://..."}]')
    cloudinary_id = models.CharField("Фото: public ID в Cloudinary", max_length=200, blank=True)
    image_credit = models.CharField("Фото: автор", max_length=300, blank=True)
    image_license = models.CharField("Фото: лицензия", max_length=100, blank=True)
    image_page = models.URLField("Фото: страница источника", max_length=500, blank=True)
    published = models.BooleanField("Показывать на сайте", default=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name_ru"]
        verbose_name = "Место"
        verbose_name_plural = "Места"

    def __str__(self):
        return self.name_ru

    def tag_list(self):
        return [t.strip() for t in self.tags.split(",") if t.strip()]

    def clean(self):
        errors = {}
        if not -90 <= (self.lat if self.lat is not None else 0) <= 90:
            errors["lat"] = "Широта должна быть от −90 до 90."
        if not -180 <= (self.lon if self.lon is not None else 0) <= 180:
            errors["lon"] = "Долгота должна быть от −180 до 180."
        bad = [t for t in self.tag_list() if t not in TAG_KEYS]
        if bad:
            errors["tags"] = "Неизвестные теги: " + ", ".join(bad) + ". Допустимо: " + ", ".join(TAG_KEYS)
        if errors:
            raise ValidationError(errors)


class Measurement(models.Model):
    """Одно значение одного параметра у одного места, с источником.

    Нет строки или значение пустое = НЕТ ДАННЫХ. Ноль означает именно ноль.
    Числа вводятся в реальных единицах. Да/нет: 1 или 0. Происхождение породы: в поле «Набор» через запятую.
    """

    id = models.BigAutoField(primary_key=True)
    site = models.ForeignKey(Site, on_delete=models.CASCADE, related_name="measurements", verbose_name="Место")
    key = models.CharField("Параметр", max_length=30, choices=METRIC_CHOICES)
    value = models.FloatField("Значение", null=True, blank=True,
                              help_text="Число в единицах параметра. Для да/нет: 1 или 0. Пусто = нет данных.")
    text = models.CharField("Набор (для происхождения)", max_length=200, blank=True,
                            help_text="Через запятую: " + ", ".join(ORIGINS))
    kind = models.CharField("Как получено", max_length=12, choices=KIND_CHOICES, default="literature")
    source = models.CharField("Источник", max_length=300, blank=True)
    url = models.URLField("Ссылка", max_length=500, blank=True)
    date = models.CharField("Дата получения", max_length=20, blank=True)

    class Meta:
        unique_together = [("site", "key")]
        ordering = ["site", "key"]
        verbose_name = "Измерение"
        verbose_name_plural = "Измерения"

    def __str__(self):
        return f"{self.site.slug}: {self.key}"

    def has_data(self):
        if METRIC_BY_KEY[self.key]["type"] == "set":
            return bool(self.text.strip())
        return self.value is not None

    def clean(self):
        metric = METRIC_BY_KEY.get(self.key)
        if not metric:
            return
        t = metric["type"]
        if t == "set":
            keys = [x.strip() for x in self.text.split(",") if x.strip()]
            bad = [x for x in keys if x not in ORIGINS]
            if bad:
                raise ValidationError({"text": "Неизвестные значения: " + ", ".join(bad) + ". Допустимо: " + ", ".join(ORIGINS)})
        elif t == "bool":
            if self.value is not None and self.value not in (0, 1):
                raise ValidationError({"value": "Для да/нет введите 1 (да) или 0 (нет). Пусто = нет данных."})
        elif self.value is not None and not metric["min"] <= self.value <= metric["max"]:
            raise ValidationError({"value": f"Значение вне диапазона {metric['min']}…{metric['max']} {metric['unit']}."})
