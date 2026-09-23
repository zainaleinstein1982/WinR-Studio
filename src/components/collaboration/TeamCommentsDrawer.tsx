import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Users
} from 'lucide-react';
import { TeamComment, TeamMember } from '../../types/collaboration';

interface TeamCommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: TeamComment[];
  collaborators: TeamMember[];
  onAddComment: (content: string, boxId?: string) => void;
}

export const TeamCommentsDrawer: React.FC<TeamCommentsDrawerProps> = ({
  isOpen,
  onClose,
  comments,
  collaborators,
  onAddComment
}) => {
  const [content, setContent] = useState('');
  const [boxId, setBoxId] = useState('all');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAddComment(content.trim(), boxId === 'all' ? undefined : boxId);
    setContent('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0e1017] border-l border-[#202535] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-[#202535] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-rose-400" />
          <h3 className="font-bold text-sm text-white">
            Team Review & Comments
          </h3>
          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300">
            {comments.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Online Team Strip */}
      <div className="px-4 py-2.5 bg-[#131622] border-b border-[#202535] flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px]">Online Now:</span>
        <div className="flex items-center gap-1.5">
          {collaborators.filter(c => c.status === 'online').map(c => (
            <span
              key={c.id}
              className="px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-900"
              style={{ backgroundColor: c.color }}
            >
              {c.name.split(' ')[0]}
            </span>
          ))}
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-3.5 rounded-xl bg-[#151824] border border-[#242a3e] space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs" style={{ color: comment.authorColor }}>
                  {comment.authorName}
                </span>
                <span className="text-[10px] text-slate-400">
                  {comment.authorRole}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">{comment.timestamp}</span>
            </div>

            {comment.boxId && (
              <span className="inline-block text-[10px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-500/30 font-mono">
                {comment.boxId}
              </span>
            )}

            <p className="text-xs text-slate-200 leading-relaxed">
              {comment.content}
            </p>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#202535] bg-[#0c0e15] space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">Tag:</span>
          <select
            value={boxId}
            onChange={(e) => setBoxId(e.target.value)}
            className="bg-[#161924] border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-hidden"
          >
            <option value="all">General</option>
            <option value="Box D">Box D (Baseline)</option>
            <option value="Box G">Box G (ElevenLabs)</option>
            <option value="Box I">Box I (Guardrails)</option>
            <option value="Box J">Box J (Target KPIs)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type comment..."
            className="flex-1 bg-[#161924] border border-[#282e44] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-rose-500"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
