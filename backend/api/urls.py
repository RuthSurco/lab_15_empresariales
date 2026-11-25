from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    path('publico', views.publico),
    path('privado', views.privado),
]
