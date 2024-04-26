
from django.urls import path
from crur import views

urlpatterns = [
    path('', views.index, name="/"),
    path('open', views.crur_open, name='open_request'),
    path('check', views.crur_check, name='check'),
    path('check/<str:term>', views.crur_check, name='check_term'),
    path('response', views.crur_response, name='response'),
    path('response/<str:term>', views.crur_response, name='response'),
    path('register', views.register, name='register'),

]
