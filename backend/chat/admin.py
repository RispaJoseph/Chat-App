from django.contrib import admin
from .models import Room, Message

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created_by", "created_at")
    search_fields = ("name", "slug")

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("user", "room", "text", "timestamp")
    list_filter = ("room", "user")
    search_fields = ("text,")

