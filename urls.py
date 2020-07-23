from django.urls import path
from . import views

urlpatterns = [
       # path('',  views.index, name='index'),
       # path('signup/', views.signup, name='signup'),
       # path('login/', views.login, name='login'),
       # path('company-signup/', views.company_signup, name='company-signup'),
       # path('availability/',  views.EmployeeAvailability, name='EmployeeAvailability'),
     #  path('mytimetable/',  views.MyTimetable, name='MyTimetable'),
       path('signup/', views.signup, name='signup'),
       path('login/', views.login_user, name='login'),
       path('json/', views.display_json, name='json'),
           path('view/', views.mangar, name='view'),
        ]



