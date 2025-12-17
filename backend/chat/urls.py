from django.urls import path
from .views import RoomListCreateView, RoomDetailView,MessageListCreateView, MessageDetailView

urlpatterns = [
    path("rooms/", RoomListCreateView.as_view(), name="room-list-create"),
    path("rooms/<slug:slug>/", RoomDetailView.as_view(), name="room-detail"),
    
    path("rooms/<slug:slug>/messages/", MessageListCreateView.as_view(), name="room-message"),
    path("messages/<int:pk>/", MessageDetailView.as_view(), name="message-detail"),
]
