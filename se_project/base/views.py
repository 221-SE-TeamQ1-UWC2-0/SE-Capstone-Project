from django.shortcuts import render

# Create your views here.

def map(request):
    return render(request, 'map.html')

def index(request):
    return render(request, 'index.html')