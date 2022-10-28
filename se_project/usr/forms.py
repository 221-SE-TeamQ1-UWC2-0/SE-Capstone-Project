from django.contrib.auth.forms import UserCreationForm, UserChangeForm
import se_project.settings as settings
from django.forms import DateInput
from . import models

class RegisterForm(UserCreationForm):
    class Meta:
        model = models.UWC_User
        fields = ['fullname', 'date_of_birth', 'residential_id', 'phone_number', 'email', 'role']
        widgets = {
            'date_of_birth': DateInput(attrs={'type':'date'})
        }


class UserUpdateForm(UserChangeForm):
    class Meta:
        model = models.UWC_User
        fields = ['fullname', 'date_of_birth', 'phone_number']