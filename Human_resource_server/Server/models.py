from django.db import models


class test (models.Model):
    id = models.ImageField().primary_key
    firstname = models.CharField(max_length=255)


class user (models.Model):
    name = models.CharField(max_length=255)
    id = models.IntegerField().primary_key
    phone_number = models.CharField(max_length=255)
    e_mail = models.CharField(max_length=255)
    gender = models.CharField(max_length=1)
    marital = models.CharField(max_length=255)
    salary = models.FloatField()
    available_vacation = models.IntegerField()
    actual_approved_vacations = models.IntegerField()
    date = models.CharField(max_length=255)


class vacations (models.Model):
    id = models.IntegerField().primary_key
    employee_id = models.IntegerField()
    vacation_duration = models.IntegerField()
    From = models.CharField(max_length=255)
    To = models.CharField(max_length=255)
    reason = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    employee_name = models.CharField(max_length=255)
    # status will hold the status of the vacation ('submitted' , 'Accepted' , 'Rejected')
# implement later this will handle the vacations data
