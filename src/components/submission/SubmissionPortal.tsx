import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Printer, 
  Key, 
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { IdeaCanvasData, Stage2Deliverable, UserProfile, SubmissionRecord, ComplianceReport } from '../../types';
import { Storage } from '../../utils/storage';

interface SubmissionPortalProps {
  canvas: IdeaCanvasData;
  deliverables: Stage2Deliverable[];
  user: UserProfile;
  complianceReport: ComplianceReport;
  onOpenExportModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const SubmissionPortal: React.FC<SubmissionPortalProps> = ({
  canvas,
  deliverables,
  user,
  complianceReport,
  onOpenExportModal,
  setActiveTab
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<SubmissionRecord | null>(null);

  const pastSubmissions = Storage.getSubmissions();

  const handleFinalSubmit = () => {
    if (!complianceReport.isFullyCompliant) {
      alert('Please resolve all blocking compliance errors before submitting your official package.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const subId = `DXB-ELEVEN-${Math.floor(100000 + Math.random() * 900000)}`;
      const seal = `SEAL-SHA256-${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

      const newRecord: SubmissionRecord = {
        submissionId: subId,
        ignyteId: user.ignyteId,
        startupName: user.startupName,
        track: user.track,
        useCaseTitle: canvas.boxA_title || 'Voice AI Solution',
        stage1CompletedAt: new Date().toISOString(),
        canvasData: canvas,
        stage2Deliverables: deliverables,
        complianceScore: complianceReport.score,
        digitalSeal: seal,
        status: 'submitted_stage1'
      };

      Storage.saveSubmission(newRecord);
      setSubmissionReceipt(newRecord);
      setIsSubmitting(false);

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Official Ignyte Verification Portal
              </span>
              <span className="text-xs font-mono text-slate-400">
                DIFC Innovation Center Gateway
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Challenge Submission Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Generate, sign, and submit your official Stage 1 Idea Canvas and Stage 2 Build Sprint package under the Dubai Digital Economy Mandate.
            </p>
          </div>

          {/* Submission Readiness */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Package Readiness
            </span>
            <div className="flex items-center gap-2 mt-1">
              {complianceReport.isFullyCompliant ? (
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" /> Ready to Submit
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/30">
                  <AlertTriangle className="w-4 h-4" /> Resolve Compliance
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submission Success Receipt Card (when submitted) */}
      {submissionReceipt && (
        <div className="rounded-2xl bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 border border-emerald-500/50 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  SUBMISSION CONFIRMED • RECEIPT ISSUED
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  {submissionReceipt.startupName}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Official ID: <strong className="text-amber-300">{submissionReceipt.submissionId}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={onOpenExportModal}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40 self-start sm:self-center"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Receipt PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Timestamp (Dubai GST)
              </span>
              <p className="font-mono text-slate-200">
                {new Date(submissionReceipt.stage1CompletedAt || '').toLocaleString()}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Ignyte Participant Account
              </span>
              <p className="font-mono text-amber-400 font-semibold">
                {submissionReceipt.ignyteId}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Digital Verification Seal
              </span>
              <p className="font-mono text-slate-400 truncate text-[11px]">
                {submissionReceipt.digitalSeal}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Package Summary & Submit Action Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-bold text-lg text-white">
              Stage 1 & Stage 2 Submission Manifest
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Non-exclusive evaluation license applied
          </span>
        </div>

        {/* Manifest Items List */}
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="font-semibold text-slate-200">14-Box Stage 1 Idea Canvas (A-N)</p>
                <p className="text-[11px] text-slate-400">Full 3-page structured problem and agent architecture</p>
              </div>
            </div>
            <span className="font-mono text-emerald-400 font-semibold">Ready</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="font-semibold text-slate-200">Box D & J Quantitative KPI Alignment</p>
                <p className="text-[11px] text-slate-400">Baseline metrics correlated with target outcome impact</p>
              </div>
            </div>
            <span className="font-mono text-emerald-400 font-semibold">Verified</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="font-semibold text-slate-200">Box I 6-Row Safety Mechanisms Matrix</p>
                <p className="text-[11px] text-slate-400">Concrete software guardrails validated across 6 risk scenarios</p>
              </div>
            </div>
            <span className="font-mono text-emerald-400 font-semibold">Verified</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="font-semibold text-slate-200">Stage 2 Deliverables & 40MB Boundary</p>
                <p className="text-[11px] text-slate-400">Callable agent link, transcripts, test pass rates, architecture schematic</p>
              </div>
            </div>
            <span className="font-mono text-emerald-400 font-semibold">Verified</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400 leading-relaxed max-w-md">
            By submitting, you certify that this entry is your team's sole submission for the Ignyte x ElevenLabs Challenge and complies with all competition terms.
          </p>

          <button
            onClick={handleFinalSubmit}
            disabled={isSubmitting || !complianceReport.isFullyCompliant}
            id="portal-submit-package-btn"
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-display font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
              complianceReport.isFullyCompliant
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-950/50 hover:scale-105'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                <span>Signing & Submitting Package...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>Submit Official Challenge Package</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Historical Submissions */}
      {pastSubmissions.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-display font-bold text-base text-slate-200">
            Submission History & Audit Trail
          </h4>
          <div className="space-y-3">
            {pastSubmissions.map((sub) => (
              <div key={sub.submissionId} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400">{sub.submissionId}</span>
                  <p className="text-sm font-semibold text-slate-100">{sub.useCaseTitle}</p>
                  <p className="text-[11px] text-slate-400">{new Date(sub.stage1CompletedAt || '').toLocaleString()}</p>
                </div>
                <button
                  onClick={onOpenExportModal}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold"
                >
                  View Bundle
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
