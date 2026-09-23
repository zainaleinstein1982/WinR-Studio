import React, { useState } from 'react';
import { 
  Cloud, 
  Server, 
  Zap, 
  ShieldCheck, 
  Globe2, 
  RefreshCw, 
  Check, 
  Activity, 
  Lock, 
  Radio, 
  Layers, 
  ArrowRight,
  Database,
  Cpu
} from 'lucide-react';
import { MainNavTab } from '../voicestudio/VoiceStudioNavTabs';

interface CloudViewProps {
  onNavigateTab: (tab: MainNavTab, subView?: any) => void;
}

export const CloudView: React.FC<CloudViewProps> = ({ onNavigateTab }) => {
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing'>('synced');
  const [activeRegion, setActiveRegion] = useState('me-central1-dxb');

  const handleManualSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
    }, 1200);
  };

  const regions = [
    {
      id: 'me-central1-dxb',
      name: 'DIFC Dubai Edge (UAE)',
      badge: 'Active Gateway',
      ping: '14ms',
      status: 'Optimal',
      isPrimary: true
    },
    {
      id: 'me-south1-bah',
      name: 'Bahrain Regional Cluster',
      badge: 'Standby Gateway',
      ping: '28ms',
      status: 'Ready',
      isPrimary: false
    },
    {
      id: 'eu-west3-fra',
      name: 'Frankfurt Central (EU)',
      badge: 'ElevenLabs Core',
      ping: '78ms',
      status: 'Ready',
      isPrimary: false
    },
    {
      id: 'us-east4-iad',
      name: 'US-East (Virginia)',
      badge: 'ElevenLabs Global',
      ping: '142ms',
      status: 'Ready',
      isPrimary: false
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121626] via-[#1a2038] to-[#121626] border border-[#242d48] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <Cloud className="w-3.5 h-3.5" />
              <span>Hybrid Cloud & WebRTC Edge Infrastructure</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              WinR Studio Cloud Bridge
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Connect local 14-box canvas drafts with the <strong>ElevenLabs Conversational Cloud</strong> and deploy sub-second telephony agents to regional low-latency edge gateways.
            </p>
          </div>

          {/* Sync Trigger */}
          <button
            onClick={handleManualSync}
            disabled={syncStatus === 'syncing'}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-950/50 transition-all cursor-pointer self-start md:self-auto shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <span>{syncStatus === 'syncing' ? 'Synchronizing State...' : 'Sync Cloud State'}</span>
          </button>
        </div>
      </div>

      {/* Cluster Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {regions.map((reg) => {
          const isSelected = activeRegion === reg.id;
          return (
            <div
              key={reg.id}
              onClick={() => setActiveRegion(reg.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#151c33] border-rose-500 shadow-md shadow-rose-950/40 ring-1 ring-rose-500/40'
                  : 'bg-[#101424] border-[#222a44] hover:border-[#323d60] hover:bg-[#13182b]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    reg.isPrimary
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {reg.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold">
                    <Activity className="w-3 h-3" />
                    <span>{reg.ping}</span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white tracking-tight">
                  {reg.name}
                </h4>
              </div>

              <div className="pt-4 mt-3 border-t border-[#1e263d] flex items-center justify-between text-xs text-slate-400">
                <span>Status: <strong className="text-emerald-400">{reg.status}</strong></span>
                {isSelected && <span className="text-rose-400 font-bold text-[11px]">Selected</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => onNavigateTab('gallery')}
          className="p-5 rounded-2xl bg-[#111524] border border-[#212840] hover:border-rose-500/50 hover:bg-[#151a2d] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Voice Gallery (646 Langs)</h4>
          <p className="text-xs text-slate-400">Deploy neural voices directly from cloud or offline cache.</p>
        </div>

        <div 
          onClick={() => onNavigateTab('workflow', 'canvas')}
          className="p-5 rounded-2xl bg-[#111524] border border-[#212840] hover:border-rose-500/50 hover:bg-[#151a2d] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">14-Box Stage 1 Canvas</h4>
          <p className="text-xs text-slate-400">Synchronize team canvas ideation with encrypted backup.</p>
        </div>

        <div 
          onClick={() => onNavigateTab('sandbox')}
          className="p-5 rounded-2xl bg-[#111524] border border-[#212840] hover:border-rose-500/50 hover:bg-[#151a2d] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Telephony Sandbox</h4>
          <p className="text-xs text-slate-400">Execute real-time WebRTC test calls through DIFC Dubai Edge.</p>
        </div>
      </div>
    </div>
  );
};
