# Generated by Django 4.2.1 on 2023-06-07 06:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Server', '0009_user_vacations'),
    ]

    operations = [
        migrations.RenameField(
            model_name='test',
            old_name='firstname',
            new_name='name',
        ),
    ]
