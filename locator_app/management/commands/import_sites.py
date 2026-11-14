from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from locator_app import dataset
from locator_app.models import Measurement, Site


class Command(BaseCommand):
    help = "Загружает места, факты и скачанные данные NASA из locator_app/data/ в базу."

    def add_arguments(self, parser):
        parser.add_argument("--clear", action="store_true", help="Сначала удалить ВСЕ места из базы (старые данные тоже).")
        parser.add_argument("--data-dir", default=None, help="Другая папка с файлами данных.")

    @transaction.atomic
    def handle(self, *args, **opts):
        data_dir = Path(opts["data_dir"]) if opts["data_dir"] else None
        errors = dataset.validate(data_dir)
        if errors:
            raise CommandError("В файлах данных есть ошибки:\n - " + "\n - ".join(errors))

        sites = dataset.load_sites(data_dir)
        measured = dataset.load_measured(data_dir)
        images = dataset.load_images(data_dir)

        if opts["clear"]:
            n = Site.objects.count()
            Site.objects.all().delete()
            self.stdout.write(f"Удалено старых мест: {n}")

        rows_total = without_numbers = 0
        for s in sites:
            img = dataset.image_info(images.get(s["slug"])) or {}
            site, _ = Site.objects.update_or_create(slug=s["slug"], defaults=dict(
                name_ru=s["name"][0], name_en=s["name"][1],
                region_ru=s["region"][0], region_en=s["region"][1],
                lat=s["lat"], lon=s["lon"], area_km2=s.get("area_km2"),
                analog_for=s["analog_for"], tags=",".join(s.get("tags", [])),
                understudied=s.get("understudied", False), surface_data=s.get("surface_data", True),
                use_ru=s["use"][0], use_en=s["use"][1],
                study_ru=s["study"][0], study_en=s["study"][1],
                quirk_ru=s["quirk"][0], quirk_en=s["quirk"][1],
                refs=s.get("refs", []),
                cloudinary_id=img.get("id", ""), image_credit=img.get("credit", ""),
                image_license=img.get("license", ""), image_page=img.get("page", ""),
                published=True,
            ))
            m_for_site = measured.get(s["slug"], {})
            have, _ = dataset.numeric_coverage(s, m_for_site)
            if have == 0 and s.get("surface_data", True):
                without_numbers += 1
            for row in dataset.site_rows(s, m_for_site):
                Measurement.objects.update_or_create(site=site, key=row["key"], defaults={
                    k: row[k] for k in ("value", "text", "kind", "source", "url", "date")})
                rows_total += 1

        self.stdout.write(self.style.SUCCESS(f"Готово: мест {len(sites)}, измерений {rows_total}."))
        if without_numbers:
            self.stdout.write(self.style.WARNING(
                f"У {without_numbers} мест нет чисел NASA (температура, осадки, ветер, рельеф). "
                "Запустите: python tools/fetch_nasa_data.py, затем повторите импорт."))
