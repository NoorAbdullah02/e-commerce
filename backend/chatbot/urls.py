from django.urls import path
from .views import ChatbotView, ProductSearchAIView, ChatHistoryView

urlpatterns = [
    path('chatbot/', ChatbotView.as_view(), name='chatbot'),
    path('search-suggestions/', ProductSearchAIView.as_view(), name='search-suggestions'),
    path('chat-history/', ChatHistoryView.as_view(), name='chat-history'),
]
