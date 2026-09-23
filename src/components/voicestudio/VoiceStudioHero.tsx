import React, { useState } from 'react';
import { 
  Terminal, 
  Box, 
  Copy, 
  Check, 
  Layers, 
  Sparkles,
  Command,
  Monitor
} from 'lucide-react';

interface VoiceStudioHeroProps {
  onExploreChallenge: () => void;
}

export const VoiceStudioHero: React.FC<VoiceStudioHeroProps> = ({
  onExploreChallenge
}) => {
  const [selectedOS, setSelectedOS] = useState<'macOS' | 'Linux' | 'WSL' | 'Windows'>('Windows');
  const [copied, setCopied] = useState(false);

  const installCommands: Record<'macOS' | 'Linux' | 'WSL' | 'Windows', string> = {
    Windows: 'irm https://winrstudio.sh/install | iex',
    macOS: 'curl -fsSL https://winrstudio.sh/install.sh | bash',
    Linux: 'curl -fsSL https://winrstudio.sh/install.sh | bash',
    WSL: 'wsl --install -d Ubuntu && curl -fsSL https://winrstudio.sh/install.sh | bash'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommands[selectedOS]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full overflow-hidden pt-10 pb-8 bg-[#09090b] border-b border-[#1b1e28]">
      {/* Background Animated Audio Spectrum Waveforms (Matching Screenshot) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none flex items-center justify-end pr-8 overflow-hidden">
        <div className="flex items-end gap-1.5 h-64">
          {[40, 65, 30, 85, 120, 190, 140, 220, 160, 240, 210, 180, 260, 220, 150, 190, 110, 80, 50, 95, 130, 75, 45, 30].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-t-full bg-gradient-to-t from-rose-900/10 via-rose-600/60 to-rose-400"
              style={{ 
                height: `${h}px`,
                animation: `pulse ${(i % 3) + 2}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl space-y-4">
          {/* Main Title */}
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-rose-400 uppercase">
              Open Source AI Voice Platform
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              WinR Studio
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            <strong className="text-white font-semibold">fully-local</strong> voice cloning, voice design, video dubbing, dictation, transcription & audiobook creation in <strong className="text-white font-semibold">646 languages</strong>
          </p>

          {/* OS Platform Icons Row (Matching Screenshot) */}
          <div className="pt-2 flex items-center gap-3">
            <button className="w-8 h-8 rounded-lg bg-[#181a24] border border-[#272b3b] flex items-center justify-center text-slate-300 hover:text-white">
              <span className="font-mono text-xs font-bold">&gt;_</span>
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#181a24] border border-[#272b3b] flex items-center justify-center text-slate-300 hover:text-white">
              <Box className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#181a24] border border-[#272b3b] flex items-center justify-center text-slate-300 hover:text-white">
              <Command className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#181a24] border border-[#272b3b] flex items-center justify-center text-slate-300 hover:text-white">
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          {/* OS Selector Pills (Matching Screenshot) */}
          <div className="flex items-center gap-2 pt-1">
            {(['macOS', 'Linux', 'WSL', 'Windows'] as const).map((os) => {
              const isSelected = selectedOS === os;
              return (
                <button
                  key={os}
                  onClick={() => setSelectedOS(os)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#1a131b] text-white border border-rose-500/80 shadow-xs shadow-rose-950 ring-1 ring-rose-500/30'
                      : 'bg-[#151722] text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {os}
                </button>
              );
            })}
          </div>

          {/* Terminal Command Box with Copy Button (Matching Screenshot) */}
          <div className="pt-2 max-w-xl">
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0f1118] border border-[#232738] shadow-inner">
              <div className="flex items-center gap-2 font-mono text-xs text-rose-300 truncate">
                <span className="text-slate-500 select-none">$</span>
                <span className="text-slate-200 font-medium">{installCommands[selectedOS]}</span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1a1d29] hover:bg-[#252a3a] border border-[#31374a] text-xs font-semibold text-slate-200 transition-colors shrink-0 ml-3"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
