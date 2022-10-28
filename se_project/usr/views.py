from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.core.exceptions import ValidationError 
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from . import forms, models

# Create your views here.

# def logout(request):
#     logout(request)
#     return render("/login")

def loginView(request,pk):
    """ 
    GET [id, password]
        
        1. Verify constraints (i.e. length password)
        2. Verify uniqueness -> Yes: Create account -> Login
                             -> No: messages
    """
    if request.user.is_authenticated:
        return redirect('index')

    error = ""

    if request.method == 'POST':
        staff_id = request.POST['staff_id']
        password = request.POST['password']
        try:
            user = models.UWC_User.objects.get(staff_id=staff_id)
            user = authenticate(request, staff_id=staff_id, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')
            else:
                error = 'Staff ID or password is incorrect'
        except:
            error = 'User does not exist'

        
    context  = {
        'error': error,
        'lang': pk,
        }

    return render(request, 'user/login.html', context)

def logoutView(request):
    if request.user.is_authenticated:
        logout(request)

    return redirect(reverse('login', kwargs={'pk': 'en'}))

def registerView(request,pk):
    form = forms.RegisterForm()

    if request.method == 'POST':
        form = forms.RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            id_num = str(models.UWC_User.objects.all().count()).rjust(4,'0')
            user.staff_id = user.get_role_display() + id_num
            user.staff_id = user.staff_id.lower()

            if user.role == 'ADMIN':
                user.is_staff = True
                user.is_superuser = True
            
            user.save()
            if user is not None:
                login(request, user)
                return redirect('index')
            
        else:
            form = forms.RegisterForm(request.POST)
        

    context = {
        'form': form,
        'lang': pk,
        }

    return render(request, 'user/register.html', context)
