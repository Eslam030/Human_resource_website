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


def Register(request):
    temp = loader.get_template('register employee.html')
    return HttpResponse(temp.render())


def search(request):
    temp = loader.get_template('search-for-employee.html')
    return HttpResponse(temp.render())


def editEmployee(request):
    temp = loader.get_template('edit employee.html')
    return HttpResponse(temp.render())


def numberOfNextVacation(request):
    if (request.method == "GET"):
        return HttpResponse(len(models.vacations.objects.all()))
    else:
        return JsonResponse({'message': 'Fail'})


def Vacation(request):
    temp = loader.get_template('vacation.html')
    return HttpResponse(temp.render())


def Vacation_From(request, id):
    if (id == '0' or models.user.objects.all().filter(id=id).exists() or id == 0):
        temp = loader.get_template('vacation form.html')
        return HttpResponse(temp.render())
    else:
        return HttpResponse('not exist')


def view_vacation(request, id):
    temp = loader.get_template('vacation form.html')
    return HttpResponse(temp.render())


def getNumberOfEmployeeVacations(request, id):
    if (models.user.objects.all().filter(id=id).exists()):
        return HttpResponse(models.user.objects.all().values().get(id=id).get('available_vacation'))
    else:
        return HttpResponse('not exist')


def profile(request, id):
    if models.user.objects.all().filter(id=id).exists() or id == '0':
        temp = loader.get_template('profile.html')
        return HttpResponse(temp.render())
    else:
        return HttpResponse("isn't exist")


@csrf_exempt
def delete(request):
    if (request.method == 'POST'):
        data = models.user.objects.all().get(id=request.POST.get('data'))
        print(data)
        data.delete()
        return JsonResponse({'megs': 'Done'})
    else:
        return JsonResponse({'megs': 'There was some error'})


@csrf_exempt
def update(request):
    if (request.method == 'POST'):
        previousData = json.loads(request.POST.get('previous'))
        dataToDelete = models.user.objects.all().get(id=previousData['id'])
        dataToDelete.delete()
        data = json.loads(request.POST.get('new'))
        newRec = models.user()
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
        return JsonResponse({'message': 'Done'})
    else:
        return JsonResponse({'message': 'Fail'})


def getEmployeeData(request):
    if request.method == 'GET':
        data = models.user.objects.all()
        jsonData = json.dumps(list(data.values()), default=str)
        return JsonResponse(jsonData, safe=False)
    else:
        return JsonResponse({'message': 'Fail'})


def getEmployeeWithId(request, id):
    if (request.method == 'GET'):
        print(id)
        if (id == '0' or models.user.objects.all().filter(id=id).exists()):
            data = models.user.objects.all().values().get(id=id)
            print(data)
            jsonData = json.dumps(list(data.values()), default=str)
            return JsonResponse(jsonData, safe=False)
    else:
        return JsonResponse({'message': 'Fail'})


@csrf_exempt
def post(request):
    if (request.method == 'POST'):
        data = json.loads(request.body)
        if models.user.objects.filter(id=int(data.get('id'))).exists():
            return JsonResponse({'message': 'exist'})
        newRec = models.user()
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


def test(request):
    temp = loader.get_template('dummy.html')
    return HttpResponse(temp.render())


@csrf_exempt
def addVacations(request):
    if (request.method == 'POST'):
        data = json.loads(request.body)
        newRec = models.vacations()
        newRec.From = data.get('from')
        newRec.To = data.get('to')
        newRec.reason = data.get('reason')
        newRec.employee_id = int(data.get('employee-id'))
        newRec.vacation_duration = int(data.get('duration'))
        newRec.vacation_id = int(data.get('vacation-id'))
        newRec.status = data.get('status')
        newRec.save()
        return HttpResponse('done')
    else:
        return HttpResponse('not exist')


@csrf_exempt
def updateVacations(request):
    if (request.method == 'POST'):
        id = request.POST.get('id')
        duration = int(request.POST.get('duration'))
        data = models.user.objects.all().get(id=id)
        data.available_vacation -= duration
        data.actual_approved_vacations += duration
        data.save()
        return HttpResponse('done')
    else:
        return HttpResponse('not exist')
