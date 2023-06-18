# Generated by Django 4.2.1 on 2023-06-15 13:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Server', '0015_remove_vacations_employee_id_delete_user_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='user',
            fields=[
                ('id', models.BigAutoField(primary_key=True,
                 serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=255)),
                ('e_mail', models.CharField(max_length=255)),
                ('gender', models.CharField(max_length=1)),
                ('marital', models.CharField(max_length=255)),
                ('salary', models.FloatField()),
                ('available_vacation', models.IntegerField()),
                ('actual_approved_vacations', models.IntegerField()),
                ('date', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='vacations',
            fields=[
                ('id', models.BigAutoField(primary_key=True,
                 serialize=False, verbose_name='ID')),
                ('vacation_duration', models.IntegerField()),
                ('From', models.CharField(max_length=255)),
                ('To', models.CharField(max_length=255)),
                ('reason', models.CharField(max_length=255)),
                ('status', models.CharField(max_length=255)),
                ('employee_name', models.CharField(max_length=255)),
                ('employee_id', models.IntegerField()),
            ],
        ),
    ]
