# Generated by Django 5.1.1 on 2024-09-24 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userRegApi', '0004_remove_instructor_password_hash_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='instructor',
            name='instructor_id',
            field=models.IntegerField(unique=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='student_id',
            field=models.IntegerField(unique=True),
        ),
    ]
