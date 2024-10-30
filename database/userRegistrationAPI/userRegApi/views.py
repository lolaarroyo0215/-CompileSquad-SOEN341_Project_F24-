from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Student, Instructor, Team  # Import Team model
from .serializers import StudentRegistrationSerializer, InstructorRegistrationSerializer, StudentLoginSerializer, InstructorLoginSerializer, TeamSerializer  # Import TeamSerializer
from rest_framework_simplejwt.tokens import RefreshToken



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

