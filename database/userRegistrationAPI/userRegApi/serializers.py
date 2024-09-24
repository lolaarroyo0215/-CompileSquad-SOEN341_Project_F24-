from rest_framework import serializers
from .models import Student, Instructor

class StudentSerializer(serializers.ModelSerializer):
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

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['first_name', 'last_name', 'email', 'password', 'instructor_id']
   
def create(self, validated_data):
    instructor = Instructor.objects.create(
        first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email'),
            instructor_id=validated_data.get('student_id')
    )

    instructor.set_password(validated_data['password'])
    instructor.save()
    return instructor
