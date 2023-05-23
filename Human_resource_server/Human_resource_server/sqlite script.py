import os
import sys
import django

# Set the PYTHONPATH to the root directory of your Django project
PROJECT_ROOT = 'D:\Web project\Human_resource_server'
sys.path.append(PROJECT_ROOT)

# Set the DJANGO_SETTINGS_MODULE
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Human_resource_server.settings')

# Import and initialize Django
django.setup()

from Server.models import test


t = test(id = 13 , firstname = "fdsfsd") 
t.save()
print(test.objects.all().values())
