import React, { useState } from 'react';
import { 
  Search, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  Globe, 
  Sliders, 
  Heart,
  ExternalLink,
  Plus
} from 'lucide-react';
import { Voice, AudioSettings } from '../../types/studio';
import { speakWithBrowserTts } from '../../utils/audioSynthesis';

interface VoiceGalleryProps {
  onSelectVoiceForStudio: (voice: Voice) => void;
  onOpenVoiceDesign: () => void;
}

interface GalleryVoice {
  id: string;
  name: string;
  avatarLetter: string;
  gender: 'female' | 'male';
  age: string;
  pitch: string;
  accent: string;
  countryCode: string;
  category: string;
  sampleText: string;
  description: string;
}

const GALLERY_VOICES: GalleryVoice[] = [
  {
    id: 'librarian',
    name: 'The Librarian',
    avatarLetter: 'L',
    gender: 'female',
    age: 'middle-aged',
    pitch: 'low',
    accent: 'GB British',
    countryCode: 'GB',
    category: 'Narration',
    sampleText: 'Welcome to the archive. Every document tells a story of perseverance and discovery.',
    description: 'Measured, warm, and highly articulate cadence ideal for educational content.'
  },
  {
    id: 'documentarian',
    name: 'The Documentarian',
    avatarLetter: 'D',
    gender: 'male',
    age: 'middle-aged',
    pitch: 'low',
    accent: 'US American',
    countryCode: 'US',
    category: 'Informative',
    sampleText: 'Across the vast desert, Dubai rose into a global capital of artificial intelligence and innovation.',
    description: 'Authoritative, resonant broadcast voice with cinematic depth.'
  },
  {
    id: 'calm_guide',
    name: 'The Calm Guide',
    avatarLetter: 'C',
    gender: 'female',
    age: 'middle-aged',
    pitch: 'low',
    accent: 'Neutral',
    countryCode: 'GLOBAL',
    category: 'Conversational',
    sampleText: 'Take a gentle breath. Let us review your verification steps together with ease.',
    description: 'Empathetic, reassuring, and gentle voice tailored for difficult customer moments.'
  },
  {
    id: 'storyteller',
    name: 'The Storyteller',
    avatarLetter: 'S',
    gender: 'male',
    age: 'elderly',
    pitch: 'low',
    accent: 'GB British',
    countryCode: 'GB',
    category: 'Entertainment',
    sampleText: 'Long ago, before the towers pierced the clouds, navigators charted the Gulf by the stars.',
    description: 'Rich, textured vintage narration with expressive pacing.'
  },
  {
    id: 'amira_dubai',
    name: 'Amira Al-Dhaheri',
    avatarLetter: 'A',
    gender: 'female',
    age: 'young-adult',
    pitch: 'medium',
    accent: 'Gulf Arabic (Emirati)',
    countryCode: 'AE',
    category: 'Conversational',
    sampleText: 'مرحباً بك في بنك دبي الرقمي. لاحظنا حركة مشبوهة على بطاقتك ونود التأكد من سلامتك.',
    description: 'Native Emirati dialect voice trained for Banking Fraud Intervention & KYC.'
  },
  {
    id: 'tariq_gov',
    name: 'Tariq Al-Emadi',
    avatarLetter: 'T',
    gender: 'male',
    age: 'middle-aged',
    pitch: 'deep',
    accent: 'Modern Standard Arabic',
    countryCode: 'AE',
    category: 'Informative',
    sampleText: 'أهلاً بك في منصة دبي للخدمات الحكومية. تم تجديد رخصة الإقامة بنجاح.',
    description: 'Crisp, official institutional voice for Government Services orchestration.'
  },
  {
    id: 'aria_executive',
    name: 'Aria Executive',
    avatarLetter: 'E',
    gender: 'female',
    age: 'adult',
    pitch: 'high',
    accent: 'US American',
    countryCode: 'US',
    category: 'Advertisement',
    sampleText: 'Unlock zero-latency conversational agents with WinR Studio’s fully-local neural pipeline.',
    description: 'Polished commercial and product presentation voice.'
  },
  {
    id: 'marcus_support',
    name: 'Marcus Resolution',
    avatarLetter: 'M',
    gender: 'male',
    age: 'adult',
    pitch: 'medium',
    accent: 'AU Australian',
    countryCode: 'AU',
    category: 'Social',
    sampleText: 'G’day mate! Let’s get your claim sorted out in under three minutes.',
    description: 'Friendly, energetic conversational voice for community service.'
  }
];

const CATEGORIES = [
  'All',
  'Narration',
  'Conversational',
  'Characters',
  'Social',
  'Entertainment',
  'Advertisement',
  'Informative'
];

export const VoiceGallery: React.FC<VoiceGalleryProps> = ({
  onSelectVoiceForStudio,
  onOpenVoiceDesign
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const filteredVoices = GALLERY_VOICES.filter((voice) => {
    const matchCategory = selectedCategory === 'All' || voice.category === selectedCategory;
    const matchSearch = voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        voice.accent.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        voice.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleTogglePlay = (voice: GalleryVoice) => {
    if (playingVoiceId === voice.id) {
      window.speechSynthesis?.cancel();
      setPlayingVoiceId(null);
      return;
    }

    setPlayingVoiceId(voice.id);

    const voiceStub: Voice = {
      id: voice.id,
      name: voice.name,
      avatarColor: voice.gender === 'female' ? '#f43f5e' : '#38bdf8',
      gender: voice.gender,
      accent: voice.accent,
      category: voice.category,
      description: voice.description,
      sampleText: voice.sampleText
    };

    const settingsStub: AudioSettings = {
      volume: 0,
      speed: 1.0,
      loudnessNormalization: true,
      textNormalization: true,
      tagCompatibleMode: true,
      stability: 75,
      similarity: 85,
      pitchOffset: 0
    };

    speakWithBrowserTts(
      voice.sampleText,
      voiceStub,
      settingsStub,
      () => setPlayingVoiceId(voice.id),
      () => setPlayingVoiceId(null)
    );
  };

  return (
    <div className="space-y-6 pt-6 animate-in fade-in duration-300">
      {/* Search & Category Filter Bar (Matching Screenshot) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search voices..."
            className="w-full bg-[#12141d] border border-[#232738] rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-rose-500/70 transition-colors"
          />
        </div>

        {/* Category Pills (Matching Screenshot) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#151824]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Voice Cards Grid (Matching Screenshot Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredVoices.map((voice) => {
          const isPlaying = playingVoiceId === voice.id;
          return (
            <div
              key={voice.id}
              className={`rounded-2xl bg-[#0e1017] border p-4 transition-all duration-200 hover:border-slate-700 flex flex-col justify-between group ${
                isPlaying ? 'border-rose-500/60 shadow-lg shadow-rose-950/30' : 'border-[#1e2230]'
              }`}
            >
              <div>
                {/* Card Top: Acoustic Dial Circle & Name */}
                <div className="flex items-center gap-3">
                  {/* Avatar Circle with circular dashed ticks */}
                  <div className="relative w-12 h-12 rounded-full bg-[#161924] border border-[#2a2f42] flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-sm text-white">
                      {voice.avatarLetter}
                    </span>

                    {/* Play/Pause Button overlay */}
                    <button
                      onClick={() => handleTogglePlay(voice)}
                      className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 hover:bg-rose-600/80 transition-all opacity-80 group-hover:opacity-100"
                      title={isPlaying ? 'Pause sample' : 'Play voice sample'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Title & Metadata */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm text-white truncate group-hover:text-rose-300 transition-colors">
                      {voice.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      {voice.gender} • {voice.age} • {voice.pitch}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                        {voice.accent}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sample Prompt Preview */}
                <p className="mt-3 text-xs text-slate-400 italic line-clamp-2 leading-relaxed bg-[#12141e] p-2 rounded-lg border border-[#1e2333]">
                  "{voice.sampleText}"
                </p>
              </div>

              {/* Bottom: Soundwave Graphic & Select for Studio */}
              <div className="mt-4 pt-3 border-t border-[#1a1e2b] flex items-center justify-between">
                {/* Waveform graphic bars */}
                <div className="flex items-end gap-1 h-5 flex-1 pr-3">
                  {[20, 45, 80, 30, 90, 60, 100, 40, 75, 50, 85, 30, 65, 95, 40].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-t-full transition-all ${
                        isPlaying 
                          ? 'bg-rose-500 animate-pulse' 
                          : 'bg-slate-700/60'
                      }`}
                      style={{ 
                        height: isPlaying ? `${Math.max(20, (h * Math.random()) + 20)}%` : `${h}%` 
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    const voiceObj: Voice = {
                      id: voice.id,
                      name: voice.name,
                      avatarColor: voice.gender === 'female' ? '#f43f5e' : '#38bdf8',
                      gender: voice.gender,
                      accent: voice.accent,
                      category: voice.category,
                      description: voice.description,
                      sampleText: voice.sampleText
                    };
                    onSelectVoiceForStudio(voiceObj);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#181c28] hover:bg-rose-600/20 hover:text-rose-300 hover:border-rose-500/40 border border-slate-700 text-[11px] font-medium text-slate-300 transition-colors"
                >
                  Use in Studio
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner to create custom voice */}
      <div className="rounded-2xl bg-gradient-to-r from-[#12141e] via-[#1a141f] to-[#12141e] border border-[#2b2434] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-white text-sm">
            Need a bespoke voice for your Ignyte Hackathon Agent?
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Clone a voice from 1-second audio or design fine-grained pitch, timbre, and Emirati Arabic dialect parameters.
          </p>
        </div>

        <button
          onClick={onOpenVoiceDesign}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-950/40 shrink-0 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Open VoiceDesign Studio</span>
        </button>
      </div>
    </div>
  );
};
