from rest_framework import serializers
from usr.models import UWC_User

class EmployeeSerializer(serializers.ModelSerializer):
    
    class Meta: 
        model = UWC_User
        fields = ['staff_id', 'role', 'status']
        