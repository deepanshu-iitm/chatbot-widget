
import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../constants.tsx';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-4 bg-white border-t border-slate-100 flex items-center space-x-2"
    >
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? "Please wait..." : "Type a message..."}
        className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-700 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 disabled:bg-slate-300 transition-all active:scale-90 shadow-md flex items-center justify-center"
      >
        <ICONS.Send />
      </button>
    </form>
  );
};

export default ChatInput;
