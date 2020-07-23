from django.shortcuts import render 
import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import *

# Create your views here.

def signup(request):
    if request.method == 'POST':
    
        first_name = request.POST['suc-fullname']
        last_name  = request.POST['su-fullname']
        email      = request.POST['su-email']
        password   = request.POST['su-pass']

        staff_user = User(username=email)
        staff_user.set_password(password)
        staff_user.first_name = first_name
        staff_user.last_name  = last_name
        staff_user.email = email
        staff_user.active = True
        staff_user.save()

        company = Company(name="NBA")
        company.save()

        employee = Employee(user=staff_user, company=company)
        employee.save()

        return HttpResponse("<h1> User created </h1>")

    return render(request, 'sortall/signup.html')


def login_user(request):
    if request.method == 'POST':

        email = request.POST['lo-email']
        password = request.POST['lo-password']

        user = authenticate(username=email, password=password)
        if user is not  None :
            login(request, user)
            logged_user = {"name": user.first_name}
            return render(request, 'sortall/Employee_availability.html', {"logged_user": logged_user})

        else :
            return HttpResponse("<h1> Authenication has failed </h1>")
    return render(request, 'sortall/login.html')


def display_json(request):
    if request.method == 'POST':
        return HttpResponse(json.load(request.body))
    
def mangar(request):
    return render(request, 'sortall/index.html')