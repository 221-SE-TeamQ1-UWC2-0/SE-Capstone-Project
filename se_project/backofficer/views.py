from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EmployeeSerializer
from usr.models import UWC_User

# Create your views here.

class DashboardView(viewsets.ModelViewSet):

    serializer_class = EmployeeSerializer
    
    queryset = UWC_User.objects.filter(role != "Ad", role != "BO")
