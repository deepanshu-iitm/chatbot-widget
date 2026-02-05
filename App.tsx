
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, QuickReply, UserInfo } from './types';
import { INITIAL_QUICK_REPLIES, ICONS } from './constants.tsx';
import { getResponse } from './services/responseService';
import ChatHeader from './components/ChatHeader';
import MessageItem from './components/MessageItem';
import QuickReplies from './components/QuickReplies';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [isCollectingInfo, setIsCollectingInfo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial Greeting
  useEffect(() => {
    const greeting: Message = {
      id: 'greeting',
      role: 'bot',
      text: "Hi there! How can I help you today?",
      timestamp: new Date()
    };
    setMessages([greeting]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const addMessage = (role: 'user' | 'bot', text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (text: string) => {
    addMessage('user', text);
    setIsLoading(true);

    // Simulate typing delay for better UX
    setTimeout(() => {
      let response = '';
      
      // Handle user information collection
      if (isCollectingInfo) {
        if (!userInfo.name) {
          // Collect name
          setUserInfo({ ...userInfo, name: text });
          response = `Nice to meet you, ${text}! Could you please provide your email address?`;
        } else if (!userInfo.email) {
          // Collect email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(text)) {
            setUserInfo({ ...userInfo, email: text });
            response = `Perfect! I've saved your information. Our team will reach out to you at ${text} shortly. Is there anything else I can help you with?`;
            setIsCollectingInfo(false);
          } else {
            response = "That doesn't look like a valid email address. Could you please provide a valid email?";
          }
        }
      } else {
        // Normal conversation
        response = getResponse(text);
      }
      
      setIsLoading(false);
      addMessage('bot', response);
      
      // Check if we should trigger lead generation
      if (!isCollectingInfo && !userInfo.email && (text.toLowerCase().includes('demo') || text.toLowerCase().includes('pricing'))) {
        setTimeout(() => {
          addMessage('bot', "By the way, I can set that up for you! Should I connect you with our team? Just tell me your name.");
          setIsCollectingInfo(true);
        }, 800);
      }
    }, 600);
  };

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.value);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Widget Launcher */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 group relative"
        >
          <ICONS.Chat />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
          </span>
        </button>
      )}

      {/* Minimized Bar */}
      {isOpen && isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3 transition-all transform hover:translate-y-[-4px]"
        >
          <div className="bg-white/20 p-1.5 rounded-full"><ICONS.Bot /></div>
          <span className="font-medium text-sm">Chat Assistant (Active)</span>
        </button>
      )}

      {/* Main Chat Window */}
      {isOpen && !isMinimized && (
        <div className="w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
          <ChatHeader onMinimize={handleMinimize} onClose={toggleChat} />
          
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 chat-scrollbar bg-slate-50/30"
          >
            {messages.map((msg) => (
              <MessageItem key={msg.id} message={msg} />
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          {!isLoading && (
            <QuickReplies replies={INITIAL_QUICK_REPLIES} onReplyClick={handleQuickReply} />
          )}

          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      )}
    </div>
  );
};

export default App;
