from django.urls import path
from . import views

urlpatterns = [
    path('<str:pk>/login/', views.loginView, name='login'),
    path('<str:pk>/register/', views.registerView, name='register'),
    path('logout/', views.logoutView, name='logout'),

    
]