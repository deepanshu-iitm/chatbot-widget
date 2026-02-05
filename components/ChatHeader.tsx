
import React from 'react';
import { ICONS } from '../constants.tsx';

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onMinimize, onClose }) => {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="bg-white/20 p-2 rounded-lg">
            <ICONS.Bot />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-600 rounded-full"></span>
        </div>
        <div>
          <h3 className="font-bold text-sm tracking-wide">Chat Assistant</h3>
          <p className="text-[10px] text-blue-100 flex items-center">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
            Always online
          </p>
        </div>
      </div>
      <div className="flex space-x-1">
        <button 
          onClick={onMinimize}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          title="Minimize"
        >
          <ICONS.Minimize />
        </button>
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          title="Close"
        >
          <ICONS.Close />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
