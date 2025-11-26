from django.contrib import admin
from .models import ChatHistory


class ChatHistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'user_message_preview')
    list_filter = ('created_at', 'user')
    search_fields = ('user_message', 'bot_response', 'user__username')
    readonly_fields = ('created_at',)
    
    def user_message_preview(self, obj):
        return obj.user_message[:50] + '...' if len(obj.user_message) > 50 else obj.user_message
    
    user_message_preview.short_description = 'User Message'


admin.site.register(ChatHistory, ChatHistoryAdmin)
