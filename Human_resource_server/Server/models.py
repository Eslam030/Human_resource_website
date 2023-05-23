from django.db import models


class test (models.Model) :
    id = models.ImageField().primary_key 
    firstname = models.CharField(max_length=255) 

class admins (models.Model) :
    name = models.CharField(max_length=255)   

class employee (models.Manager) :
    name = models.CharField(max_length=255)
    id = models.IntegerField().primary_key
    phone_number = models.IntegerField()
    e_mail = models.CharField(max_length=255)
    gender = models.CharField(max_length=1) 
    marital = models.CharField(max_length=255)
    salary = models.IntegerField()
    available_vacation = models.IntegerField()
    actual_approved_vacations = models.IntegerField()
    data = models.DateField()  

