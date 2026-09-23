import React from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  HelpCircle,
  Lock,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { GuardrailRow } from '../../types';
import { analyzeMechanism, countWords } from '../../utils/validation';

interface BoxIGuardrailTableProps {
  guardrails: GuardrailRow[];
  onChange: (updatedGuardrails: GuardrailRow[]) => void;
}

const DEFAULT_RISK_TEMPLATES = [
  { risk: 'PII & Account Data Leakage', failure: 'Agent recites full card numbers, CVVs, or secret PINs over voice.' },
  { risk: 'Social Engineering & Impersonation', failure: 'Fraudster calls claiming to be cardholder/citizen to manipulate account status.' },
  { risk: 'Prompt Injection & Jailbreak', failure: 'Adversarial caller commands agent to bypass safety policy and execute unauthorized tools.' },
  { risk: 'Hallucination & Unauthorized Advice', failure: 'Agent invents legal rules, fee waivers, or non-existent government decrees.' },
  { risk: 'Audio Latency & Call Dropout', failure: 'Network packet lag or telephony timeout creates silent dead air during verification.' },
  { risk: 'Distressed Caller Panic & Escalation', failure: 'Caller becomes agitated, threatening, or traumatized during crisis situations.' }
];

export const BoxIGuardrailTable: React.FC<BoxIGuardrailTableProps> = ({
  guardrails = [],
  onChange
}) => {
  // Ensure we have 6 rows
  const currentRows: GuardrailRow[] = DEFAULT_RISK_TEMPLATES.map((tmpl, idx) => {
    const existing = guardrails[idx];
    return existing || {
      riskType: tmpl.risk,
      failureScenario: tmpl.failure,
      mechanism: ''
    };
  });

  const updateRow = (index: number, field: keyof GuardrailRow, value: string) => {
    const next = [...currentRows];
    next[index] = {
      ...next[index],
      [field]: value
    };
    onChange(next);
  };

  const totalWords = currentRows.reduce((acc, row) => {
    return acc + countWords(row.riskType) + countWords(row.failureScenario) + countWords(row.mechanism);
  }, 0);

  return (
    <div className="space-y-4 rounded-xl bg-slate-950/80 border border-slate-800 p-4 sm:p-5">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h4 className="font-semibold text-sm text-slate-100">
              Box I: 6-Row Safety, Governance & Guardrails Matrix
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Rule requirement: Every row must state a <strong className="text-amber-300">concrete software mechanism</strong>, not a vague statement of intent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
            Total Box I: {totalWords}/400 words
          </span>
        </div>
      </div>

      {/* Mechanism Quality Tip */}
      <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/30 text-blue-300 text-xs flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-blue-200">Mechanism Examples:</strong> "Regex proxy node masking PAN patterns", "Deterministic 2-factor push trigger node", "Knowledge Base RAG citation filter with source attribution", "ElevenLabs input shield + trust context".
        </p>
      </div>

      {/* 6-Row Matrix Table */}
      <div className="space-y-4">
        {currentRows.map((row, idx) => {
          const analysis = analyzeMechanism(row.mechanism);
          const isFilled = row.mechanism.trim().length > 0;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all space-y-3 ${
                !isFilled
                  ? 'bg-slate-900/50 border-slate-800'
                  : analysis.isValid
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm'
                    : 'bg-amber-950/20 border-amber-500/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-[11px] font-mono flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-xs text-slate-100">
                    {row.riskType}
                  </span>
                </div>

                {isFilled && (
                  <div className="flex items-center gap-1.5 text-[11px] font-medium">
                    {analysis.isValid ? (
                      <span className="text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Concrete Mechanism
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        <AlertTriangle className="w-3.5 h-3.5" /> Intent Warning
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Failure Scenario */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Failure Scenario *
                  </label>
                  <textarea
                    rows={2}
                    value={row.failureScenario}
                    onChange={(e) => updateRow(idx, 'failureScenario', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500 resize-none font-sans"
                    placeholder="Describe how the failure manifests..."
                  />
                </div>

                {/* Concrete Mechanism */}
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center justify-between">
                    <span>Concrete Technical Mechanism *</span>
                    <span className="text-slate-500 lowercase font-normal">{countWords(row.mechanism)} words</span>
                  </label>
                  <textarea
                    rows={2}
                    value={row.mechanism}
                    onChange={(e) => updateRow(idx, 'mechanism', e.target.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border text-slate-200 text-xs focus:outline-none resize-none font-sans transition-all ${
                      !isFilled
                        ? 'border-slate-700 focus:border-amber-500'
                        : analysis.isValid
                          ? 'border-emerald-500/60 focus:border-emerald-400'
                          : 'border-amber-500/70 focus:border-amber-400'
                    }`}
                    placeholder="State technical software mechanism (e.g. regex proxy, assertion, RAG filter node, rate limiter)..."
                  />
                </div>
              </div>

              {/* Mechanism analysis feedback */}
              {isFilled && !analysis.isValid && (
                <p className="text-[11px] text-amber-300 bg-amber-950/40 p-2 rounded-lg border border-amber-500/30 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{analysis.reason}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
