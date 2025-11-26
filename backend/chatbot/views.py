import os
import json
import google.generativeai as genai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from .models import ChatHistory

# Configure Gemini API
gemini_key = os.getenv('GEMINI_API_KEY') or getattr(settings, 'GEMINI_API_KEY', None)
if gemini_key:
    genai.configure(api_key=gemini_key)


class ChatbotView(APIView):
    """
    AI Chatbot endpoint
    POST: Send user message, get AI response
    """
    
    def post(self, request):
        try:
            user_message = request.data.get('message', '').strip()
            
            if not user_message:
                return Response(
                    {"error": "Message is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if not gemini_key:
                return Response(
                    {"error": "Gemini API key not configured"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            # Initialize Gemini model (using latest stable model)
            model = genai.GenerativeModel('gemini-2.0-flash')
            
            # Create system prompt for e-commerce chatbot
            system_prompt = """You are a helpful and friendly e-commerce assistant for an online store.
            You help customers with:
            - Product availability and pricing
            - Product recommendations based on their needs
            - Order information and tracking
            - Delivery details and timelines
            - Discount codes and promotions
            - General shopping questions
            - Payment methods and security
            
            Personality:
            - Be friendly and conversational
            - Use emojis occasionally (but not excessively)
            - Be concise but helpful
            - If you don't know something, say so honestly
            - Keep responses under 200 words
            
            Remember: You represent the store, so be professional yet approachable."""
            
            # Create conversation with system context
            response = model.generate_content([
                system_prompt,
                "\n\nCustomer Question: " + user_message
            ])
            bot_response = response.text if response.text else "I'm having trouble responding right now. Please try again."
            
            # Save to database if user is authenticated
            if request.user.is_authenticated:
                ChatHistory.objects.create(
                    user=request.user,
                    user_message=user_message,
                    bot_response=bot_response
                )
            
            return Response({
                "user_message": user_message,
                "bot_response": bot_response,
                "status": "success"
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": str(e), "details": "Failed to get response from AI"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ProductSearchAIView(APIView):
    """
    Smart product search with AI suggestions
    """
    
    def get(self, request):
        try:
            query = request.query_params.get('q', '').strip()
            
            if not query:
                return Response(
                    {"suggestions": []},
                    status=status.HTTP_200_OK
                )
            
            if not gemini_key:
                return Response(
                    {"error": "Gemini API key not configured"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            # Get AI suggestions for product search (using latest model)
            model = genai.GenerativeModel('gemini-2.0-flash')
            
            prompt = f"""Given the search query: "{query}"
            
            Provide 5 product suggestions that would match this query in an e-commerce store.
            Format as JSON array with 'name' and 'description' for each product.
            
            IMPORTANT: Return ONLY valid JSON, no other text or explanation.
            
            Example format (return EXACTLY like this):
            [
                {{"name": "MacBook Pro 16\\\"", "description": "High-performance laptop for professionals"}},
                {{"name": "MacBook Air M2", "description": "Lightweight and fast laptop"}}
            ]"""
            
            response = model.generate_content(prompt)
            
            try:
                # Parse JSON response
                response_text = response.text.strip()
                # Remove markdown code blocks if present
                if response_text.startswith('```'):
                    response_text = response_text.split('```')[1]
                    if response_text.startswith('json'):
                        response_text = response_text[4:]
                    response_text = response_text.strip()
                
                suggestions = json.loads(response_text)
            except json.JSONDecodeError:
                suggestions = [{"name": query, "description": "Search for: " + query}]
            
            return Response({
                "query": query,
                "suggestions": suggestions,
                "status": "success"
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": str(e), "suggestions": []},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ChatHistoryView(APIView):
    """
    Get user's chat history (authenticated users only)
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        try:
            # Get last 20 messages
            chat_history = ChatHistory.objects.filter(
                user=request.user
            )[:20]
            
            messages = [
                {
                    "user_message": chat.user_message,
                    "bot_response": chat.bot_response,
                    "created_at": chat.created_at
                }
                for chat in chat_history
            ]
            
            return Response({
                "messages": messages,
                "status": "success"
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
