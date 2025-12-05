from django.urls import path
from .views import RoomListCreateView, MessageListView

urlpatterns = [
    path("rooms/", RoomListCreateView.as_view(), name="room-list-create"),
    path("rooms/<slug:slug>/messages/", MessageListView.as_view(), name="room-messages"),
]
