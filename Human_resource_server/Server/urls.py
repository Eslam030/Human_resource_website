from django.urls import path
from . import views

urlpatterns = [
    path('', views.Projects, name="Projects"),
    path('Main/', views.Main_Page, name="Main"),
    path('Register', views.Register, name="Register"),
    path('editEmployee/', views.editEmployee, name="editEmployee"),
    path('Vacation/', views.Vacation, name="Vacation"),
    path('Vacation_Form/<int:id>', views.Vacation_From, name="Vacation_Form"),
    path('getEmployeeData/', views.getEmployeeData, name='getEmployeeData'),
    path('getEmployeeWithId/<int:id>',
         views.getEmployeeWithId, name='getEmployeeWithId'),
    path('delete/', views.delete, name='delete'),
    path('post/', views.post, name="post"),
    path('update/', views.update, name='update'),
    path('profile/<int:id>', views.profile, name='profile'),
    path('test/', views.test, name='test'),
    path('searchForEmployee/', views.search, name="searchForEmployee"),
    path('view_vacation/<int:id>', views.view_vacation, name="view_vacation"),
    path('numberOfVacations/', views.numberOfNextVacation,
         name="numberOfVacations"),
    path('numberOfEmployeeVacations/<int:id>',
         views.getNumberOfEmployeeVacations, name="numberOfEmployeeVacations"),
    path('addVacations/', views.addVacations, name="addVacations"),
    path('updateEmployeeVacations/', views.updateVacations,
         name="updateEmployeeVacations"),
    path('vacations', views.vacations, name="vacations"),
    path('updateStatus/', views.updateVacationStatus, name="updateStatus"),
    path('getVacationById/<int:id>', views.getVacationById, name="getVacationById")

]
