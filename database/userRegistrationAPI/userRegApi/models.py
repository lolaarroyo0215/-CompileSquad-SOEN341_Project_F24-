from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class Student(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    student_id = models.CharField(max_length=50, unique=True)
    team_id = models.IntegerField(null=True, blank=True)
    password = models.CharField(max_length=128)

    USERNAME_FIELD = 'student_id'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Instructor(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    instructor_id = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)

    USERNAME_FIELD = 'instructor_id'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Team(models.Model):
    team_name = models.CharField(max_length=255)
    selected_members = models.CharField(max_length=1000)  # Adjust based on your data type
    selected_class = models.CharField(max_length=255, default='soen341')
    


