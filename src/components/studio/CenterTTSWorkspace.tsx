import React, { useState, useRef, useEffect } from 'react';
import { 
  Voice, 
  TTSModel, 
  AudioSettings, 
  SpeakerBlock, 
  PresetCategory, 
  GenerationHistoryItem 
} from '../../types/studio';
import { AUDIO_TAGS, PRESET_CATEGORIES } from '../../data/studioData';
import { 
  Plus, 
  Sparkles, 
  Wand2, 
  Play, 
  Pause, 
  Download, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Trash2, 
  Copy, 
  Check, 
  Loader2,
  ChevronDown,
  Layers,
  Music,
  Share2
} from 'lucide-react';

interface CenterTTSWorkspaceProps {
  voices: Voice[];
  selectedVoice: Voice;
  onSelectVoice: (voice: Voice) => void;
  selectedModel: TTSModel;
  settings: AudioSettings;
  onGenerate: (text: string, voice: Voice) => Promise<GenerationHistoryItem>;
  onOpenCreateVoice: () => void;
  lastGeneratedAudio: { url: string; duration: number; text: string; voiceName: string } | null;
}

export const CenterTTSWorkspace: React.FC<CenterTTSWorkspaceProps> = ({
  voices,
  selectedVoice,
  onSelectVoice,
  selectedModel,
  settings,
  onGenerate,
  onOpenCreateVoice,
  lastGeneratedAudio
}) => {
  // Support multi-speaker dialogues
  const [speakers, setSpeakers] = useState<SpeakerBlock[]>([
    { id: '1', voiceId: selectedVoice.id, text: '' }
  ]);
  const [activeSpeakerId, setActiveSpeakerId] = useState('1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  const maxChars = 500;
  const currentTotalChars = speakers.reduce((acc, s) => acc + s.text.length, 0);

  // Update primary speaker voice if parent selectedVoice changes
  useEffect(() => {
    setSpeakers(prev => prev.map((s, idx) => idx === 0 ? { ...s, voiceId: selectedVoice.id } : s));
  }, [selectedVoice.id]);

  // Handle audio element updates
  useEffect(() => {
    if (lastGeneratedAudio && lastGeneratedAudio.url) {
      if (audioRef.current) {
        audioRef.current.src = lastGeneratedAudio.url;
        audioRef.current.load();
        setAudioDuration(lastGeneratedAudio.duration);
        setCurrentTime(0);
        setIsPlaying(true);
        audioRef.current.play().catch(() => {});
      }
    }
  }, [lastGeneratedAudio]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleUpdateText = (id: string, text: string) => {
    if (text.length > maxChars) return;
    setSpeakers(prev => prev.map(s => s.id === id ? { ...s, text } : s));
  };

  const handleInsertTag = (tag: string, speakerId: string) => {
    const el = textareaRefs.current[speakerId];
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const currentText = speakers.find(s => s.id === speakerId)?.text || '';
    const newText = currentText.substring(0, start) + `${tag} ` + currentText.substring(end);

    if (newText.length <= maxChars) {
      handleUpdateText(speakerId, newText);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + tag.length + 1, start + tag.length + 1);
      }, 50);
    }
  };

  const handleAddSpeaker = () => {
    const availableVoice = voices.find(v => !speakers.some(s => s.voiceId === v.id)) || voices[1] || voices[0];
    const newId = String(Date.now());
    setSpeakers(prev => [
      ...prev,
      { id: newId, voiceId: availableVoice.id, text: '' }
    ]);
    setActiveSpeakerId(newId);
  };

  const handleRemoveSpeaker = (id: string) => {
    if (speakers.length <= 1) return;
    setSpeakers(prev => prev.filter(s => s.id !== id));
  };

  const handleSelectPreset = (preset: PresetCategory) => {
    setSpeakers([
      { id: '1', voiceId: preset.recommendedVoiceId, text: preset.sampleText }
    ]);
    const recVoice = voices.find(v => v.id === preset.recommendedVoiceId);
    if (recVoice) {
      onSelectVoice(recVoice);
    }
  };

  const handleAutoTagAll = () => {
    // Smart heuristic emotion tagging based on sentiment and punctuation
    setSpeakers(prev => prev.map(s => {
      let t = s.text;
      if (!t.trim()) {
        t = "Hello! [excited] I am thrilled to explore expressive audio tags with you today. [whispers] Listen closely to how natural this sounds! [laughs]";
        return { ...s, text: t };
      }

      // Add dynamic expressive tags if none exist
      if (!t.includes('[')) {
        t = t
          .replace(/(!+)/g, ' [excited]$1')
          .replace(/(\?+)/g, ' [curious]$1')
          .replace(/(\.{3,})/g, ' [sighs]...')
          .replace(/\b(haha|lol|funny|joke)\b/gi, '$1 [laughs]');
      }
      return { ...s, text: t.slice(0, maxChars) };
    }));
  };

  const handleGenerateClick = async () => {
    const combinedText = speakers.map(s => s.text.trim()).filter(Boolean).join(' ');
    if (!combinedText) {
      alert('Please enter or select sample text to generate speech.');
      return;
    }

    setIsGenerating(true);
    try {
      // Generate using current primary voice or multi-speaker synthesis
      const primaryVoice = voices.find(v => v.id === speakers[0].voiceId) || selectedVoice;
      await onGenerate(combinedText, primaryVoice);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Keyboard shortcut Ctrl + Enter / Cmd + Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleGenerateClick();
    }
  };

  const handleCopyText = () => {
    const fullText = speakers.map(s => s.text).join('\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f5f8fc] dark:bg-[#0a142e] overflow-y-auto px-6 py-5 select-none transition-colors">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
        className="hidden"
      />

      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col justify-between space-y-6">
        {/* Main Editor Section */}
        <div className="space-y-4">
          {/* Speaker Headers & Blocks Card */}
          <div className="space-y-4">
            {speakers.map((speaker, index) => {
              const speakerVoice = voices.find(v => v.id === speaker.voiceId) || selectedVoice;

              return (
                <div 
                  key={speaker.id} 
                  className="space-y-3 group p-4 rounded-2xl bg-white dark:bg-[#0e1c3e] border border-[#d8e5f3] dark:border-[#1d325e] shadow-xs transition-all"
                  onClick={() => setActiveSpeakerId(speaker.id)}
                >
                  {/* Speaker Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      {/* Active green indicator ring + Voice avatar */}
                      <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-[#f0f6fd] dark:bg-[#16274e] border border-[#d2e2f2] dark:border-[#233a69]">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-tr ${speakerVoice.avatarColor} text-white font-bold text-[9px] flex items-center justify-center shrink-0`}>
                          {speakerVoice.name[0]}
                        </div>
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                          {speakerVoice.name}
                        </span>
                      </div>

                      {speakers.length > 1 && (
                        <span className="text-[11px] font-mono text-slate-400">
                          Speaker {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {speakers.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSpeaker(speaker.id);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded-md hover:bg-[#f0f6fd] dark:hover:bg-[#16274e] transition-colors"
                          title="Remove speaker block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Textarea Input */}
                  <div className="relative">
                    <textarea
                      id={`speech-input-${speaker.id}`}
                      ref={(el) => {
                        textareaRefs.current[speaker.id] = el;
                      }}
                      rows={speakers.length > 1 ? 3 : 5}
                      value={speaker.text}
                      onChange={(e) => handleUpdateText(speaker.id, e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your text with audio tags like [laughs] to turn into expressive speech..."
                      className="w-full text-base sm:text-lg text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent border-none outline-none resize-none leading-relaxed font-normal p-0 focus:ring-0"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Audio Tags Selector Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Expressive Audio Tags</span>
              <span className="text-[10px] normal-case text-slate-400">Click to insert tag at cursor</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {AUDIO_TAGS.map((tagItem) => (
                <button
                  key={tagItem.tag}
                  id={`tag-btn-${tagItem.label.replace(/[^a-z0-9]/gi, '')}`}
                  onClick={() => handleInsertTag(tagItem.tag, activeSpeakerId)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-[#102044] hover:bg-[#ebf4fd] dark:hover:bg-[#182f60] text-slate-700 dark:text-slate-200 border border-[#d6e3f2] dark:border-[#22396b] flex items-center space-x-1.5 transition-all hover:scale-105 active:scale-95 shadow-2xs"
                  title={tagItem.desc}
                >
                  <span className="text-xs">{tagItem.icon}</span>
                  <span className="font-mono text-[11px] text-blue-700 dark:text-blue-300 font-semibold">{tagItem.tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* + Add Speaker Button */}
          <div className="pt-1">
            <button
              id="add-speaker-dialogue-btn"
              onClick={handleAddSpeaker}
              className="px-3.5 py-1.5 rounded-full border border-[#d0e0f2] dark:border-[#1d325e] hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-[#0e1c3e] text-slate-700 dark:text-slate-200 hover:bg-[#f0f6fd] dark:hover:bg-[#15274e] text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Add Speaker</span>
            </button>
          </div>
        </div>

        {/* Audio Waveform Player Bar (When speech generated) */}
        {lastGeneratedAudio && (
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1c3e] border border-[#cfe0f2] dark:border-[#1d325e] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Ready: {lastGeneratedAudio.voiceName} Voice Synthesis
                </span>
              </div>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {currentTime.toFixed(1)}s / {audioDuration.toFixed(1)}s
              </span>
            </div>

            {/* Custom Interactive Waveform Scrubbing Bar */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1 h-8 px-1">
                {Array.from({ length: 48 }).map((_, i) => {
                  const progress = (i / 48);
                  const isPlayed = progress <= (currentTime / (audioDuration || 1));
                  const heightPercent = 20 + Math.abs(Math.sin(i * 0.4) * 65) + ((i % 3) * 5);
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        const newTime = progress * audioDuration;
                        if (audioRef.current) {
                          audioRef.current.currentTime = newTime;
                          setCurrentTime(newTime);
                        }
                      }}
                      style={{ height: `${heightPercent}%` }}
                      className={`flex-1 rounded-full cursor-pointer transition-colors ${isPlayed ? 'bg-blue-600 dark:bg-blue-400' : 'bg-[#e2ecf7] dark:bg-[#1d3058] hover:bg-[#cbdcf0] dark:hover:bg-[#253e70]'}`}
                    />
                  );
                })}
              </div>

              <input
                type="range"
                min="0"
                max={audioDuration || 1}
                step="0.05"
                value={currentTime}
                onChange={handleSeek}
                className="w-full accent-blue-600 h-1 bg-[#e2ecf7] dark:bg-[#1d3058] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Controls Toolbar */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <button
                  id="play-pause-generated-audio"
                  onClick={togglePlayAudio}
                  className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-sm"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-0.5" />}
                </button>

                <a
                  href={lastGeneratedAudio.url}
                  download={`win-audio-speech-${Date.now()}.wav`}
                  className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white hover:bg-[#eef5fc] dark:hover:bg-[#182c55] text-xs font-medium flex items-center space-x-1.5 transition-colors"
                  title="Download .wav audio"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download WAV</span>
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyText}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-[#eef5fc] dark:hover:bg-[#182c55] transition-colors text-xs flex items-center space-x-1"
                  title="Copy Prompt Text"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-blue-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Section: Presets + Actions */}
        <div className="space-y-4 pt-4 border-t border-[#d8e5f3] dark:border-[#1d325e]">
          {/* Get Started With Preset Pills */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Get started with
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {PRESET_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  id={`preset-btn-${cat.id}`}
                  onClick={() => handleSelectPreset(cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-[#102044] hover:bg-[#eaf3fc] dark:hover:bg-[#172d5c] text-slate-700 dark:text-slate-200 border border-[#d6e3f2] dark:border-[#22396b] shadow-2xs transition-all hover:scale-105 active:scale-95"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row: Character Counter, Auto Tag All, Generate Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {/* Character Count */}
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className={currentTotalChars >= maxChars ? 'text-rose-500 font-bold' : ''}>
                {currentTotalChars}
              </span>
              <span> / {maxChars} characters</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              {/* Auto Tag All Button */}
              <button
                id="auto-tag-all-btn"
                onClick={handleAutoTagAll}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#d0e0f2] dark:border-[#1d325e] bg-white dark:bg-[#0e1c3e] hover:bg-[#f0f6fd] dark:hover:bg-[#15274e] text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 shadow-2xs transition-all"
                title="Automatically analyze and inject expressive voice tags"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Auto Tag All</span>
              </button>

              {/* Generate Speech Button */}
              <button
                id="generate-speech-btn"
                onClick={handleGenerateClick}
                disabled={isGenerating || currentTotalChars === 0}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs flex items-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-98"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Speech</span>
                    <span className="text-[10px] font-mono text-blue-200 font-normal">
                      Ctrl ↵
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
