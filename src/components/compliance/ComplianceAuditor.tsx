import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RefreshCw, 
  Sparkles, 
  FileText, 
  Scale, 
  Lock,
  Zap
} from 'lucide-react';
import { ComplianceReport, UserProfile, IdeaCanvasData, Stage2Deliverable } from '../../types';
import { runFullComplianceAudit } from '../../utils/validation';

interface ComplianceAuditorProps {
  report: ComplianceReport;
  canvas: IdeaCanvasData;
  deliverables: Stage2Deliverable[];
  user: UserProfile;
  setActiveTab: (tab: string) => void;
  onRefreshAudit: () => void;
}

export const ComplianceAuditor: React.FC<ComplianceAuditorProps> = ({
  report,
  canvas,
  deliverables,
  user,
  setActiveTab,
  onRefreshAudit
}) => {
  const [filter, setFilter] = useState<'all' | 'errors' | 'warnings'>('all');

  const errors = report.issues.filter((i) => i.severity === 'error');
  const warnings = report.issues.filter((i) => i.severity === 'warning');

  const displayedIssues = filter === 'errors' 
    ? errors 
    : filter === 'warnings' 
      ? warnings 
      : report.issues;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                report.isFullyCompliant 
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}>
                {report.isFullyCompliant ? '100% COMPLIANT' : 'AUDIT ACTION REQUIRED'}
              </span>
              <span className="text-xs font-mono text-slate-400">
                16-Point Rule Validation Matrix
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Automated Competition Compliance Auditor
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Verifies strict Stage 1 word limits, Box D/J KPI alignments, Box G component justifications, Box I software mechanisms, and the 40MB file size ceiling before final submission.
            </p>
          </div>

          {/* Compliance Score Dial Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-5 shrink-0">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border-2 border-amber-500/40 font-display font-black text-2xl text-amber-300">
              {report.score}%
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Audit Status
              </span>
              <p className={`font-bold text-sm ${report.isFullyCompliant ? 'text-emerald-400' : 'text-amber-400'}`}>
                {report.isFullyCompliant ? 'Ready for Submission' : `${errors.length} Blocking Issue${errors.length > 1 ? 's' : ''}`}
              </p>
              <button
                onClick={onRefreshAudit}
                className="mt-1 text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Re-run Audit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Findings ({report.issues.length})
          </button>
          <button
            onClick={() => setFilter('errors')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filter === 'errors'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Blocking Errors ({errors.length})</span>
          </button>
          <button
            onClick={() => setFilter('warnings')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filter === 'warnings'
                ? 'bg-amber-600 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Advisory Warnings ({warnings.length})</span>
          </button>
        </div>
      </div>

      {/* Compliance Rules Matrix */}
      <div className="space-y-4">
        {displayedIssues.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              All 16 Compliance Checks Passed!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Your Idea Canvas and Stage 2 deliverables fully satisfy all Ignyte x ElevenLabs challenge regulations, word limits, and architectural mechanism standards.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('submission')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-950/40 hover:from-amber-400 transition-all"
              >
                Proceed to Final Submission Portal
              </button>
            </div>
          </div>
        ) : (
          displayedIssues.map((issue) => {
            const isError = issue.severity === 'error';

            return (
              <div
                key={issue.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isError
                    ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                    : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 shrink-0">
                    {isError ? (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded bg-slate-900 border border-slate-700 font-mono text-slate-300">
                        {issue.boxOrRule}
                      </span>
                      <span className={`text-[10px] font-bold uppercase ${isError ? 'text-rose-400' : 'text-amber-400'}`}>
                        {isError ? 'BLOCKING ERROR' : 'ADVISORY WARNING'}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-100 mt-1">
                      {issue.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {issue.message}
                    </p>
                    <p className="text-[11px] text-amber-300/90 mt-1.5 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{issue.recommendation}</span>
                    </p>
                  </div>
                </div>

                {issue.targetTab && (
                  <button
                    onClick={() => setActiveTab('canvas')}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                  >
                    <span>Fix in Canvas</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
