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
    team_name = models.CharField(max_length=100)  # Team name input
    selected_members = models.JSONField()  # Store selected team members
    selected_class = models.CharField(max_length=100)  # Class for team members
    created_at = models.DateTimeField(auto_now_add=True)  # Track when the team was created

    def __str__(self):
        return self.team_name
