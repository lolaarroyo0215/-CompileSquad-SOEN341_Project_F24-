from rest_framework import serializers
from .models import Student, Instructor, Courses, Groups, GroupMembers, Evaluation 
from django.contrib.auth import authenticate
from django.contrib.auth.backends import ModelBackend

class StudentRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['first_name', 'last_name', 'email', 'password', 'user_id']

    def create(self, validated_data):
        student = Student.objects.create(
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email'),
            user_id=validated_data.get('user_id')
        )
        student.set_password(validated_data['password'])
        student.save()
        return student

class InstructorRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['first_name', 'last_name', 'email', 'password', 'user_id']
   
    def create(self, validated_data):
        instructor = Instructor.objects.create(
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email'),
            user_id=validated_data.get('user_id')
        )
        instructor.set_password(validated_data['password'])
        instructor.save()
        return instructor

class StudentLoginSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    password = serializers.CharField()

    def validate(self, data):
        user_id = data.get('user_id')
        password = data.get('password')

        try:
            student = Student.objects.get(user_id=user_id)
        except Student.DoesNotExist:
            raise serializers.ValidationError("Student ID doesn't exist")

        if student.check_password(password):
            return student
        raise serializers.ValidationError("Wrong password")

class InstructorLoginSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    password = serializers.CharField()

    def validate(self, data):
        user_id = data.get('user_id')
        password = data.get('password')

        try:
            instructor = Instructor.objects.get(user_id=user_id)
        except Instructor.DoesNotExist:
            raise serializers.ValidationError("Instructor ID doesn't exist")

        if instructor.check_password(password):
            return instructor
        raise serializers.ValidationError("Wrong password")
    

# class TeamSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Team
#         fields = ['team_name', 'selected_members']

#     def create(self, validated_data):
#         # Create an instance and return it
#         team = Team.objects.create(**validated_data)
#         return team  # Ensure the created team instance is returned

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ['course_name', 'teacher', 'course_code']

    def create(self, validated_data):
        course = Courses.objects.create(**validated_data)
        return course
    
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = ['group_name', 'course', 'group_code']

    def create(seld, validated_data):
        group = Groups.objects.create(**validated_data)
        return group
    
class GroupMemberSerializer(serializers.ModelSerializer):
    group = GroupSerializer()
    
    class Meta:
        model = GroupMembers
        fields = ['group', 'student']

    def create(self, validated_data):
        groupMember = GroupMembers.objects.create(**validated_data)
        return groupMember
    
class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = ['evaluator', 'evaluatee', 'group', 'feedback', 'cooperation_rating', 'conceptualContribution_rating', 'practicalContribution_rating', 'workEthic_rating' ]

    def create(self, validated_data):
        evaluation = Evaluation.objects.create(**validated_data)
        return evaluation
    
    
        
    

    

    
    
        
    

    
