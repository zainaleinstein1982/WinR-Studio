import React, { useState } from 'react';
import { 
  Users, 
  Share2, 
  MessageSquare, 
  Activity, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Copy, 
  Check, 
  Radio, 
  Plus,
  Send
} from 'lucide-react';
import { TeamMember, ActivityEvent, TeamComment } from '../../types/collaboration';

interface LiveCollaborationPanelProps {
  collaborators: TeamMember[];
  activityLogs: ActivityEvent[];
  comments: TeamComment[];
  onAddComment: (content: string, boxId?: string) => void;
  onOpenInviteModal: () => void;
  onNavigateToBox: (boxId: string) => void;
}

export const LiveCollaborationPanel: React.FC<LiveCollaborationPanelProps> = ({
  collaborators,
  activityLogs,
  comments,
  onAddComment,
  onOpenInviteModal,
  onNavigateToBox
}) => {
  const [newComment, setNewComment] = useState('');
  const [selectedBoxTag, setSelectedBoxTag] = useState<string>('all');
  const [copiedRoom, setCopiedRoom] = useState(false);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment.trim(), selectedBoxTag === 'all' ? undefined : selectedBoxTag);
    setNewComment('');
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText('IGNYTE-VOICE-DXB-9842');
    setCopiedRoom(true);
    setTimeout(() => setCopiedRoom(false), 2000);
  };

  return (
    <div className="space-y-6 pt-6 animate-in fade-in duration-300">
      {/* Collaboration Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#11131c] via-[#1a141f] to-[#11131c] border border-[#262b3d] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
                Live Real-Time Team Co-Editing
              </span>
              <span className="text-xs font-mono text-slate-400">
                Room: IGNYTE-VOICE-DXB-9842
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Live Team Collaboration Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Work simultaneously with your co-founders, prompt engineers, and compliance officers on the 14-Box Canvas and Stage 2 deliverables with instant broadcast synchronization.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyRoomCode}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#161924] hover:bg-[#1e2333] border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              {copiedRoom ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedRoom ? 'Room Copied' : 'Copy Room Code'}</span>
            </button>

            <button
              onClick={onOpenInviteModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-950/40 transition-all hover:scale-[1.02]"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Invite Teammates</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1: Active Collaborators List */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-[#0f1118] border border-[#1e2333] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                <span>Connected Members ({collaborators.length})</span>
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="space-y-2.5">
              {collaborators.map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded-xl bg-[#141724] border border-[#212638] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-slate-950 ring-2 ring-slate-800"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.avatar}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs text-white">{member.name}</span>
                        {member.status === 'online' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block">{member.role}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-rose-300 font-mono">
                      {member.currentViewing || 'Idle'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity Ticker */}
          <div className="rounded-2xl bg-[#0f1118] border border-[#1e2333] p-5 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              <span>Live Activity Feed</span>
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
              {activityLogs.map((log) => (
                <div key={log.id} className="text-[11px] p-2 rounded-lg bg-[#141724] border border-[#1d2232] text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold" style={{ color: log.userColor }}>
                      {log.userName}
                    </span>
                    <span className="text-[9px] text-slate-500">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-400">
                    {log.action} <strong className="text-slate-200 font-normal">{log.target}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2 & 3: Inline Team Review Comments & Thread */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl bg-[#0f1118] border border-[#1e2333] p-6 space-y-4 flex flex-col h-full justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-rose-400" />
                  <span>Team Canvas Annotations & Review Threads</span>
                </h3>

                <span className="text-xs text-slate-400">
                  {comments.length} Discussion Notes
                </span>
              </div>

              {/* Comments List */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto no-scrollbar pr-1">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 rounded-xl bg-[#141724] border border-[#23283b] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-bold text-xs"
                          style={{ color: comment.authorColor }}
                        >
                          {comment.authorName}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {comment.authorRole}
                        </span>
                        {comment.boxId && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 font-mono border border-rose-500/30">
                            Tag: {comment.boxId}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-500">
                        {comment.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Post New Comment Input */}
            <form onSubmit={handleSendComment} className="mt-4 pt-4 border-t border-[#1e2333] space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Pin to Canvas Box:</span>
                <select
                  value={selectedBoxTag}
                  onChange={(e) => setSelectedBoxTag(e.target.value)}
                  className="bg-[#181c28] border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-hidden"
                >
                  <option value="all">General Team Note</option>
                  <option value="boxA">Box A: Title & Overview</option>
                  <option value="boxD">Box D: Baseline & Pain</option>
                  <option value="boxG">Box G: ElevenLabs Stack</option>
                  <option value="boxI">Box I: Guardrails Matrix</option>
                  <option value="boxJ">Box J: Target KPIs</option>
                  <option value="boxN">Box N: Prototype Sandbox</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a review note or architecture suggestion for your team..."
                  className="flex-1 bg-[#161924] border border-[#282e44] rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-rose-500"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
