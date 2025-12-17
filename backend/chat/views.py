from rest_framework import generics, permissions
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer
from .permissions import IsOwner, IsRoomOwner

class RoomListCreateView(generics.ListCreateAPIView):
    queryset = Room.objects.all().order_by("-created_at")
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticated, IsRoomOwner]
    
    lookup_field = "slug"
    
    def get_queryset(self):
        return Room.objects.filter(created_by= self.request.user)

class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        slug = self.kwargs["slug"]
        return Message.objects.filter(room__slug=slug).order_by("timestamp")
    def perform_create(self, serializer):
        slug = self.kwargs["slug"]
        room = Room.objects.get(    slug=slug)
        serializer.save(
            user = self.request.user,
            room = room
        )

class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
    def get_queryset(self):
        return Message.objects.filter(user=self.request.user)