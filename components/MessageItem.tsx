
import React from 'react';
import { Message } from '../types';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isBot = message.role === 'bot' || message.role === 'system';
  
  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
        isBot 
          ? 'bg-white text-slate-700 rounded-tl-none border border-slate-100' 
          : 'bg-blue-600 text-white rounded-tr-none'
      }`}>
        <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
        <div className={`text-[9px] mt-1.5 opacity-60 ${isBot ? 'text-slate-400' : 'text-blue-100'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
