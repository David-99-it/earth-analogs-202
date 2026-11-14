from django.contrib import admin
from django.urls import path
from locator_app import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index, name="index"),
    path("api/analogs/", views.get_analogs, name="api_analogs"),
]
