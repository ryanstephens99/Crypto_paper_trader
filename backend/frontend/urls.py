from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index),
    path('chart', views.index),
    path('Coinbase', views.index),
    re_path(r'Coinbase\/[^\/]+', views.index)
]