from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Student, Instructor
from .serializers import StudentSerializer, InstructorSerializer

@api_view(['POST'])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # Save the student to the database
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_instructor(request):
    serializer = InstructorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # Save the instructor to the database
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

