import React, { useState } from 'react';
import { 
  Mic2, 
  Sparkles, 
  Sliders, 
  Volume2, 
  Play, 
  Pause, 
  Save, 
  Upload, 
  RefreshCw, 
  Check, 
  Activity,
  Layers
} from 'lucide-react';
import { Voice, AudioSettings } from '../../types/studio';
import { speakWithBrowserTts } from '../../utils/audioSynthesis';

interface VoiceDesignStudioProps {
  onSaveVoice: (voice: Voice) => void;
  onNavigateToCanvas: () => void;
}

export const VoiceDesignStudio: React.FC<VoiceDesignStudioProps> = ({
  onSaveVoice,
  onNavigateToCanvas
}) => {
  const [voiceName, setVoiceName] = useState('Emirati Banking Specialist');
  const [accent, setAccent] = useState('Gulf Arabic (Emirati)');
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [ageGroup, setAgeGroup] = useState('young-adult');
  const [timbre, setTimbre] = useState(70);
  const [warmth, setWarmth] = useState(85);
  const [speed, setSpeed] = useState(1.0);
  const [stability, setStability] = useState(80);
  const [testText, setTestText] = useState('مرحباً بك! أنا مساعدك الصوتي في بنك دبي الرقمي لمكافحة الاحتيال.');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioCloned, setAudioCloned] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTestPlayback = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const mockVoice: Voice = {
      id: `custom_${Date.now()}`,
      name: voiceName,
      avatarColor: gender === 'female' ? '#f43f5e' : '#38bdf8',
      gender,
      accent,
      category: 'Custom Design',
      description: `Custom neural voice with warmth: ${warmth}%, stability: ${stability}%`,
      sampleText: testText
    };

    const mockSettings: AudioSettings = {
      volume: 0,
      speed,
      loudnessNormalization: true,
      textNormalization: true,
      tagCompatibleMode: true,
      stability,
      similarity: 85,
      pitchOffset: (timbre - 50) / 10
    };

    speakWithBrowserTts(
      testText,
      mockVoice,
      mockSettings,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const handleSave = () => {
    const newVoice: Voice = {
      id: `voice_custom_${Date.now()}`,
      name: voiceName,
      avatarColor: gender === 'female' ? '#f43f5e' : '#38bdf8',
      gender,
      accent,
      category: 'Custom Designed',
      description: `${gender} ${ageGroup} tailored for ${accent}`,
      sampleText: testText,
      isCustom: true
    };

    onSaveVoice(newVoice);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const simulateRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setAudioCloned(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 pt-6 animate-in fade-in duration-300">
      <div className="rounded-2xl bg-gradient-to-r from-[#11131c] via-[#1a141f] to-[#11131c] border border-[#262b3d] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Fully-Local Neural Voice Design & 1-Second Cloner
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              WinR Studio VoiceDesign
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Fine-tune acoustic timbres, dialect intonations, and emotion dynamics tailored for your Ignyte Challenge voice persona.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-950/40 transition-all"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Saved to WinR Studio!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Custom Voice</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1: Voice Parameters */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-[#0f1118] border border-[#1e2333] p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-rose-400" />
              <span>Acoustic Persona Attributes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Voice Name
                </label>
                <input
                  type="text"
                  value={voiceName}
                  onChange={(e) => setVoiceName(e.target.value)}
                  className="w-full bg-[#161924] border border-[#282e44] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Dialect & Accent
                </label>
                <select
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="w-full bg-[#161924] border border-[#282e44] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-rose-500"
                >
                  <option value="Gulf Arabic (Emirati)">Gulf Arabic (Emirati / دبي)</option>
                  <option value="Modern Standard Arabic">Modern Standard Arabic (الفصحى)</option>
                  <option value="US American">US American (Neutral Professional)</option>
                  <option value="GB British">GB British (Authoritative)</option>
                  <option value="Global Multilingual">Global Multilingual Code-Switching</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Gender
                </label>
                <div className="flex gap-2">
                  {(['female', 'male'] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                        gender === g
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/60'
                          : 'bg-[#161924] text-slate-400 border-[#282e44]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Age Cadence
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full bg-[#161924] border border-[#282e44] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-rose-500"
                >
                  <option value="young-adult">Young Adult (Crisp & Rapid)</option>
                  <option value="middle-aged">Middle-Aged (Authoritative & Reassuring)</option>
                  <option value="senior">Senior (Warm & Measured)</option>
                </select>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2 border-t border-[#1e2333]">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Timbre & Pitch Offset</span>
                  <span className="text-rose-400 font-mono">{timbre}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={timbre}
                  onChange={(e) => setTimbre(Number(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Warmth & Emotional Resonance</span>
                  <span className="text-rose-400 font-mono">{warmth}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={warmth}
                  onChange={(e) => setWarmth(Number(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Speech Rate</span>
                  <span className="text-rose-400 font-mono">{speed.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.05"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Voice Cloning & Real-Time Test Rig */}
        <div className="space-y-6">
          {/* Quick Voice Cloner */}
          <div className="rounded-2xl bg-[#0f1118] border border-[#1e2333] p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mic2 className="w-4 h-4 text-rose-400" />
              <span>1-Second Voice Clone</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Record a 2-second audio sample of your voice or upload a WAV file to extract zero-shot voice latents.
            </p>

            <div className="p-4 rounded-xl bg-[#141724] border border-[#252b3e] text-center space-y-3">
              <button
                onClick={simulateRecord}
                disabled={isRecording}
                className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-rose-600 animate-pulse ring-4 ring-rose-500/40' 
                    : audioCloned
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#1e2333] hover:bg-rose-600/80 text-white'
                }`}
              >
                <Mic2 className="w-6 h-6" />
              </button>

              <span className="text-xs text-slate-300 font-medium block">
                {isRecording ? 'Listening & Extracting Latents...' : audioCloned ? 'Latents Captured (Ready)' : 'Click to Record Sample'}
              </span>
            </div>
          </div>

          {/* Test Dialogue */}
          <div className="rounded-2xl bg-[#0f1118] border border-[#1e2333] p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-rose-400" />
              <span>Instant Test Speech</span>
            </h3>

            <textarea
              rows={3}
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="w-full bg-[#161924] border border-[#282e44] rounded-xl p-3 text-xs text-slate-200 focus:outline-hidden focus:border-rose-500 resize-none font-sans"
            />

            <button
              onClick={handleTestPlayback}
              className="w-full py-2.5 rounded-xl bg-[#1a1e2c] hover:bg-rose-600 hover:text-white border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Playback</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Synthesize & Play Sample</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
