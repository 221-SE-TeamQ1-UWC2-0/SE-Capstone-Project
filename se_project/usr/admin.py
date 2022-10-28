from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models, forms


# Register your models here.
class UWCUserAdmin(UserAdmin):
    model = models.UWC_User
    add_form = forms.RegisterForm
    form = forms.UserUpdateForm

    search_fields = ('staff_id', 'fullname', 'residential_id')
    list_display = ['staff_id', 'fullname', 'date_of_birth', 'gender', 'phone_number', 'residential_id', 'role']
    list_filter = ['staff_id', 'fullname', 'date_of_birth', 'gender', 'phone_number', 'residential_id', 'role']
    fieldsets = (
        (None, {'fields': ('staff_id', 'fullname', 'date_of_birth', 'gender', 'phone_number', 'residential_id', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active', 'user_permissions')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('staff_id', 'fullname', 'date_of_birth', 'gender', 'phone_number', 'residential_id', 'role', 'password1', 'password2')}
        ),
    )

    ordering = ['staff_id']

admin.site.register(models.UWC_User, UWCUserAdmin)
