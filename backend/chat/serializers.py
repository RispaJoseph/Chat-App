from rest_framework import serializers
from django.utils.text import slugify
from .models import Room, Message

class MessageSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Message
        fields = ["id", "room", "user", "username", "text", "timestamp"]
        read_only_fields = ["id", "user", "username", "timestamp"]

class RoomSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    slug = serializers.ReadOnlyField()
    created_by = serializers.ReadOnlyField(source="created_by.username")

    class Meta:
        model = Room
        fields = ['id', "name", "slug", "created_by", "created_at", "last_message"]

    def get_last_message(self, obj):
        msg = obj.messages.order_by("-timestamp").first()
        return MessageSerializer(msg).data if msg else None
    
    def create(self, validate_data):
        name = validate_data["name"]
        validate_data["slug"] = slugify(name)
        return super().create(validate_data)