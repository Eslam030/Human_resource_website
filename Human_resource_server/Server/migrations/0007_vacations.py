# Generated by Django 4.2.1 on 2023-06-01 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Server', '0006_delete_vacations'),
    ]

    operations = [
        migrations.CreateModel(
            name='vacations',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('employee_id', models.IntegerField()),
                ('vacation_duration', models.IntegerField()),
                ('From', models.CharField(max_length=255)),
                ('To', models.CharField(max_length=255)),
                ('reason', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=255)),
                ('employee_name', models.CharField(max_length=255))
            ],
        ),
    ]
