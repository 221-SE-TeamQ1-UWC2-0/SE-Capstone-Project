from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
# Create your views here.

# def logout(request):
#     logout(request)
#     return render("/login")

def login(request):
    """ 
    GET [id, password]
        
        1. Verify constraints (i.e. length password)
        2. Verify uniqueness -> Yes: Create account -> Login
                             -> No: messages
    """
    if request.method == 'POST':
        name = request.POST['username']
        password = request.POST['user_password']
        print(name, password)
    return render(request, 'home-login.html')

def register(request):
    return render(request, 'register.html')
