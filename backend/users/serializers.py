from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "bio", "avatar", "phone")

    def create(self, validate_data):
        password = validate_data.pop("password")
        user = User(**validate_data)
        user.set_password(password)
        user.save()
        return user
    
