import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  FileText, 
  CheckCircle2, 
  UploadCloud, 
  Compass, 
  MessageSquare, 
  Award, 
  User, 
  Clock, 
  AlertTriangle,
  Download,
  ShieldCheck,
  Zap,
  Volume2
} from 'lucide-react';
import { UserProfile, ComplianceReport } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  complianceReport: ComplianceReport;
  onOpenProfile: () => void;
  onOpenExportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  complianceReport,
  onOpenProfile,
  onOpenExportModal
}) => {
  // Countdown to Stage 1 Deadline: 23 Sep 2026 23:59:59 GST
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number }>({
    days: 1,
    hours: 22,
    mins: 30,
    secs: 22
  });

  useEffect(() => {
    const targetDate = new Date('2026-09-23T23:59:59+04:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, mins, secs });
      } else {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers, badge: null },
    { id: 'explorer', label: 'Tracks & Use Cases', icon: Compass, badge: '8 Cases' },
    { id: 'canvas', label: 'Stage 1: Idea Canvas', icon: FileText, badge: '14 Boxes' },
    { id: 'sprint', label: 'Stage 2: Build Sprint', icon: Zap, badge: 'Voice Sprint' },
    { 
      id: 'compliance', 
      label: 'Compliance Auditor', 
      icon: ShieldCheck, 
      badge: complianceReport.isFullyCompliant ? '100%' : `${complianceReport.score}%`,
      badgeColor: complianceReport.isFullyCompliant ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    { id: 'submission', label: 'Submit Package', icon: UploadCloud, badge: 'Final' },
    { id: 'studio', label: 'Win Audio TTS Studio', icon: Volume2, badge: 'Live Studio', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { id: 'forum', label: 'Public Forum', icon: MessageSquare, badge: null },
    { id: 'judge', label: 'Judge Scorecard', icon: Award, badge: 'Rubric' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
      {/* Top Gold Dubai Innovation Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-amber-500/20 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-amber-300 tracking-wide">
              IGNYTE × ELEVENLABS VOICE CHALLENGE 2026
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300 text-[11px]">
              DIFC Dubai Digital Economy Mandate
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            {/* Countdown Badge */}
            <div className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-900/90 px-2.5 py-0.5 rounded border border-amber-500/30 text-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Stage 1 Due in:</span>
              <span className="font-bold text-amber-300">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m {timeLeft.secs}s
              </span>
            </div>

            {/* Track ID Pill */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-300">
              <span className="px-1.5 py-0.5 rounded bg-blue-950 border border-blue-500/40 text-blue-300 font-mono">
                {user.track === 'track_1' ? 'Track 1: Banking & Insurance' : 'Track 2: Gov Services'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform identity */}
          <button 
            id="nav-brand-btn"
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 group text-left transition-transform hover:scale-[1.01]"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-900/30 border border-amber-400/40 text-slate-950 font-black">
              <Volume2 className="w-5 h-5 text-slate-950 animate-pulse" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border border-slate-950 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  Ignyte <span className="text-amber-400 font-black">×</span> ElevenLabs
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  COMPANION
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal">
                Idea Canvas & Build Sprint Hub
              </p>
            </div>
          </button>

          {/* Quick Actions & Profile */}
          <div className="flex items-center gap-2.5">
            <button
              id="nav-quick-export-btn"
              onClick={onOpenExportModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
              title="Export Canvas / Backup"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export</span>
            </button>

            {/* Compliance Quick Status */}
            <button
              id="nav-compliance-status-btn"
              onClick={() => setActiveTab('compliance')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                complianceReport.isFullyCompliant 
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/60' 
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-950/60'
              }`}
            >
              {complianceReport.isFullyCompliant ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span className="hidden sm:inline">Compliance:</span>
              <span className="font-bold">{complianceReport.score}%</span>
            </button>

            {/* Participant Profile Button */}
            <button
              id="nav-user-profile-btn"
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition-all hover:border-amber-500/40"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-[10px]">
                {user.teamLeadName.charAt(0) || 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[11px] font-semibold text-slate-200 leading-tight truncate max-w-[110px]">
                  {user.startupName || 'Registered Team'}
                </p>
                <p className="text-[9px] text-amber-400/90 font-mono leading-none">
                  {user.ignyteId}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 border-t border-slate-900">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold border ${
                      item.badgeColor 
                        ? item.badgeColor 
                        : isActive 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
