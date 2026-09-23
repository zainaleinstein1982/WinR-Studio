import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Award, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { IdeaCanvasData, Stage2Deliverable, UserProfile } from '../../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvas: IdeaCanvasData;
  deliverables: Stage2Deliverable[];
  user: UserProfile;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  canvas,
  deliverables,
  user
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const exportPayload = {
    metadata: {
      competition: 'Ignyte x ElevenLabs AI Voice Hackathon',
      sponsor: 'Dubai Future Foundation / DIFC Innovation Hub',
      startupName: user.startupName,
      ignyteId: user.ignyteId,
      track: user.track === 'track_1' ? 'Track 1 (Banking & Insurance)' : 'Track 2 (Government Services)',
      teamLead: user.teamLeadName,
      leadEmail: user.leadEmail,
      exportedAt: new Date().toISOString()
    },
    stage1IdeaCanvas: {
      boxA_title: canvas.boxA_title,
      boxB_persona: canvas.boxB_persona,
      boxC_problem: canvas.boxC_problem,
      boxD_baseline: canvas.boxD_baseline,
      boxE_voiceModality: canvas.boxE_voiceModality,
      boxF_agentArchitecture: canvas.boxF_agentArchitecture,
      boxG_elevenLabsStack: canvas.boxG_elevenLabsStack,
      boxG_selectedComponents: canvas.boxG_selectedComponents,
      boxH_toolsAndIntegrations: canvas.boxH_toolsAndIntegrations,
      boxI_guardrails: canvas.boxI_guardrails,
      boxJ_kpisAndImpact: canvas.boxJ_kpisAndImpact,
      boxK_businessCaseRoi: canvas.boxK_businessCaseRoi,
      boxL_rolloutPlan: canvas.boxL_rolloutPlan,
      boxM_competitiveAdvantage: canvas.boxM_competitiveAdvantage,
      boxN_prototypeLink: canvas.boxN_prototypeLink
    },
    stage2Deliverables: deliverables
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);

  const handleDownloadJSON = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ignyte-ElevenLabs-${user.ignyteId || 'Submission'}-Canvas.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Export Official Submission Package
            </h3>
            <p className="text-xs text-slate-400">
              Download structured JSON or generate an official PDF print document.
            </p>
          </div>
        </div>

        {/* Export Options Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handleDownloadJSON}
            className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 transition-all text-left flex flex-col justify-between space-y-2 group"
          >
            <Download className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-bold text-xs text-slate-200">Download JSON</p>
              <p className="text-[10px] text-slate-500">Machine-readable package</p>
            </div>
          </button>

          <button
            onClick={handlePrint}
            className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 transition-all text-left flex flex-col justify-between space-y-2 group"
          >
            <Printer className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-bold text-xs text-slate-200">Print to PDF</p>
              <p className="text-[10px] text-slate-500">Formatted 3-page canvas document</p>
            </div>
          </button>

          <button
            onClick={handleCopyJSON}
            className="p-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 transition-all text-left flex flex-col justify-between space-y-2 group"
          >
            {copied ? (
              <Check className="w-5 h-5 text-emerald-400" />
            ) : (
              <Copy className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            )}
            <div>
              <p className="font-bold text-xs text-slate-200">{copied ? 'Copied!' : 'Copy to Clipboard'}</p>
              <p className="text-[10px] text-slate-500">Raw JSON payload</p>
            </div>
          </button>
        </div>

        {/* JSON Preview Code box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">JSON Package Manifest Preview</span>
            <span className="font-mono text-[10px]">{(jsonString.length / 1024).toFixed(1)} KB</span>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 max-h-60 overflow-y-auto leading-relaxed">
            {jsonString}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
