import React, { useState } from 'react';
import { 
  Home, 
  Mic2, 
  Compass, 
  FolderHeart, 
  Video, 
  BookOpen, 
  Volume2, 
  Plus, 
  Wand2, 
  Music, 
  Split, 
  Code2, 
  ChevronDown, 
  Sparkles,
  Layers
} from 'lucide-react';

interface LeftSidebarProps {
  activeProduct: string;
  onSelectProduct: (product: string) => void;
  onOpenCreateVoice: () => void;
  onOpenUpgrade: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeProduct,
  onSelectProduct,
  onOpenCreateVoice,
  onOpenUpgrade
}) => {
  const [workspace, setWorkspace] = useState('Creative');
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  return (
    <aside className="w-60 shrink-0 border-r border-[#dbe6f2] dark:border-[#1a2d58] bg-[#fbfdff] dark:bg-[#0c1836] flex flex-col justify-between py-4 px-3 select-none transition-colors">
      <div className="space-y-6">
        {/* Workspace Dropdown */}
        <div className="relative">
          <button
            id="workspace-dropdown-btn"
            onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-[#d6e3f0] dark:border-[#1e3463] bg-white dark:bg-[#102046] hover:bg-[#f0f6fc] dark:hover:bg-[#162c5e] text-slate-900 dark:text-slate-100 transition-all font-medium text-sm shadow-2xs"
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-100">{workspace}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isWorkspaceMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isWorkspaceMenuOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#0e1c3e] border border-[#d2e2f2] dark:border-[#233a69] rounded-xl shadow-xl py-1.5 z-40">
              {['Creative', 'Studio Pro', 'Personal Voice Lab', 'Enterprise Hub'].map((ws) => (
                <button
                  key={ws}
                  onClick={() => {
                    setWorkspace(ws);
                    setIsWorkspaceMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#edf5fd] dark:hover:bg-[#192b52] flex items-center justify-between ${workspace === ws ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/70 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'}`}
                >
                  <span>{ws}</span>
                  {workspace === ws && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Primary Navigation Links */}
        <nav className="space-y-1">
          <button
            onClick={() => onSelectProduct('home')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeProduct === 'home' ? 'bg-[#e8f2fc] dark:bg-[#16274e] text-blue-900 dark:text-blue-200 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Home className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Home</span>
          </button>

          <div className="flex items-center justify-between group">
            <button
              onClick={() => onSelectProduct('my-voices')}
              className={`flex-1 flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeProduct === 'my-voices' ? 'bg-[#e8f2fc] dark:bg-[#16274e] text-blue-900 dark:text-blue-200 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Mic2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>My Voices</span>
            </button>
            <button
              id="quick-add-voice-btn"
              onClick={onOpenCreateVoice}
              title="Create new voice"
              className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-[#e4effc] dark:hover:bg-[#182a52] transition-colors mr-1"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => onSelectProduct('discovery')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeProduct === 'discovery' ? 'bg-[#e8f2fc] dark:bg-[#16274e] text-blue-900 dark:text-blue-200 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Compass className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Discovery</span>
          </button>

          <button
            onClick={() => onSelectProduct('assets')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeProduct === 'assets' ? 'bg-[#e8f2fc] dark:bg-[#16274e] text-blue-900 dark:text-blue-200 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white'}`}
          >
            <FolderHeart className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Asset Library</span>
          </button>
        </nav>

        {/* Products Section */}
        <div className="pt-2">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
            Products
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => onSelectProduct('video')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeProduct === 'video' ? 'bg-[#e8f2fc] dark:bg-[#16274e] text-blue-900 dark:text-blue-200' : 'text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white'}`}
            >
              <div className="flex items-center space-x-3">
                <Video className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Image & Video</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
                New
              </span>
            </button>

            <button
              onClick={() => onSelectProduct('story')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeProduct === 'story' ? 'bg-[#e8f2fc] dark:bg-[#16274e] text-blue-900 dark:text-blue-200' : 'text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white'}`}
            >
              <BookOpen className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Story Studio</span>
            </button>

            {/* Active Highlighted Text to Speech */}
            <button
              onClick={() => onSelectProduct('tts')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${activeProduct === 'tts' ? 'bg-[#e3effc] dark:bg-[#162b55] text-blue-900 dark:text-blue-100 shadow-2xs ring-1 ring-blue-300/70 dark:ring-blue-500/30' : 'text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Text To Speech</span>
            </button>

            <button
              onClick={onOpenCreateVoice}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white`}
            >
              <Wand2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Create Voice</span>
            </button>

            <button
              onClick={() => onSelectProduct('sfx')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeProduct === 'sfx' ? 'bg-[#e8f2fc] dark:bg-[#16274e] text-blue-900 dark:text-blue-200' : 'text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Music className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Sound Effects</span>
            </button>

            <button
              onClick={() => onSelectProduct('separation')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeProduct === 'separation' ? 'bg-[#e8f2fc] dark:bg-[#16274e] text-blue-900 dark:text-blue-200' : 'text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Split className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Audio Separation</span>
            </button>

            <button
              onClick={() => onSelectProduct('dev')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeProduct === 'dev' ? 'bg-[#e8f2fc] dark:bg-[#16274e] text-blue-900 dark:text-blue-200' : 'text-slate-600 dark:text-slate-300 hover:bg-[#f0f6fc] dark:hover:bg-[#132349] hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Code2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Developer</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Upgrade Call to Action */}
      <div className="pt-4">
        <button
          id="upgrade-now-btn"
          onClick={onOpenUpgrade}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-100 via-sky-100 to-amber-200 dark:from-amber-950/60 dark:via-blue-950/40 dark:to-amber-900/40 border border-amber-300/70 dark:border-amber-700/40 hover:border-amber-400 text-amber-950 dark:text-amber-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-2xs transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>UPGRADE NOW</span>
        </button>
      </div>
    </aside>
  );
};
