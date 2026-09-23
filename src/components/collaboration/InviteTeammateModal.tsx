import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Copy, 
  Check, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  QrCode,
  CheckCircle2
} from 'lucide-react';
import { TeamMember } from '../../types/collaboration';

interface InviteTeammateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: TeamMember) => void;
}

export const InviteTeammateModal: React.FC<InviteTeammateModalProps> = ({
  isOpen,
  onClose,
  onAddMember
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamMember['role']>('Prompt Engineer');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const inviteUrl = 'https://winrstudio.sh/challenge/room/IGNYTE-VOICE-DXB-9842';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim()) return;

    const colors = ['#f43f5e', '#38bdf8', '#34d399', '#fbbf24', '#a855f7', '#ec4899'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newMember: TeamMember = {
      id: `user-${Date.now()}`,
      name: inviteName.trim(),
      role: inviteRole,
      avatar: inviteName.trim().charAt(0).toUpperCase(),
      color: randomColor,
      status: 'online',
      currentViewing: 'Connected',
      lastActive: 'Just now'
    };

    onAddMember(newMember);
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setInviteName('');
      setInviteEmail('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0f1118] border border-[#23283b] shadow-2xl p-6 text-slate-100 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Invite Teammates
              </h3>
              <p className="text-[11px] text-slate-400">
                Ignyte × ElevenLabs Voice Challenge Room
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shareable Link Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Direct Collaboration Link
          </label>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#151824] border border-[#262c3f]">
            <input
              type="text"
              readOnly
              value={inviteUrl}
              className="flex-1 bg-transparent text-xs font-mono text-rose-300 focus:outline-hidden"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1 rounded-lg bg-[#202538] hover:bg-rose-600 text-xs font-medium text-white transition-colors shrink-0 flex items-center gap-1"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Send Direct Invite */}
        <form onSubmit={handleSendInvite} className="space-y-3 pt-2 border-t border-[#1e2333]">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Teammate Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Fatima Al-Zahra"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              className="w-full bg-[#151824] border border-[#282e44] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Role in Challenge
            </label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as any)}
              className="w-full bg-[#151824] border border-[#282e44] rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-rose-500"
            >
              <option value="Prompt Engineer">Prompt Engineer</option>
              <option value="Full-Stack Dev">Full-Stack Dev</option>
              <option value="Compliance Auditor">Compliance Auditor</option>
              <option value="Lead Architect">Lead Architect</option>
              <option value="Mentor">Competition Mentor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-xs transition-all shadow-md shadow-rose-950/40 mt-2"
          >
            {sentSuccess ? 'Collaborator Added!' : 'Add to Active Room'}
          </button>
        </form>
      </div>
    </div>
  );
};
