from django.urls import path
from .views import create_student, create_instructor, student_login, instructor_login, create_team  # Import your create_team view

urlpatterns = [
    path('create-student/', create_student),
    path('create-instructor/', create_instructor),
    path('student-login/', student_login),
    path('instructor-login/', instructor_login),
    path('create-team/', create_team), 
]
