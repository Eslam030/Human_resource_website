import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from . import models


def Projects(request):
    temp = loader.get_template('Projects.html')
    return HttpResponse(temp.render())


def Main_Page(request):
    temp = loader.get_template('main page.html')
    return HttpResponse(temp.render())


def Regitser(request):
    temp = loader.get_template('register employee.html')
    return HttpResponse(temp.render())


def Update(request):
    temp = loader.get_template('update employee.html')
    return HttpResponse(temp.render())


def Delete(request):
    temp = loader.get_template('delete employee.html')
    return HttpResponse(temp.render())


def Vacation(request):
    temp = loader.get_template('vacation.html')
    return HttpResponse(temp.render())


def Vacation_From(request):
    temp = loader.get_template('vacation form.html')
    return HttpResponse(temp.render())


def ajax_test(request):
    tt = models.test.objects.all().values()
    rr = list(tt)
    return JsonResponse(rr, safe=False)


def test(request):
    temp = loader.get_template('dummy.html')
    return HttpResponse(temp.render())


@csrf_exempt
def post(request):
    if (request.method == 'POST'):
        data = json.loads(request.body)
        if models.employee.objects.filter(id=int(data.get('id'))).exists():
            return JsonResponse({'message': 'exist'})
        newRec = models.employee()
        newRec.name = data.get('name')
        newRec.id = int(data.get('id'))
        newRec.phone_number = data.get('phone-number')
        newRec.e_mail = data.get('email')
        newRec.gender = data.get('gender')
        newRec.marital = data.get('employee-marital')
        newRec.salary = float(data.get('salary'))
        newRec.available_vacation = int(data.get('actual-vacations'))
        newRec.actual_approved_vacations = int(
            data.get('actual-vacations'))
        newRec.date = data.get('date-of-birth')
        newRec.save()
        return JsonResponse({'message': 'done'})
    else:
        return JsonResponse({'message': 'fail'})

# Create your views here.
