import React from 'react';
import { 
  Sun, 
  Moon, 
  Globe, 
  Headphones, 
  Users, 
  BookOpen, 
  Sparkles,
  MessageSquareQuote
} from 'lucide-react';

interface TopNavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentLanguage: string;
  onChangeLanguage: (lang: string) => void;
  onOpenUpgrade: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  isDarkMode,
  onToggleTheme,
  currentLanguage,
  onChangeLanguage,
  onOpenUpgrade
}) => {
  return (
    <header className="h-14 border-b border-[#192b52] bg-[#0b1632] px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-30 transition-colors">
      {/* Left section: Logo & App Title & Breadcrumb */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2.5">
          {/* Animated soundwave logo */}
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm ring-1 ring-blue-400/30">
            <div className="flex items-center space-x-0.5">
              <span className="w-0.5 h-3 bg-current rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-5 bg-current rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-2.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              <span className="w-0.5 h-4 bg-current rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
            </div>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="font-bold text-base tracking-tight text-white font-display">
              Win Audio
            </span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-[#16274e] text-blue-300 border border-[#233a6d]">
              v2.1
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-[#1f335e]" />

        {/* Active Tool Label with Icon */}
        <div className="flex items-center space-x-2 text-slate-200 font-medium text-sm">
          <BookOpen className="w-4 h-4 text-blue-400" />
          <span>Text To Speech</span>
        </div>
      </div>

      {/* Right section: Toolbar actions */}
      <div className="flex items-center space-x-3">
        {/* Theme Toggle */}
        <button
          id="theme-toggle-btn"
          onClick={onToggleTheme}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#16274e] transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-slate-300" />}
        </button>

        {/* Language Selector */}
        <div className="relative group">
          <button
            id="lang-select-btn"
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#16274e] transition-colors"
            title="Language"
          >
            <Globe className="w-4 h-4" />
          </button>
          <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-[#0e1c3e] border border-[#233a69] rounded-xl shadow-2xl py-1 min-w-[140px] z-50">
            <button
              onClick={() => onChangeLanguage('en')}
              className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#192b52] flex items-center justify-between ${currentLanguage === 'en' ? 'text-blue-400 font-semibold' : 'text-slate-200'}`}
            >
              <span>English (US)</span>
              {currentLanguage === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
            </button>
            <button
              onClick={() => onChangeLanguage('id')}
              className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#192b52] flex items-center justify-between ${currentLanguage === 'id' ? 'text-blue-400 font-semibold' : 'text-slate-200'}`}
            >
              <span>Bahasa Indonesia</span>
              {currentLanguage === 'id' && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
            </button>
            <button
              onClick={() => onChangeLanguage('ar')}
              className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#192b52] flex items-center justify-between ${currentLanguage === 'ar' ? 'text-blue-400 font-semibold' : 'text-slate-200'}`}
            >
              <span>العربية (Arabic)</span>
              {currentLanguage === 'ar' && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
            </button>
          </div>
        </div>

        {/* Community & Discord */}
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#16274e] transition-colors"
          title="Community Discussion"
          onClick={() => alert('Community Forum: Connect with 100,000+ Voice Creators!')}
        >
          <MessageSquareQuote className="w-4 h-4" />
        </button>

        {/* Audio Support / Headphones */}
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#16274e] transition-colors"
          title="Audio Test & Help"
          onClick={() => alert('Audio Monitor: Low-latency Web Audio output is active.')}
        >
          <Headphones className="w-4 h-4" />
        </button>

        {/* My Team / Plan Badge */}
        <button
          onClick={onOpenUpgrade}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#132244] hover:bg-[#1a2d58] text-xs font-medium text-slate-100 border border-[#233a69] transition-all"
        >
          <span className="font-semibold">My Team</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1e3463] text-blue-300">
            Free
          </span>
        </button>

        {/* User Profile Avatar */}
        <div className="relative group">
          <button
            id="user-profile-btn"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm ring-2 ring-blue-400/40 hover:opacity-90 transition-opacity"
          >
            W
          </button>
        </div>
      </div>
    </header>
  );
};
