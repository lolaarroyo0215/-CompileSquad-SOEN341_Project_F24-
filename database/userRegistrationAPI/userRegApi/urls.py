from django.urls import path
from .views import get_instructorData, get_studentData, get_studentsGroups, get_evaluations, create_evaluation, get_groupMembers, create_groupMember, get_groups, create_group, get_courses, create_course, create_student, create_instructor, student_login, instructor_login, get_students #create_team, get_teams, 
from . import views

urlpatterns = [
    path('create-student/', create_student),
    path('create-instructor/', create_instructor),
    path('student-login/', student_login),
    path('instructor-login/', instructor_login),
    # path('create-team/', create_team), 
    # path('get_teams/', get_teams, name='get_teams'),
    path('get_students/', get_students, name='get_students'),
    path('import-roster/', views.import_roster, name='import_roster'),
    path('create-course/', create_course),
    path('get-courses/<int:teacher_id>/', get_courses),
    path('create-group/', create_group),
    path('get-groups/<str:course_id>/', get_groups),
    path('get-studentsGroups/<int:student_id>/', get_studentsGroups),
    path('create-groupMember/', create_groupMember),
    path('get-groupMembers/<str:group_id>/', get_groupMembers),
    #path('get-team/<str:student_id>/', get_team),    
    path('create-evaluation/', create_evaluation),
    path('get-evaluations/<int:evaluatee>/<str:group>/', get_evaluations),
    path('get-studentData/<int:user_id>/', get_studentData),
    path('get-instructorData/<int:user_id>/', get_instructorData)
]

# Things left to do 
# - Student: link new assesment page to your groups to be able to evaluate each student
# link evaluation submission to database once this is done
# - Teacher: under create class we should have a list of the classes the teacher has already created, should be quick to implement
# - Teacher: implement current teams page and add functionality to be able to add members to existing teams 
# - Teacher: do summary of results page
# - Teacher: do detailed results page with all the details of each evaluation, including who said what about each student
# - Implement all the profile page for both stduent and teacher
