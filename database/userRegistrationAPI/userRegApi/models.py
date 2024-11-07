from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class Student(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    student_id = models.CharField(max_length=50, unique=True, primary_key=True)
    password = models.CharField(max_length=128)

    USERNAME_FIELD = 'student_id'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Instructor(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    instructor_id = models.CharField(max_length=50, unique=True, primary_key=True)
    password = models.CharField(max_length=128)

    USERNAME_FIELD = 'instructor_id'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Team(models.Model):
    team_name = models.CharField(max_length=255)
    selected_members = models.CharField(max_length=1000)
    selected_class = models.CharField(max_length=255, default='soen341')
    
class Courses(models.Model):
    course_code = models.CharField(max_length=20, primary_key=True, unique=True)
    course_name = models.CharField(max_length=50)
    teacher = models.ForeignKey(Instructor, on_delete=models.CASCADE, to_field='instructor_id')

    def __str__(self):
        return f"{self.course_name} {self.teacher}"

class Groups(models.Model):
    group_code = models.CharField(max_length=20, primary_key=True, unique=True)
    group_name = models.CharField(max_length=50)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.group_name} {self.course}"

class GroupMembers(models.Model):
    group = models.ForeignKey(Groups, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, to_field='student_id')

    class Meta:
        unique_together = ('student', 'group')

    def __str__(self):
        return f"{self.group} {self.student}"

class Evaluation(models.Model):
    evaluator = models.ForeignKey(Student, on_delete=models.CASCADE, to_field='student_id', related_name='given_evaluations')
    evaluatee = models.ForeignKey(Student, on_delete=models.CASCADE, to_field='student_id', related_name='received_evaluations')
    group = models.ForeignKey(Groups,on_delete=models.CASCADE)
    feedback = models.TextField()
    cooperation_rating = models.IntegerField(default=None)
    conceptualContribution_rating = models.IntegerField(default=None)
    practicalContribution_rating = models.IntegerField(default=None)
    workEthic_rating = models.IntegerField(default=None)

    def __str__(self):
        return f"{self.evaluatee} {self.group} {self.feedback} {self.rating}"

