from django.shortcuts import render, get_object_or_404
from django.http import Http404
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserTokenObtainPairSerializer, UserSerializer, TaskSerializer, VehicleSerializer, MCPSerializer
from usr.models import UWC_User
from base.models import *

# Create your views here.


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer


class UserViewSet(ModelViewSet):
    queryset = UWC_User.objects.all().exclude(role = "BACKOFFICER")
    serializer_class = UserSerializer

    def retrieve(self, request, pk):
        try:
            user = get_object_or_404(UWC_User.objects.all(), staff_id=pk)
            serializer = UserSerializer(user)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data)

    def destroy(self, request, pk):
        try:
            user = get_object_or_404(UWC_User.objects.all(), staff_id=pk)
            self.perform_destroy(user)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)

class CollectorViewSet(ModelViewSet):

    queryset = UWC_User.objects.all().filter(role = "COLLECTOR")
    serializer_class = UserSerializer

class JanitorViewSet(ModelViewSet):

    queryset = UWC_User.objects.all().filter(role = 'JANITOR')
    serializer_class = UserSerializer

class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class VehicleViewSet(ModelViewSet):

    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class MCPViewSet(ModelViewSet):

    queryset = MCP.objects.all()
    serializer_class = MCPSerializer
