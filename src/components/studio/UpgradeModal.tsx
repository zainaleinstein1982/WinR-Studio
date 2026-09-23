import React from 'react';
import { X, Sparkles, Check, Zap, ShieldCheck } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1530]/75 backdrop-blur-xs select-none animate-in fade-in duration-150">
      <div className="bg-[#fbfdff] dark:bg-[#0c1836] border border-[#d6e3f0] dark:border-[#1e3463] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#e2ecf7] dark:border-[#1d3058] flex items-center justify-between bg-white/70 dark:bg-[#0a1530]/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Upgrade to Win Audio Studio Pro</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Unleash unlimited emotional tags, studio-grade voices, and ultra-fast generation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-[#edf4fc] dark:hover:bg-[#192b52]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing tiers */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Free Tier */}
          <div className="p-5 rounded-2xl border border-[#d6e3f2] dark:border-[#1e3463] bg-white dark:bg-[#102046] space-y-4 flex flex-col justify-between shadow-2xs">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Plan</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100">$0</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>500 characters per generation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Core expressive audio tags ([laughs], [whispers])</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Standard voice synthesis models</span>
                </li>
              </ul>
            </div>

            <button
              disabled
              className="w-full py-2.5 rounded-xl bg-[#edf4fc] dark:bg-[#14244a] text-slate-400 text-xs font-bold cursor-default"
            >
              Current Active Plan
            </button>
          </div>

          {/* Pro Tier */}
          <div className="p-5 rounded-2xl border-2 border-blue-500 dark:border-blue-500 bg-gradient-to-b from-blue-500/10 to-transparent space-y-4 flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Pro Studio</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">Popular</span>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100">$19</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">/ month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                <li className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Unlimited multi-speaker dialogues</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Instant 1-second Voice Cloning</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Zero-latency WebRTC Telephony streaming</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Commercial broadcast rights</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                alert('Thank you! Pro privileges have been unlocked for your workspace.');
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all hover:scale-[1.02] active:scale-98"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
