from django.urls import path

from . import views

urlpatterns = [
    path('', views.login),
    path('register/', views.register),
    path('login-vi/', views.login_vi),
    path('register-vi/', views.register_vi)
]