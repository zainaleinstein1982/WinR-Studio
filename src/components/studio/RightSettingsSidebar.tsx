import React, { useState } from 'react';
import { 
  Voice, 
  TTSModel, 
  AudioSettings, 
  GenerationHistoryItem 
} from '../../types/studio';
import { 
  Sliders, 
  History as HistoryIcon, 
  Plus, 
  ChevronDown, 
  Play, 
  Pause, 
  Download, 
  Trash2, 
  Check, 
  RotateCcw,
  Sparkles,
  Volume2,
  Gauge,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface RightSettingsSidebarProps {
  activeTab: 'settings' | 'history';
  onTabChange: (tab: 'settings' | 'history') => void;
  voices: Voice[];
  selectedVoice: Voice;
  onSelectVoice: (voice: Voice) => void;
  models: TTSModel[];
  selectedModel: TTSModel;
  onSelectModel: (model: TTSModel) => void;
  settings: AudioSettings;
  onUpdateSettings: (settings: Partial<AudioSettings>) => void;
  history: GenerationHistoryItem[];
  onPlayHistory: (item: GenerationHistoryItem) => void;
  onDeleteHistory: (id: string) => void;
  onLoadHistoryToEditor: (item: GenerationHistoryItem) => void;
  onOpenCreateVoice: () => void;
  playingHistoryId: string | null;
}

export const RightSettingsSidebar: React.FC<RightSettingsSidebarProps> = ({
  activeTab,
  onTabChange,
  voices,
  selectedVoice,
  onSelectVoice,
  models,
  selectedModel,
  onSelectModel,
  settings,
  onUpdateSettings,
  history,
  onPlayHistory,
  onDeleteHistory,
  onLoadHistoryToEditor,
  onOpenCreateVoice,
  playingHistoryId
}) => {
  const [isVoiceDropdownOpen, setIsVoiceDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <aside className="w-80 shrink-0 border-l border-[#dbe6f2] dark:border-[#1a2d58] bg-[#fbfdff] dark:bg-[#0c1836] flex flex-col py-4 px-4 select-none overflow-y-auto transition-colors">
      {/* Top Segmented Tab Pill: Settings | History */}
      <div className="bg-[#edf4fc] dark:bg-[#14244a] p-1 rounded-full flex items-center mb-6 border border-[#d6e3f2] dark:border-[#1e3463]">
        <button
          id="tab-settings-btn"
          onClick={() => onTabChange('settings')}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${activeTab === 'settings' ? 'bg-white dark:bg-[#0b1632] text-blue-900 dark:text-blue-100 shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'}`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
        <button
          id="tab-history-btn"
          onClick={() => onTabChange('history')}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${activeTab === 'history' ? 'bg-white dark:bg-[#0b1632] text-blue-900 dark:text-blue-100 shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'}`}
        >
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>History</span>
          {history.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-[10px] flex items-center justify-center font-bold">
              {history.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB CONTENT: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* 1. Voice Selector Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
              Voice
            </label>

            <div className="relative">
              <button
                id="voice-selector-dropdown-btn"
                onClick={() => setIsVoiceDropdownOpen(!isVoiceDropdownOpen)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#d6e3f0] dark:border-[#1e3463] bg-white dark:bg-[#102046] hover:bg-[#f0f6fd] dark:hover:bg-[#162c5e] text-left transition-all shadow-2xs"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${selectedVoice.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0`}>
                    {selectedVoice.name[0]}
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                      {selectedVoice.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {selectedVoice.accent}
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isVoiceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Voice Dropdown Menu */}
              {isVoiceDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#0e1c3e] border border-[#d2e2f2] dark:border-[#233a69] rounded-xl shadow-xl p-1.5 z-40 max-h-64 overflow-y-auto space-y-1">
                  {voices.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        onSelectVoice(v);
                        setIsVoiceDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium hover:bg-[#edf5fd] dark:hover:bg-[#192b52] transition-colors ${selectedVoice.id === v.id ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold' : 'text-slate-800 dark:text-slate-200'}`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${v.avatarColor} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                          {v.name[0]}
                        </div>
                        <div className="truncate">
                          <p className="font-semibold truncate">{v.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{v.accent}</p>
                        </div>
                      </div>
                      {selectedVoice.id === v.id && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* + Add another voice button */}
            <button
              id="add-another-voice-btn"
              onClick={onOpenCreateVoice}
              className="w-full py-2 px-3 rounded-lg border border-dashed border-[#cbdcf0] dark:border-[#233a69] hover:border-blue-400 dark:hover:border-blue-400 bg-white/60 dark:bg-[#0e1c3e]/40 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add another voice</span>
            </button>
          </div>

          {/* 2. Model Selector Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
              Model
            </label>

            <div className="relative">
              <button
                id="model-selector-dropdown-btn"
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#d6e3f0] dark:border-[#1e3463] bg-white dark:bg-[#102046] hover:bg-[#f0f6fd] dark:hover:bg-[#162c5e] text-left transition-all shadow-2xs"
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                    {selectedModel.name}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#e8f2fc] dark:bg-[#1c305c] text-blue-800 dark:text-blue-300 shrink-0">
                    {selectedModel.tag}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isModelDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Model Dropdown Menu */}
              {isModelDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#0e1c3e] border border-[#d2e2f2] dark:border-[#233a69] rounded-xl shadow-xl p-1.5 z-40 space-y-1">
                  {models.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        onSelectModel(m);
                        setIsModelDropdownOpen(false);
                      }}
                      className={`w-full flex items-start justify-between p-2.5 rounded-lg text-left text-xs hover:bg-[#edf5fd] dark:hover:bg-[#192b52] transition-colors ${selectedModel.id === m.id ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold' : 'text-slate-800 dark:text-slate-200'}`}
                    >
                      <div className="space-y-0.5 pr-2">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-semibold">{m.name}</span>
                          <span className="text-[9px] font-bold px-1 rounded bg-[#e8f2fc] dark:bg-[#1c305c] text-blue-800 dark:text-blue-300">
                            {m.tag}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{m.description}</p>
                      </div>
                      {selectedModel.id === m.id && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Audio Controls Section */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                Audio Controls
              </label>
              <button
                onClick={() => onUpdateSettings({ volume: 0, speed: 1.0, loudnessNormalization: true, textNormalization: true, tagCompatibleMode: true, pitchOffset: 0 })}
                className="text-[10px] text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center space-x-1"
                title="Reset to defaults"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Volume Control */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300 font-medium">Volume</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 bg-[#edf4fc] dark:bg-[#152549] px-2 py-0.5 rounded text-[11px]">
                  {settings.volume > 0 ? `+${settings.volume}` : settings.volume}
                </span>
              </div>
              <input
                id="volume-slider"
                type="range"
                min="-10"
                max="10"
                step="1"
                value={settings.volume}
                onChange={(e) => onUpdateSettings({ volume: Number(e.target.value) })}
                className="w-full accent-blue-600 h-1.5 bg-[#dbe8f5] dark:bg-[#1d3058] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Speed Control */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300 font-medium">Speed</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 bg-[#edf4fc] dark:bg-[#152549] px-2 py-0.5 rounded text-[11px]">
                  {settings.speed}x
                </span>
              </div>
              <input
                id="speed-slider"
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={settings.speed}
                onChange={(e) => onUpdateSettings({ speed: Number(e.target.value) })}
                className="w-full accent-blue-600 h-1.5 bg-[#dbe8f5] dark:bg-[#1d3058] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                {[0.75, 1.0, 1.25, 1.5].map((val) => (
                  <button
                    key={val}
                    onClick={() => onUpdateSettings({ speed: val })}
                    className={`hover:text-blue-600 dark:hover:text-blue-300 ${settings.speed === val ? 'font-bold text-blue-700 dark:text-blue-300' : ''}`}
                  >
                    {val}x
                  </button>
                ))}
              </div>
            </div>

            {/* Loudness Normalization Toggle */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Loudness Normalization
              </span>
              <button
                id="toggle-loudness-norm-btn"
                onClick={() => onUpdateSettings({ loudnessNormalization: !settings.loudnessNormalization })}
                className={`flex items-center p-0.5 rounded-full text-[10px] font-bold transition-colors ${settings.loudnessNormalization ? 'bg-blue-600 text-white pl-3 pr-2' : 'bg-[#dbe8f5] dark:bg-[#1d3058] text-slate-600 dark:text-slate-400 pl-2 pr-3'}`}
              >
                <span>{settings.loudnessNormalization ? 'On' : 'Off'}</span>
              </button>
            </div>

            {/* Text Normalization Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Text Normalization
              </span>
              <button
                id="toggle-text-norm-btn"
                onClick={() => onUpdateSettings({ textNormalization: !settings.textNormalization })}
                className={`flex items-center p-0.5 rounded-full text-[10px] font-bold transition-colors ${settings.textNormalization ? 'bg-blue-600 text-white pl-3 pr-2' : 'bg-[#dbe8f5] dark:bg-[#1d3058] text-slate-600 dark:text-slate-400 pl-2 pr-3'}`}
              >
                <span>{settings.textNormalization ? 'On' : 'Off'}</span>
              </button>
            </div>

            {/* Tag Compatible Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  Tag Compatible Mode
                </span>
              </div>
              <button
                id="toggle-tag-compatible-btn"
                onClick={() => onUpdateSettings({ tagCompatibleMode: !settings.tagCompatibleMode })}
                className={`flex items-center p-0.5 rounded-full text-[10px] font-bold transition-colors ${settings.tagCompatibleMode ? 'bg-blue-600 text-white pl-3 pr-2' : 'bg-[#dbe8f5] dark:bg-[#1d3058] text-slate-600 dark:text-slate-400 pl-2 pr-3'}`}
              >
                <span>{settings.tagCompatibleMode ? 'On' : 'Off'}</span>
              </button>
            </div>

            {/* Advanced Vocal Pitch & Stability */}
            <div className="pt-2 border-t border-[#dce7f3] dark:border-[#1e3463]">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 py-1"
              >
                <span>Voice Fine-Tuning</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>

              {showAdvanced && (
                <div className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-500">
                      <span>Pitch Offset</span>
                      <span className="font-mono">{settings.pitchOffset}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={settings.pitchOffset}
                      onChange={(e) => onUpdateSettings({ pitchOffset: Number(e.target.value) })}
                      className="w-full accent-blue-600 h-1 bg-[#dbe8f5] dark:bg-[#1d3058] rounded appearance-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-500">
                      <span>Stability</span>
                      <span className="font-mono">{settings.stability}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={settings.stability}
                      onChange={(e) => onUpdateSettings({ stability: Number(e.target.value) })}
                      className="w-full accent-blue-600 h-1 bg-[#dbe8f5] dark:bg-[#1d3058] rounded appearance-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: HISTORY */}
      {activeTab === 'history' && (
        <div className="flex-1 flex flex-col space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
            <span>Recent Generations</span>
            <span>{history.length} items</span>
          </div>

          {history.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
              <HistoryIcon className="w-8 h-8 opacity-40 text-blue-500" />
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">No speech generated yet.</p>
              <p className="text-[11px] text-slate-400">
                Type text and hit Generate Speech to see your audio history here.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-[#d6e3f2] dark:border-[#1e3463] bg-white dark:bg-[#102046] hover:bg-[#f0f6fd] dark:hover:bg-[#152a5a] transition-all space-y-2 group shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${item.voiceAvatarColor} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                        {item.voiceName[0]}
                      </div>
                      <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                        {item.voiceName}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.durationSeconds.toFixed(1)}s
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    "{item.text}"
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-[#e2ecf7] dark:border-[#1d3058]">
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => onPlayHistory(item)}
                        className="p-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-transform shadow-2xs"
                        title={playingHistoryId === item.id ? 'Pause' : 'Play'}
                      >
                        {playingHistoryId === item.id ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3 translate-x-0.5" />
                        )}
                      </button>

                      {item.audioUrl && (
                        <a
                          href={item.audioUrl}
                          download={`win-audio-${item.voiceName.toLowerCase()}-${item.id.slice(0, 5)}.wav`}
                          className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-[#e4effc] dark:hover:bg-[#1a2d56] transition-colors"
                          title="Download .wav audio"
                        >
                          <Download className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onLoadHistoryToEditor(item)}
                        className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline px-1 py-0.5 font-medium"
                      >
                        Load Text
                      </button>
                      <button
                        onClick={() => onDeleteHistory(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Delete recording"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
