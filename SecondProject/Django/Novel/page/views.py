from django.shortcuts import render

# Create your views here.
    
def enter(request):
    return render(request,"login.html")

def sign(request):
    return render(request,"register.html")

def recommand(request):
    return render(request,"recommand.html")