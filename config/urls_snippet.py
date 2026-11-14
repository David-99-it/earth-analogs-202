# config/urls.py — замените содержимое этим (если у вас проект называется иначе, имя папки config поменяйте)
from django.contrib import admin
from django.urls import path

from locator_app import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index, name="index"),
    path("api/locator/", views.api, name="api"),
]
