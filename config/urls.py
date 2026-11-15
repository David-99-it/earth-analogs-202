# config/urls.py — замените содержимое этим (если папка проекта называется не config, имя не важно: файл urls.py лежит рядом с settings.py)
from django.contrib import admin
from django.urls import path

from locator_app import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index, name="index"),
    path("compare/", views.compare, name="compare"),
    path("calculator/", views.calculator, name="calculator"),
    path("method/", views.method, name="method"),
    path("favicon.ico", views.favicon, name="favicon"),
    path("assets/<str:name>", views.asset, name="asset"),
    path("api/locator/", views.api, name="api"),
]
