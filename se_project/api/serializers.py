from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from usr.models import UWC_User
from base.models import Task

class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['staff_id'] = user.staff_id
        token['role'] = user.role
        

        return token

class UserSerializer(ModelSerializer):
    class Meta:
        model = UWC_User
        fields = ['staff_id','fullname', 'date_of_birth', 'residential_id', 'phone_number', 'email', 'role', 'password']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password',
                },
            },
            'staff_id': {
                'read_only': True,
            },
        }
    
    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])

        user.save()
        return user

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
    
        