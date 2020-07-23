from django.db import models
import datetime
from django.contrib.auth.models import User

class Company(models.Model):
    name = models.CharField(max_length=25)

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

class Shift(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    startDate = models.DateField(default=datetime.date.today)
    endDate = models.DateField(default=datetime.date.today)
    day = models.CharField(max_length=200)
