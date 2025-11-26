from django.db import models
from django.contrib.auth.models import User


class ChatHistory(models.Model):
    """Store chat history for users"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    user_message = models.TextField()
    bot_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Chat - {self.user} at {self.created_at}"
