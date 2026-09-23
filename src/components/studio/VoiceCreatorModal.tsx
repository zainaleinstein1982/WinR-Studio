import React, { useState } from 'react';
import { X, Mic, Upload, Sparkles, Check } from 'lucide-react';
import { Voice } from '../../types/studio';

interface VoiceCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVoice: (voice: Voice) => void;
}

export const VoiceCreatorModal: React.FC<VoiceCreatorModalProps> = ({
  isOpen,
  onClose,
  onAddVoice
}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | 'neutral'>('female');
  const [accent, setAccent] = useState('American (Warm)');
  const [category, setCategory] = useState('Conversational');
  const [description, setDescription] = useState('');
  const [sampleText, setSampleText] = useState('Hello! This is my newly cloned custom AI voice with high emotional dynamic range.');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUploaded, setAudioUploaded] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a voice name.');
      return;
    }

    const newVoice: Voice = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      avatarColor: gender === 'female' ? 'from-pink-400 to-rose-600' : 'from-cyan-500 to-blue-600',
      gender,
      accent,
      category,
      description: description || 'Custom cloned voice model with expressive audio tag sensitivity.',
      sampleText,
      isCustom: true
    };

    onAddVoice(newVoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1530]/70 backdrop-blur-xs select-none animate-in fade-in duration-150">
      <div className="bg-[#fbfdff] dark:bg-[#0c1836] border border-[#d6e3f0] dark:border-[#1e3463] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#e2ecf7] dark:border-[#1d3058] flex items-center justify-between bg-white/60 dark:bg-[#0a1530]/40">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Create & Clone Voice</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Design an expressive custom voice profile for Win Audio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-[#edf4fc] dark:hover:bg-[#192b52]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs overflow-y-auto max-h-[70vh]">
          {/* Voice Name */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Voice Name</label>
            <input
              type="text"
              placeholder="e.g. Seline, Mark, or Custom Narrator"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#edf4fc] dark:bg-[#14244a] border border-[#d6e3f0] dark:border-[#1e3463] text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            />
          </div>

          {/* Gender & Accent */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'female' | 'male' | 'neutral')}
                className="w-full px-3 py-2 rounded-xl bg-[#edf4fc] dark:bg-[#14244a] border border-[#d6e3f0] dark:border-[#1e3463] text-slate-900 dark:text-slate-100 outline-none text-xs"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Accent / Dialect</label>
              <input
                type="text"
                placeholder="e.g. British RP, Gulf Arabic, US Warm"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#edf4fc] dark:bg-[#14244a] border border-[#d6e3f0] dark:border-[#1e3463] text-slate-900 dark:text-slate-100 outline-none text-xs"
              />
            </div>
          </div>

          {/* Audio Reference Sample (Upload or Record) */}
          <div className="space-y-1.5 pt-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Voice Reference (Instant Clone)</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsRecording(!isRecording);
                  if (!isRecording) {
                    setTimeout(() => {
                      setIsRecording(false);
                      setAudioUploaded(true);
                    }, 2500);
                  }
                }}
                className={`p-3 rounded-xl border border-dashed flex flex-col items-center justify-center space-y-1 transition-all ${isRecording ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600' : audioUploaded ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300' : 'border-[#cbdcf0] dark:border-[#233a69] hover:bg-[#edf4fc] dark:hover:bg-[#14244a] text-slate-600 dark:text-slate-400'}`}
              >
                <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
                <span className="font-semibold">{isRecording ? 'Listening (2.5s)...' : audioUploaded ? 'Sample Captured ✓' : 'Record Mic Sample'}</span>
              </button>

              <label className="p-3 rounded-xl border border-dashed border-[#cbdcf0] dark:border-[#233a69] hover:bg-[#edf4fc] dark:hover:bg-[#14244a] text-slate-600 dark:text-slate-400 flex flex-col items-center justify-center space-y-1 cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <span className="font-semibold">Upload Audio File</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={() => setAudioUploaded(true)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Voice Persona Description</label>
            <textarea
              rows={2}
              placeholder="e.g. Crisp, energetic, and expressive for podcast intros."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#edf4fc] dark:bg-[#14244a] border border-[#d6e3f0] dark:border-[#1e3463] text-slate-900 dark:text-slate-100 outline-none text-xs resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#e2ecf7] dark:border-[#1d3058] bg-white/60 dark:bg-[#0a1530]/40 flex items-center justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-[#edf4fc] dark:hover:bg-[#192b52] text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Save & Add Voice
          </button>
        </div>
      </div>
    </div>
  );
};
