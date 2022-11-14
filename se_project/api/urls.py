from django.urls import path
from .views import UserTokenObtainPairView, UserViewSet
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('user', UserViewSet)

urlpatterns = [
    path('token/', UserTokenObtainPairView.as_view(), name='token_obtain'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + router.urls
