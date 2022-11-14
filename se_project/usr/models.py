from django.utils.translation import gettext as _
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
# Create your models here.


class UWC_Manager(BaseUserManager):
    """
        Not including the verification of valid user and password based on some constraints
        The verification process was done before setting user.
    """

    def create_user(self, staff_id, password, **extra_fields):
        if not staff_id:
            raise ValueError(_('Staff ID must not be empty.'))
        user = self.model(staff_id=staff_id, **extra_fields)
        user.set_password(password)
        user.save()
        print("Create successfully!")
        return user

    """
        Not including the verification of valid user and password based on some constraints
        The verification process was done before setting user.

        : parameters: is_staff, is_superuser is True (by default) 
    """

    def create_superuser(self, staff_id, password, **extra_fields):

        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(staff_id, password, **extra_fields)


class UWC_User(AbstractBaseUser, PermissionsMixin):

    class Role(models.TextChoices):
        AD = 'ADMIN'
        BO = 'BACKOFFICER'
        JA = 'JANITOR'
        CO = 'COLLECTOR'

    role = models.CharField(max_length=50, choices=Role.choices)
    fullname = models.CharField(max_length=100, default='')
    date_of_birth = models.DateField(default=timezone.now)
    gender = models.IntegerField(default=-1)  # 0: Male, 1: Female, -1: others
    phone_number = models.CharField(max_length=20,  default='', unique=True)
    email = models.EmailField(max_length=254, default='', unique=True)
    residential_id = models.CharField(max_length=100, default='', unique=True)

    # Staff ID = Username
    staff_id = models.CharField(max_length=100, unique=True, primary_key=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    #   Status: an integer in {-1, 0, 1}
    # -1: inactive; 0: on-going; 1: available
    status = models.IntegerField(default = 1)
    
    USERNAME_FIELD = 'staff_id'
    REQUIRED_FIELDS = ['role']

    objects = UWC_Manager()

    def __str__(self):
        return "{} joined on {}".format(self.staff_id, self.date_joined)

    def save(self,*args, **kwargs):
        if (kwargs['staff_id'] == ''):
            kwargs['staff_id'] = str(UWC_User.objects.all().count()).rjust(4, '0')
        return super(UWC_User,self).save(*args, **kwargs)