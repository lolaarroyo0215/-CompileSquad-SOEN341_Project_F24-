from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Student, Instructor, Team  # Import Team model
from .serializers import StudentRegistrationSerializer, InstructorRegistrationSerializer, StudentLoginSerializer, InstructorLoginSerializer, TeamSerializer  # Import TeamSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
import csv
from rest_framework.parsers import MultiPartParser



@api_view(['POST'])
def create_student(request):
    serializer = StudentRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_instructor(request):
    serializer = InstructorRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def student_login(request):
    serializer = StudentLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'data': str("login successful"),
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def instructor_login(request):
    serializer = InstructorLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'data': str("login successful"),
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_team(request):
    serializer = TeamSerializer(data=request.data)
    if serializer.is_valid():
        team = serializer.save()  # Save the team and get the instance back
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    # Print the errors if the serializer is not valid
    print(serializer.errors)  
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_teams(request):
    teams = Team.objects.all()  # Fetch all teams from the database
    serializer = TeamSerializer(teams, many=True)  # Serialize the data
    return Response(serializer.data)  # Return the serialized data as JSON


@api_view(['GET'])
def get_students(request):
    students = Student.objects.all()
    serializer = StudentRegistrationSerializer(students, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def import_roster(request):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

    csv_file = request.FILES['file']
    data = csv.reader(csv_file.read().decode('utf-8').splitlines())
    next(data)  # Skip header row if there is one

    for row in data:
        first_name, last_name, email, student_id = row
        Student.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            student_id=student_id
        )

    return JsonResponse({'status': 'success'}, status=201)
