import React from 'react';
import { 
  FileText, 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Volume2, 
  Scale, 
  Download,
  Flame,
  Award
} from 'lucide-react';
import { UserProfile, IdeaCanvasData, Stage2Deliverable, ComplianceReport } from '../../types';
import { TIMELINE_MILESTONES, USE_CASES } from '../../data/competitionData';

interface DashboardViewProps {
  user: UserProfile;
  canvas: IdeaCanvasData;
  deliverables: Stage2Deliverable[];
  complianceReport: ComplianceReport;
  setActiveTab: (tab: string) => void;
  onOpenExportModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  canvas,
  deliverables,
  complianceReport,
  setActiveTab,
  onOpenExportModal
}) => {
  const selectedUseCase = USE_CASES.find(u => u.id === user.selectedUseCaseId) || USE_CASES[0];
  const stage2CompletedCount = deliverables.filter(d => d.status === 'complete').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Ignyte Challenges Workspace • DIFC Hub</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ignite the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Voice AI</span> in Dubai
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Design, validate, and submit your 14-box Stage 1 Idea Canvas, then build enterprise-grade voice agents on ElevenLabs for Dubai’s Banking, Insurance, and Government ecosystems.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 shrink-0">
            <div className="text-center sm:text-left px-3">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
                Compliance Score
              </span>
              <div className="flex items-center gap-2 mt-0.5 justify-center sm:justify-start">
                <span className={`text-2xl font-black font-display ${
                  complianceReport.isFullyCompliant ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {complianceReport.score}%
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  {complianceReport.passedChecks}/{complianceReport.totalChecks} Rules
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-slate-800" />

            <div className="text-center sm:text-left px-3">
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
                Active Track
              </span>
              <span className="text-sm font-bold text-amber-300 block truncate max-w-[140px] mt-0.5">
                {user.track === 'track_1' ? 'Track 1: Banking' : 'Track 2: Gov'}
              </span>
            </div>
          </div>
        </div>

        {/* Selected Use Case Strip */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-mono">SELECTED USE CASE FOCUS</span>
              <h3 className="font-semibold text-slate-100 text-sm">
                {selectedUseCase.title} <span className="text-slate-400 font-normal">({selectedUseCase.trackTitle})</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('explorer')}
              className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>Change Use Case</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Stage Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stage 1: Idea Canvas Card */}
        <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                  S1
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    CURRENT STAGE • DUE 23 SEP
                  </span>
                  <h3 className="font-display font-bold text-lg text-white">
                    Stage 1: Idea Canvas
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                14 Boxes (A-N)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Complete the 3-page structured canvas. Enforce strict word limits, cross-check Box D & J baseline KPIs, curate Box G ElevenLabs components, and specify concrete mechanisms in Box I.
            </p>

            {/* Sub-check status */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Box D/J KPI Cross-Check</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Aligned & Quantified
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Box I Mechanism Table</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> 6 Rows Verified
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {canvas.boxA_title ? 'Draft in progress' : 'Ready to begin'}
            </span>
            <button
              onClick={() => setActiveTab('canvas')}
              id="dashboard-open-canvas-btn"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-950/30"
            >
              <span>Open Idea Canvas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stage 2: Build Sprint Card */}
        <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                  S2
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    UPCOMING SPRINT • 30 SEP - 14 OCT
                  </span>
                  <h3 className="font-display font-bold text-lg text-white">
                    Stage 2: Voice Build Sprint
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                {stage2CompletedCount}/6 Deliverables
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Build and test your callable voice agent on ElevenLabs. Prepare callable agent links, recorded video demos, test suites (&gt;90% pass rate), transcripts, and architecture diagrams (max 40MB).
            </p>

            {/* Sub-check status */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Testing Suite Pass Rate</span>
                <span className="font-semibold text-blue-400 flex items-center gap-1 mt-0.5">
                  <Zap className="w-3 h-3" /> 96.8% Target Rate
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Package Size Check</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Under 40MB Limit
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Voice agent testing sandbox available
            </span>
            <button
              onClick={() => setActiveTab('sprint')}
              id="dashboard-open-sprint-btn"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-950/30"
            >
              <span>Manage Sprint Deliverables</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-bold text-lg text-white">
              Official Challenge Timeline & Milestones
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Dubai Time (GST / UTC+4)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {TIMELINE_MILESTONES.map((m, idx) => {
            const isCurrent = m.status === 'current';
            const isCompleted = m.status === 'completed';
            return (
              <div 
                key={m.id}
                className={`relative p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/40'
                    : isCompleted
                      ? 'bg-slate-950/80 border-slate-800 text-slate-400'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isCurrent 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                      : isCompleted
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-900 text-slate-500'
                  }`}>
                    {isCurrent ? 'ACTIVE NOW' : isCompleted ? 'DONE' : `STEP ${idx + 1}`}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  {isCurrent && <Flame className="w-3.5 h-3.5 text-amber-400" />}
                </div>

                <h4 className="font-semibold text-xs text-slate-200 line-clamp-1 mb-1">
                  {m.title}
                </h4>
                <p className="font-mono text-[11px] text-amber-400/90 font-medium mb-2">
                  {m.date}
                </p>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rules & Prohibited Policy Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-100">
              Competition Rules & Prohibited Use Policy
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              One application per participant • Strict word limits • No production deployment without authorization • Max 40MB total bundle.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('compliance')}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            Audit Compliance
          </button>
          <button
            onClick={onOpenExportModal}
            className="px-3.5 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-xs font-semibold text-amber-300 border border-amber-500/40 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>
        </div>
      </div>
    </div>
  );
};
