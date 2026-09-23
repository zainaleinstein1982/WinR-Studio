import React, { useState } from 'react';
import { 
  Building2, 
  Landmark, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Volume2, 
  ShieldAlert, 
  TrendingUp, 
  FileText, 
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { UseCase, TrackType, UserProfile } from '../../types';
import { USE_CASES, SAMPLE_DEFAULT_CANVAS } from '../../data/competitionData';

interface UseCaseExplorerProps {
  user: UserProfile;
  onSelectUseCase: (useCase: UseCase) => void;
  onLoadTemplate: (useCase: UseCase) => void;
  setActiveTab: (tab: string) => void;
}

export const UseCaseExplorer: React.FC<UseCaseExplorerProps> = ({
  user,
  onSelectUseCase,
  onLoadTemplate,
  setActiveTab
}) => {
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<TrackType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailModalUseCase, setDetailModalUseCase] = useState<UseCase | null>(null);

  const filteredUseCases = USE_CASES.filter((uc) => {
    const matchesTrack = selectedTrackFilter === 'all' || uc.track === selectedTrackFilter;
    const matchesSearch = uc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uc.scope.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uc.builtFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Two Official Challenge Tracks • 8 High-Impact Use Cases
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Track & Use Case Explorer
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              In accordance with competition rules, your startup must pitch a concept and build a working voice agent for <strong className="text-amber-300">exactly one use case</strong>. Explore the full scopes below.
            </p>
          </div>

          {/* Current Selection Status */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Currently Selected
            </span>
            <p className="font-semibold text-sm text-amber-300 mt-0.5">
              {USE_CASES.find(u => u.id === user.selectedUseCaseId)?.title || 'None Selected'}
            </p>
            <p className="text-[11px] text-slate-400">
              {user.track === 'track_1' ? 'Track 1: Banking & Insurance' : 'Track 2: Government Services'}
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTrackFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTrackFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Use Cases (8)
            </button>
            <button
              onClick={() => setSelectedTrackFilter('track_1')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedTrackFilter === 'track_1'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Track 1: Banking & Insurance (5)</span>
            </button>
            <button
              onClick={() => setSelectedTrackFilter('track_2')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedTrackFilter === 'track_2'
                  ? 'bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-950/40'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Track 2: Government (3)</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search scope or target..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUseCases.map((uc) => {
          const isCurrentActive = user.selectedUseCaseId === uc.id;
          const isTrack1 = uc.track === 'track_1';

          return (
            <div
              key={uc.id}
              className={`rounded-2xl bg-slate-900 border transition-all flex flex-col justify-between overflow-hidden group ${
                isCurrentActive
                  ? 'border-amber-500/80 ring-1 ring-amber-500/40 shadow-xl shadow-amber-950/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Top */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    isTrack1
                      ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    {uc.trackTitle}
                  </span>

                  {isCurrentActive && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active Selection
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                    {uc.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mt-1">
                    <strong className="text-slate-300">Built for:</strong> {uc.builtFor}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {uc.description}
                </p>

                {/* Key Capabilities */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Key ElevenLabs Capabilities
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {uc.keyElevenLabsCapabilities.slice(0, 3).map((cap, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setDetailModalUseCase(uc)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  View Details
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectUseCase(uc);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isCurrentActive
                        ? 'bg-slate-800 text-amber-400 border border-amber-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isCurrentActive ? 'Selected' : 'Select Use Case'}
                  </button>

                  <button
                    onClick={() => {
                      onSelectUseCase(uc);
                      setActiveTab('canvas');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1 shadow-sm shadow-amber-950"
                  >
                    <span>Build Canvas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {detailModalUseCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-6 bg-gradient-to-r from-slate-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {detailModalUseCase.trackTitle}
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  {detailModalUseCase.title}
                </h3>
              </div>
              <button
                onClick={() => setDetailModalUseCase(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Scope & Ecosystem Target
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {detailModalUseCase.scope}
                </p>
                <p className="text-xs text-amber-400/90 mt-1 font-medium">
                  <strong>Built for:</strong> {detailModalUseCase.builtFor}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  The Problem & Voice AI Opportunity
                </h4>
                <p className="text-xs text-slate-300 mb-2">
                  <strong className="text-rose-400">Problem:</strong> {detailModalUseCase.problemSummary}
                </p>
                <p className="text-xs text-slate-300">
                  <strong className="text-emerald-400">Voice Opportunity:</strong> {detailModalUseCase.voiceOpportunity}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Recommended ElevenLabs Stack Capabilities
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {detailModalUseCase.keyElevenLabsCapabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Suggested Target Quantitative KPIs
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {detailModalUseCase.suggestedKpis.map((kpi, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                      <span>{kpi}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Sample System Prompt Snippet
                </h4>
                <pre className="text-[11px] font-mono p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 overflow-x-auto whitespace-pre-wrap">
                  {detailModalUseCase.sampleConversationPrompt}
                </pre>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setDetailModalUseCase(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onSelectUseCase(detailModalUseCase);
                  setDetailModalUseCase(null);
                  setActiveTab('canvas');
                }}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
              >
                <span>Select & Start Idea Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
