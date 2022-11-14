from django.shortcuts import render, get_object_or_404
from django.http import Http404
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserTokenObtainPairSerializer, UserSerializer
from usr.models import UWC_User

# Create your views here.


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer


class UserViewSet(ModelViewSet):
    queryset = UWC_User.objects.all()
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
