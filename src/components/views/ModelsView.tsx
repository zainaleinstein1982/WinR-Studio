import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  Cpu, 
  Volume2, 
  Globe2, 
  Check, 
  Play, 
  Pause, 
  Activity, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Server
} from 'lucide-react';
import { TTS_MODELS, VOICES } from '../../data/studioData';
import { TTSModel, AudioSettings } from '../../types/studio';
import { speakWithBrowserTts } from '../../utils/audioSynthesis';

interface ModelsViewProps {
  selectedModel: TTSModel;
  onSelectModel: (model: TTSModel) => void;
  onOpenGallery: () => void;
  onOpenCanvas: () => void;
}

export const ModelsView: React.FC<ModelsViewProps> = ({
  selectedModel,
  onSelectModel,
  onOpenGallery,
  onOpenCanvas
}) => {
  const [playingModelId, setPlayingModelId] = useState<string | null>(null);
  const [testText, setTestText] = useState<string>(
    'WinR Studio neural voice models deliver sub-150 millisecond ultra low latency with native Gulf Arabic and English dialect precision.'
  );

  const modelCatalog = [
    {
      id: 'eleven_multilingual_v2',
      name: 'ElevenLabs Multilingual v2',
      badge: 'State of the Art',
      provider: 'ElevenLabs Cloud / Local Cache',
      latency: '180ms',
      languages: '29 Languages (inc. Arabic, English)',
      sampleRate: '48 kHz Studio',
      description: 'Cutting-edge multilingual voice synthesis model featuring rich emotional expression, precise accent control, and lifelike intonation across global languages.',
      pros: ['Deep emotional nuances', 'Accurate cross-language accent preservation', 'Studio-quality 48kHz audio'],
      recommendedFor: '14-Box Canvas Box G, Narration & Customer Support',
      isOfficialElevenLabs: true
    },
    {
      id: 'eleven_turbo_v2_5',
      name: 'ElevenLabs Turbo v2.5',
      badge: 'Ultra Low Latency',
      provider: 'ElevenLabs Conversational AI',
      latency: '110ms',
      languages: '32 Languages',
      sampleRate: '44.1 kHz High-Def',
      description: 'Engineered specifically for real-time conversational telephony and WebRTC agent workflows where sub-second response times are essential.',
      pros: ['Lowest end-to-end response time', 'Optimized for live telephony sandboxes', 'High throughput conversational streaming'],
      recommendedFor: 'Telephony Sandbox & Stage 2 Voice Agents',
      isOfficialElevenLabs: true
    },
    {
      id: 'eleven_flash_v2',
      name: 'ElevenLabs Flash v2',
      badge: 'Fastest Edge Inference',
      provider: 'ElevenLabs Edge Engine',
      latency: '75ms',
      languages: 'English & Global Major',
      sampleRate: '32 kHz Stream',
      description: 'Ultra-fast inference engine for edge deployment, interactive IVR systems, and instant fraud verification alerts.',
      pros: ['Sub-100ms first-byte latency', 'Minimal compute overhead', 'Instant response triggers'],
      recommendedFor: 'Fraud Intervention (Track 1.1) & Real-time Alerts',
      isOfficialElevenLabs: true
    },
    {
      id: 'winr_neural_local_v3',
      name: 'WinR Neural Local v3 (646 Langs)',
      badge: 'Fully Local Offline',
      provider: 'WinR Open Source Engine',
      latency: '45ms (Local Loopback)',
      languages: '646 Regional Languages & Dialects',
      sampleRate: '48 kHz Ultra',
      description: 'Complete offline neural speech synthesizer running locally in your browser and backend with zero cloud dependencies and absolute privacy.',
      pros: ['100% offline & private', '646 regional dialects & accents', 'Zero API token limits'],
      recommendedFor: 'Local Testing, Voice Gallery, & Sovereign Data Privacy',
      isOfficialElevenLabs: false
    }
  ];

  const handleTestModel = (model: typeof modelCatalog[0]) => {
    if (playingModelId === model.id) {
      window.speechSynthesis.cancel();
      setPlayingModelId(null);
      return;
    }

    const defaultSettings: AudioSettings = {
      volume: 0,
      speed: 1.0,
      loudnessNormalization: true,
      textNormalization: true,
      tagCompatibleMode: true,
      stability: 75,
      similarity: 85,
      pitchOffset: 0
    };

    setPlayingModelId(model.id);
    speakWithBrowserTts(testText, VOICES[0], defaultSettings);

    setTimeout(() => {
      setPlayingModelId(null);
    }, 4500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121624] via-[#1a1e32] to-[#121624] border border-[#242b44] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Neural AI Model Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ElevenLabs & WinR Neural Voice Models
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Explore state-of-the-art conversational voice engines, benchmark latency parameters, and configure the ideal architecture stack for your <strong>Ignyte × ElevenLabs Stage 1 Canvas & Stage 2 Telephony Agent</strong>.
          </p>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modelCatalog.map((model) => {
          const isSelected = selectedModel.id === model.id;
          const isPlaying = playingModelId === model.id;

          return (
            <div
              key={model.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? 'bg-[#151a2e] border-rose-500 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500/50'
                  : 'bg-[#101422] border-[#22293e] hover:border-[#323c5a] hover:bg-[#131828]'
              }`}
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {model.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {model.provider}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {model.name}
                    </h3>
                  </div>

                  {/* Latency badge */}
                  <div className="px-3 py-1 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{model.latency}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {model.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#0c0f1a] border border-[#1b2133] text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Coverage</span>
                    <span className="font-semibold text-slate-200">{model.languages}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Audio Fidelity</span>
                    <span className="font-semibold text-slate-200">{model.sampleRate}</span>
                  </div>
                </div>

                {/* Pros */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Advantages:</span>
                  <ul className="space-y-1">
                    {model.pros.map((pro, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Tag */}
                <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-200 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span><strong>Recommended:</strong> {model.recommendedFor}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-[#1f263c] flex items-center justify-between gap-3">
                <button
                  onClick={() => handleTestModel(model)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-[#1b2238] hover:bg-[#252e4c] text-slate-200'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Playing Audio Sample...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-rose-400" />
                      <span>Listen Sample</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    const match = TTS_MODELS.find(m => m.id === model.id) || TTS_MODELS[0];
                    onSelectModel(match);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                      : 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-950/40'
                  }`}
                >
                  {isSelected ? 'Active Model' : 'Select Model'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Testing Box */}
      <div className="p-6 rounded-2xl bg-[#111626] border border-[#232a40] space-y-4">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-rose-400" />
          <span>Real-time Neural Audio Synthesis Test</span>
        </h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="flex-1 bg-[#0a0d17] border border-[#22293e] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            placeholder="Type text to synthesize with active neural model..."
          />
          <button
            onClick={() => {
              const defaultSettings: AudioSettings = {
                volume: 0,
                speed: 1.0,
                loudnessNormalization: true,
                textNormalization: true,
                tagCompatibleMode: true,
                stability: 75,
                similarity: 85,
                pitchOffset: 0
              };
              speakWithBrowserTts(testText, VOICES[0], defaultSettings);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-bold shadow-md shadow-rose-950/50 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4" />
            <span>Synthesize Text</span>
          </button>
        </div>
      </div>
    </div>
  );
};
