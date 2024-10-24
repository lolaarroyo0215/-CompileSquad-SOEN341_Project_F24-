from django.urls import path
from .views import create_student, create_instructor, student_login, instructor_login

urlpatterns = [
    path('create-student/', create_student),
    path('create-instructor/', create_instructor),
    path('student-login/', student_login),
    path('instructor-login/', instructor_login)
]