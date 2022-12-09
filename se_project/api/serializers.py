from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from usr.models import UWC_User
from base.models import Task, MCP, Vehicle, Route


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['role'] = user.role
        return token

class UserSerializer(ModelSerializer):
    class Meta:
        model = UWC_User
        fields = ['staff_id', 'fullname', 'date_of_birth',
                  'residential_id','gender', 'phone_number', 'email', 'password', 'role']
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
            'role': {
                'write_only': True
            }
        }

    def get_fields(self):
        fields = super().get_fields()
        if self.instance:
            fields['password'].read_only = True
        return fields

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])

        user.save()
        return user

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class MCPSerializer(ModelSerializer):
    class Meta:
        model = MCP
        fields = '__all__'


class VehicleSerializer(ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'


class RouteSerializer(ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'
