from django.urls import path 
from . import views 

urlpatterns = [
    path ('' , views.Projects , name = "Projects") , 
    path ('Main/' , views.Main_Page , name = "Main") ,
    path ('Register' , views.Regitser , name = "Register") ,
    path ('Update/' , views.Update , name = "Update") ,
    path ('Delete/' , views.Delete , name = "Delete") ,
    path ('Vacation/' , views.Vacation , name = "Vacation") ,
    path ('Vacation_Form/' , views.Vacation_From , name = "Vacation_Form") ,
    path ('test/' , views.test , name = "test") ,
    path('data/' , views.ajax_test , name = 'data') , 
    path('post/' , views.post , name = "post")
]