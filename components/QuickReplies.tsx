
import React from 'react';
import { QuickReply } from '../types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onReplyClick: (reply: QuickReply) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ replies, onReplyClick }) => {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-2 bg-slate-50/50">
      {replies.map((reply) => (
        <button
          key={reply.id}
          onClick={() => onReplyClick(reply)}
          className="text-xs font-medium text-blue-600 bg-white border border-blue-100 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm active:scale-95"
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
