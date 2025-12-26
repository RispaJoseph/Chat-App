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

        user = self.scope.get("user")
        if not user or not user.is_authenticated:
            await self.close(code=4001)
            return

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

        # 🔥 Send chat history on connect
        messages = await self.get_last_messages(self.room_slug)
        for msg in messages:
            await self.send(text_data=json.dumps({
                "message": msg.text,
                "username": msg.user.username,
                "timestamp": msg.timestamp.isoformat(),
                "history": True,
            }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data or "{}")
        message = data.get("message")

        if not message or not isinstance(message, str):
            return

        user = self.scope["user"]

        msg = await self.create_message(user.id, self.room_slug, message)

        payload = {
            "type": "chat_message",
            "message": msg.text,
            "username": user.username,
            "timestamp": msg.timestamp.isoformat(),
        }

        await self.channel_layer.group_send(self.group_name, payload)

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    # ---------------- DB HELPERS ---------------- #

    @database_sync_to_async
    def create_message(self, user_id, room_slug, text):
        room = Room.objects.get(slug=room_slug)
        user = User.objects.get(pk=user_id)
        return Message.objects.create(room=room, user=user, text=text)

    @database_sync_to_async
    def get_last_messages(self, room_slug, limit=20):
        return list(
            Message.objects
            .filter(room__slug=room_slug)
            .order_by("-timestamp")[:limit][::-1]
        )
