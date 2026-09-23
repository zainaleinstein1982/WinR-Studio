import React from 'react';
import { AlertTriangle, CheckCircle2, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';
import { evaluateBoxDandJAlignment } from '../../utils/validation';

interface BoxDandJCrossCheckerProps {
  boxD: string;
  boxJ: string;
}

export const BoxDandJCrossChecker: React.FC<BoxDandJCrossCheckerProps> = ({ boxD, boxJ }) => {
  const result = evaluateBoxDandJAlignment(boxD, boxJ);

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      result.isAligned
        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
        : 'bg-amber-950/30 border-amber-500/50 text-amber-300'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          {result.isAligned ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <span>Box D & Box J Metric Cross-Validation</span>
              <span className="text-[10px] px-2 py-0.2 rounded bg-slate-900 border border-slate-700 font-mono text-slate-300">
                Rule Check
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {result.isAligned
                ? 'Quantitative metrics detected in both Box D (Baseline) and Box J (Target KPIs). Metrics appear mathematically aligned.'
                : result.warning}
            </p>
          </div>
        </div>
      </div>

      {/* Metric Badges comparison */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Box D Baseline Figures Extracted
          </span>
          {result.metricsInD.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {result.metricsInD.map((m, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-500/40 text-blue-300 font-mono text-[11px]">
                  {m}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-slate-500 italic text-[11px]">No quantitative figures found in Box D.</span>
          )}
        </div>

        <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Box J Target KPIs Extracted
          </span>
          {result.metricsInJ.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {result.metricsInJ.map((m, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[11px]">
                  {m}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-slate-500 italic text-[11px]">No quantitative figures found in Box J.</span>
          )}
        </div>
      </div>
    </div>
  );
};
