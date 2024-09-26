from rest_framework import serializers
from .models import Student, Instructor
from django.contrib.auth import authenticate
from django.contrib.auth.backends import ModelBackend


class StudentRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['first_name', 'last_name', 'email', 'password', 'student_id']

    def create(self, validated_data):
        student = Student.objects.create(
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email'),
            student_id=validated_data.get('student_id')
        )
        student.set_password(validated_data['password'])
        print(f"Hashed password: {student.password}")
        student.save()
        return student

class InstructorRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['first_name', 'last_name', 'email', 'password', 'instructor_id']
   
    def create(self, validated_data):
        instructor = Instructor.objects.create(
            first_name=validated_data.get('first_name', ''),
                last_name=validated_data.get('last_name', ''),
                email=validated_data.get('email'),
                instructor_id=validated_data.get('instructor_id')
        )

        instructor.set_password(validated_data['password'])
        instructor.save()
        return instructor
    

class StudentLoginSerializer(serializers.Serializer):
    student_id = serializers.IntegerField()
    password = serializers.CharField()

    def validate(self, data):
        student_id = data.get('student_id')
        password = data.get('password')

        # user = StudentBackend.check(student_id=student_id, password=password)
        try:
            student = Student.objects.get(student_id=student_id)
        except Student.DoesNotExist:
            raise serializers.ValidationError("Student ID doesn't exist")

        if student.check_password(password):
            return student
        raise serializers.ValidationError("Wrong password")

    
