import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hi! 👋 How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        const userMsg = { type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Send to backend
            const response = await axios.post('/api/chatbot/', {
                message: input
            });

            // Add bot response
            const botMsg = {
                type: 'bot',
                text: response.data.bot_response
            };
            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            const errorMsg = {
                type: 'bot',
                text: '😟 Sorry, I encountered an error. Please try again.'
            };
            setMessages(prev => [...prev, errorMsg]);
            console.error('Chatbot error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <div
                className="chatbot-floating-btn"
                onClick={() => setIsOpen(!isOpen)}
                title="Chat with AI Assistant"
            >
                <span className="chatbot-icon">💬</span>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>🤖 AI Assistant</h3>
                        <button
                            className="chatbot-close"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.type}`}>
                                <div className="message-content">
                                    {msg.type === 'bot' && <span className="bot-icon">🤖</span>}
                                    <p>{msg.text}</p>
                                    {msg.type === 'user' && <span className="user-icon">👤</span>}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="message bot">
                                <div className="message-content">
                                    <span className="bot-icon">🤖</span>
                                    <div className="typing-indicator">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything..."
                            disabled={loading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            className="send-btn"
                        >
                            📤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
