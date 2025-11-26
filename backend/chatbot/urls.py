from django.urls import path
from .views import ChatbotView, ProductSearchAIView, ChatHistoryView

urlpatterns = [
    path('api/chatbot/', ChatbotView.as_view(), name='chatbot'),
    path('api/search-suggestions/', ProductSearchAIView.as_view(), name='search-suggestions'),
    path('api/chat-history/', ChatHistoryView.as_view(), name='chat-history'),
]
