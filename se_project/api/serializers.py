from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from usr.models import UWC_User

class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['staff_id'] = user.staff_id
        

        return token

class UserSerializer(ModelSerializer):
    class Meta:
        model = UWC_User
        fields = ['staff_id','fullname', 'date_of_birth', 'residential_id', 'phone_number', 'email', 'role', 'password']
        extra_kwargs = {
            'password': {
                # 'write_only': True,
                'style': {
                    'input_type': 'password',
                },
            },
            'staff_id': {
                'read_only': True,
            },
        }
    
    # def create(self, validated_data):
    #     user = UWC_User.objects.create(
    #         fullname = validated_data['fullname'],
    #         date_of_birth = validated_data['date_of_birth'],
    #         residential_id = validated_data['residential_id'],
    #         phone_number = validated_data['phone_number'],
    #         email = validated_data['email'],
    #         role = validated_data['role'],
    #     )
    #     user.set_password(validated_data['password'])
    #     user.staff_id = user.get_role_display() + user.staff_id
    #     user.save()
    #     return user

    
        