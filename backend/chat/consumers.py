import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import Room, Message

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_slug = self.scope["url_route"]["kwargs"]["slug"]
        self.group_name = f"chat_{self.room_slug}"

        user = self.scope["user"]
        if not user or user.is_anonymous:
            await self.close(code=4001)
            return

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data.get("message")
        # user = self.scope["user"]
        # msg = await self.create_message(user.id, self.room_slug, message)
        user = self.scope.get("user")

        if user is None or user.is_anonymous:
            username = "guest"
            msg = None
        else:
            msg = await self.create_message(user.id, self.room_slug, message)
            username = user.username


        
        payload = {
            "type": "chat_message",
            "message": message,
            "username": username,
            "timestamp": msg.timestamp.isoformat() if msg else None,
        }
        await self.channel_layer.group_send(self.group_name, payload)

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "username": event["username"],
            "timestamp": event["timestamp"],
        }))

    # @database_sync_to_async
    # def create_message(self, user_id, room_slug, text):
    #     room, _ = Room.objects.get_or_create(slug=room_slug, defaults={"name":room_slug})
    #     user = User.objects.get(pk=user_id)
    #     return Message.objects.create(room=room, user=user, text=text)


    @database_sync_to_async
    def create_message(self, user_id, room_slug, text):
        if not user_id:
            return None

        room, _ = Room.objects.get_or_create(
            slug=room_slug,
            defaults={"name": room_slug}
        )
        user = User.objects.get(pk=user_id)
        return Message.objects.create(room=room, user=user, text=text)
