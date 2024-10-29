from django.urls import path
from .views import create_student, create_instructor, student_login, instructor_login, create_team, get_teams  # Import your create_team view

urlpatterns = [
    path('create-student/', create_student),
    path('create-instructor/', create_instructor),
    path('student-login/', student_login),
    path('instructor-login/', instructor_login),
    path('create-team/', create_team), 
    path('get_teams/', get_teams, name='get_teams'),
]
