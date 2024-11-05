from rest_framework import serializers
from .models import Student, Instructor, Team  # Import Team model
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

        try:
            student = Student.objects.get(student_id=student_id)
        except Student.DoesNotExist:
            raise serializers.ValidationError("Student ID doesn't exist")

        if student.check_password(password):
            return student
        raise serializers.ValidationError("Wrong password")

class InstructorLoginSerializer(serializers.Serializer):
    instructor_id = serializers.IntegerField()
    password = serializers.CharField()

    def validate(self, data):
        instructor_id = data.get('instructor_id')
        password = data.get('password')

        try:
            instructor = Instructor.objects.get(instructor_id=instructor_id)
        except Instructor.DoesNotExist:
            raise serializers.ValidationError("Instructor ID doesn't exist")

        if instructor.check_password(password):
            return instructor
        raise serializers.ValidationError("Wrong password")
    

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['team_name', 'selected_members']

    def create(self, validated_data):
        # Create an instance and return it
        team = Team.objects.create(**validated_data)
        return team  # Ensure the created team instance is returned



        
    

    