from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
# Create your views here.

@login_required(login_url=reverse_lazy('login', kwargs={'pk': 'en'}))
def map(request):
    return render(request, 'map.html')

@login_required(login_url=reverse_lazy('login', kwargs={'pk':'en'}))
def index(request):
    return render(request, 'index.html')