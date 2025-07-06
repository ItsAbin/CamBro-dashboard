import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import './AIChatBot.css';

function AIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am CampBro, your education assistant. How can I help you with your studies today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize Gemini AI (the client gets API key from environment variable GEMINI_API_KEY)
  const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

  // System prompt for education-focused responses
  const systemPrompt = `You are CamBro, an educational assistant for college students. You should only answer questions related to education, academics, campus life, study tips, career guidance, course information, and general student support. 

If someone asks about topics unrelated to education (like entertainment, sports, personal relationships, etc.), politely redirect them back to educational topics.

Keep your responses helpful, friendly, and concise. Have Short responses, no more than 2-3 sentences without markdown.`;

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Create the prompt with system instructions and user input
      const prompt = `${systemPrompt}\n\nUser question: ${userInput}`;
      
      // Generate response using Gemini with correct API structure
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      
      const botReply = response.text;
      const botMessage = { role: 'bot', text: botReply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini AI Error:', error);
      let errorMessage;
      
      if (error.message?.includes('API key') || error.message?.includes('authentication')) {
        errorMessage = { role: 'bot', text: 'Sorry, there seems to be an API configuration issue. Please check with your administrator.' };
      } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
        errorMessage = { role: 'bot', text: 'Sorry, I\'m currently experiencing high usage. Please try again in a moment.' };
      } else {
        errorMessage = { role: 'bot', text: 'I apologize, but I\'m having trouble processing your request right now. Please try again.' };
      }
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-bot-floating">
      <button 
        className={`ai-bot-button ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="ri-message-3-line"></i>
      </button>
      
      <div className={`chatbot-container ${isOpen ? 'active' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-icon">
            <i className="ri-robot-line"></i>
          </div>
          <div className="chat-header-text">
            <h3>CamBro Assistant</h3>
            <p>Ask me anything about campus!</p>
          </div>
          <button 
            className="chat-close-btn"
            onClick={() => setIsOpen(false)}
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="message bot">
              <span className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about courses, study tips, campus life..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            <i className="ri-send-plane-line"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIBot;