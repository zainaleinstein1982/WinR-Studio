import React, { useState } from 'react';
import { 
  Volume2, 
  Sparkles, 
  Github, 
  Download, 
  Users, 
  Share2, 
  Radio, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';
import { TeamMember } from '../../types/collaboration';

interface VoiceStudioHeaderProps {
  activeTopLink: string;
  setActiveTopLink: (link: string) => void;
  collaborators: TeamMember[];
  onOpenInviteModal: () => void;
  onOpenComments: () => void;
  onOpenDemoSimulation: () => void;
  complianceScore: number;
}

export const VoiceStudioHeader: React.FC<VoiceStudioHeaderProps> = ({
  activeTopLink,
  setActiveTopLink,
  collaborators,
  onOpenInviteModal,
  onOpenComments,
  onOpenDemoSimulation,
  complianceScore
}) => {
  const [copiedInstall, setCopiedInstall] = useState(false);

  const onlineCollaborators = collaborators.filter(c => c.status === 'online');

  return (
    <header className="w-full bg-[#08090d] border-b border-[#1f232e] select-none sticky top-0 z-50 backdrop-blur-md">
      {/* Top Challenge Alert Bar */}
      <div className="bg-gradient-to-r from-[#0d0f17] via-[#1a0f18] to-[#0d0f17] border-b border-[#2e1520] px-4 py-1 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-semibold text-rose-300 uppercase tracking-wider">
              Ignyte × ElevenLabs Voice Challenge 2026
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 hidden sm:inline">DIFC Dubai Innovation Hub</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
              <ShieldCheck className="w-3 h-3" />
              <span>Compliance: <strong>{complianceScore}%</strong></span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-rose-300 font-mono bg-rose-950/30 px-2 py-0.5 rounded border border-rose-500/20">
              <Radio className="w-3 h-3 text-rose-400 animate-pulse" />
              <span>Live Co-Editing Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main VoiceStudio Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: VoiceStudio Logo */}
        <div className="flex items-center gap-3">
          <button 
            id="brand-home-btn"
            onClick={() => setActiveTopLink('cloud')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-hidden"
          >
            {/* Audio Wave Logo */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-rose-400 shadow-md shadow-rose-900/40">
              <Volume2 className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-black" />
            </div>

            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-rose-300 transition-colors">
              WinR Studio
            </span>
          </button>
        </div>

        {/* Center/Right Menu Links */}
        <div className="flex items-center gap-1 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTopLink('models')}
              className={`transition-colors cursor-pointer ${
                activeTopLink === 'models' ? 'text-rose-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Models
            </button>
            <button
              onClick={() => setActiveTopLink('pro')}
              className={`transition-colors cursor-pointer ${
                activeTopLink === 'pro' ? 'text-rose-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Pro
            </button>
            <button
              onClick={() => setActiveTopLink('docs')}
              className={`transition-colors cursor-pointer ${
                activeTopLink === 'docs' ? 'text-rose-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Docs
            </button>
            <button
              onClick={() => setActiveTopLink('cloud')}
              className={`relative py-1 transition-colors font-semibold cursor-pointer ${
                activeTopLink === 'cloud' ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Cloud</span>
              {activeTopLink === 'cloud' && (
                <span className="absolute bottom-[-18px] left-0 right-0 h-[2px] bg-rose-500 shadow-sm shadow-rose-500" />
              )}
            </button>
          </nav>

          {/* Collaboration Presence Bar */}
          <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
            {/* Avatars of Online Team Members */}
            <div className="flex items-center -space-x-1.5 cursor-pointer" onClick={onOpenComments} title="Active Team Collaborators">
              {onlineCollaborators.slice(0, 3).map((collab) => (
                <div
                  key={collab.id}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-slate-950 ring-2 ring-[#08090d] shadow-sm relative group"
                  style={{ backgroundColor: collab.color }}
                >
                  {collab.avatar}
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-[#08090d]" />
                  <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap bg-slate-900 border border-slate-700 text-white text-[10px] px-2 py-0.5 rounded shadow-lg z-50">
                    {collab.name} ({collab.role})
                  </div>
                </div>
              ))}
              {onlineCollaborators.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold ring-2 ring-[#08090d]">
                  +{onlineCollaborators.length - 3}
                </div>
              )}
            </div>

            {/* Invite Collaborator Button */}
            <button
              id="invite-collab-btn"
              onClick={onOpenInviteModal}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
              title="Invite Teammates to Live Session"
            >
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>Team ({onlineCollaborators.length})</span>
            </button>
          </div>

          {/* Interactive Demo & Simulation Guide Button */}
          <button
            id="demo-simulation-btn"
            onClick={onOpenDemoSimulation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-900/60 to-purple-900/60 hover:from-indigo-900 hover:to-purple-900 border border-indigo-500/40 text-indigo-200 hover:text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
            title="Interactive Demo & Step-by-Step Guide (EN / ID)"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Demo & Guide (EN/ID)</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* GitHub Star Badge */}
          <a
            href="https://github.com/debpalash/VoiceStudio"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151821] hover:bg-[#1d222e] border border-[#2b303f] text-xs font-medium text-slate-200 transition-colors shadow-2xs"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="font-bold">34,053</span>
          </a>

          {/* Download Button (Matching coral pill in screenshot) */}
          <button
            id="header-download-btn"
            onClick={() => setActiveTopLink('cloud')}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-xs transition-all shadow-md shadow-rose-950/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            Download
          </button>
        </div>
      </div>
    </header>
  );
};
