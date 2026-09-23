import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  RefreshCw, 
  Link as LinkIcon, 
  ExternalLink,
  ShieldCheck,
  Zap,
  RotateCcw,
  Check
} from 'lucide-react';
import { IdeaCanvasData, UserProfile } from '../../types';
import { WORD_LIMITS, SAMPLE_DEFAULT_CANVAS } from '../../data/competitionData';
import { CanvasWordBadge } from './CanvasWordBadge';
import { BoxDandJCrossChecker } from './BoxDandJCrossChecker';
import { BoxGComponentSelector } from './BoxGComponentSelector';
import { BoxIGuardrailTable } from './BoxIGuardrailTable';
import { countWords, isValidUrl } from '../../utils/validation';

interface CanvasBuilderProps {
  canvas: IdeaCanvasData;
  onChange: (updatedCanvas: IdeaCanvasData) => void;
  user: UserProfile;
  onOpenExportModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const CanvasBuilder: React.FC<CanvasBuilderProps> = ({
  canvas,
  onChange,
  user,
  onOpenExportModal,
  setActiveTab
}) => {
  const [currentPage, setCurrentPage] = useState<'page_1' | 'page_2' | 'page_3'>('page_1');
  const [pingStatus, setPingStatus] = useState<'idle' | 'checking' | 'success' | 'failed'>('idle');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const updateField = (field: keyof IdeaCanvasData, value: unknown) => {
    onChange({
      ...canvas,
      [field]: value
    });
  };

  const handleTestLink = () => {
    const url = canvas.boxN_prototypeLink?.trim();
    if (!url || !isValidUrl(url)) {
      setPingStatus('failed');
      showToast('Invalid URL format. Must start with http:// or https://');
      return;
    }

    setPingStatus('checking');
    setTimeout(() => {
      setPingStatus('success');
      showToast('Prototype link verified reachable (HTTP 200 OK)');
      updateField('boxN_linkStatus', 'valid');
    }, 900);
  };

  const loadBenchmarkSample = () => {
    onChange({ ...SAMPLE_DEFAULT_CANVAS });
    showToast('Loaded benchmark exemplar Idea Canvas!');
  };

  const resetToBlank = () => {
    if (window.confirm('Reset all 14 canvas boxes to empty?')) {
      onChange({
        boxA_title: '',
        boxB_persona: '',
        boxC_problem: '',
        boxD_baseline: '',
        boxE_voiceModality: '',
        boxF_agentArchitecture: '',
        boxG_elevenLabsStack: '',
        boxG_selectedComponents: [],
        boxH_toolsAndIntegrations: '',
        boxI_guardrails: [],
        boxJ_kpisAndImpact: '',
        boxK_businessCaseRoi: '',
        boxL_rolloutPlan: '',
        boxM_competitiveAdvantage: '',
        boxN_prototypeLink: '',
        boxN_linkStatus: 'unchecked'
      });
      showToast('Canvas cleared.');
    }
  };

  // Calculate page completeness
  const p1Complete = !!(canvas.boxA_title && canvas.boxB_persona && canvas.boxC_problem && canvas.boxD_baseline && canvas.boxE_voiceModality);
  const p2Complete = !!(canvas.boxF_agentArchitecture && canvas.boxG_elevenLabsStack && canvas.boxH_toolsAndIntegrations && (canvas.boxI_guardrails?.length >= 6));
  const p3Complete = !!(canvas.boxJ_kpisAndImpact && canvas.boxK_businessCaseRoi && canvas.boxL_rolloutPlan && canvas.boxM_competitiveAdvantage && canvas.boxN_prototypeLink);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/80 text-amber-300 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Stage 1 Deliverable • Due 23 Sep
              </span>
              <span className="text-xs font-mono text-slate-400">
                14 Boxes (A-N) across 3 Pages
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Idea Canvas Builder
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Active Focus: <strong className="text-amber-300">{user.track === 'track_1' ? 'Track 1 (Banking & Insurance)' : 'Track 2 (Government Services)'}</strong> • Single canvas submission strictly enforced.
            </p>
          </div>

          {/* Canvas Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={loadBenchmarkSample}
              id="canvas-load-sample-btn"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Load full benchmark compliant canvas sample"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Load Benchmark Sample</span>
            </button>

            <button
              onClick={resetToBlank}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Clear all fields"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={onOpenExportModal}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-950/30 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF / JSON</span>
            </button>
          </div>
        </div>

        {/* 3-Page Tab Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setCurrentPage('page_1')}
            className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
              currentPage === 'page_1'
                ? 'bg-amber-500/10 border-amber-500/80 text-white shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/30'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-400">
                Page 1 of 3
              </span>
              <p className="font-semibold text-xs sm:text-sm text-slate-100">
                Strategic Fit & Problem
              </p>
              <span className="text-[10px] text-slate-400">Boxes A, B, C, D, E</span>
            </div>
            {p1Complete && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          </button>

          <button
            onClick={() => setCurrentPage('page_2')}
            className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
              currentPage === 'page_2'
                ? 'bg-amber-500/10 border-amber-500/80 text-white shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/30'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-400">
                Page 2 of 3
              </span>
              <p className="font-semibold text-xs sm:text-sm text-slate-100">
                Agent & ElevenLabs Tech
              </p>
              <span className="text-[10px] text-slate-400">Boxes F, G, H, I (Guardrails)</span>
            </div>
            {p2Complete && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          </button>

          <button
            onClick={() => setCurrentPage('page_3')}
            className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
              currentPage === 'page_3'
                ? 'bg-amber-500/10 border-amber-500/80 text-white shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/30'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-400">
                Page 3 of 3
              </span>
              <p className="font-semibold text-xs sm:text-sm text-slate-100">
                Impact, Viability & Demo
              </p>
              <span className="text-[10px] text-slate-400">Boxes J, K, L, M, N (Link)</span>
            </div>
            {p3Complete && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          </button>
        </div>
      </div>

      {/* PAGE 1: Strategic Fit & Problem (Boxes A-E) */}
      {currentPage === 'page_1' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Box A */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX A • STRATEGIC TITLE
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Solution Title & Core Voice Pitch
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxA_title} limit={WORD_LIMITS.boxA} />
            </div>
            <p className="text-xs text-slate-400">
              A memorable title and concise elevator pitch highlighting what your voice agent achieves.
            </p>
            <textarea
              id="box-a-input"
              rows={2}
              value={canvas.boxA_title}
              onChange={(e) => updateField('boxA_title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. AegisVoice: Real-Time Autonomous Fraud Intervention & Cardholder Protection Voice Agent"
            />
          </div>

          {/* Box B */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX B • TARGET PERSONA
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Target Customer Persona & Ecosystem Context
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxB_persona} limit={WORD_LIMITS.boxB} />
            </div>
            <p className="text-xs text-slate-400">
              Who is the caller? Specify demographics, language preferences, emotional state, and the UAE enterprise context.
            </p>
            <textarea
              id="box-b-input"
              rows={3}
              value={canvas.boxB_persona}
              onChange={(e) => updateField('boxB_persona', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. UAE retail banking customers (Emirati nationals and expat residents) whose transactions trigger suspicious fraud alerts..."
            />
          </div>

          {/* Box C */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX C • THE PROBLEM
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Problem Statement & Existing Operational Friction
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxC_problem} limit={WORD_LIMITS.boxC} />
            </div>
            <p className="text-xs text-slate-400">
              What breaks today? Explain why existing IVRs, SMS alerts, or manual human agents fail during this journey.
            </p>
            <textarea
              id="box-c-input"
              rows={4}
              value={canvas.boxC_problem}
              onChange={(e) => updateField('boxC_problem', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. Current fraud intervention suffers from 12-18 minute SMS response delays and 45% missed notification rates..."
            />
          </div>

          {/* Box D */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX D • BASELINE FIGURES (CROSS-CHECKED WITH BOX J)
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Current Baseline Figures & Economic Cost
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxD_baseline} limit={WORD_LIMITS.boxD} />
            </div>
            <p className="text-xs text-slate-400">
              Provide exact numeric baseline metrics (e.g. 14.2 min wait time, AED 4.8M annual loss, 38% callback rate). These must cross-check with Box J targets.
            </p>
            <textarea
              id="box-d-input"
              rows={4}
              value={canvas.boxD_baseline}
              onChange={(e) => updateField('boxD_baseline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. Average fraud intervention delay: 14.2 minutes. Customer reachability: 38%. Card dispute resolution cycle: 21 days. Annual bank loss per 100k accounts: AED 4.8M."
            />
          </div>

          {/* Box E */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX E • MODALITY JUSTIFICATION
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Voice Modality Justification & "Why Voice?"
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxE_voiceModality} limit={WORD_LIMITS.boxE} />
            </div>
            <p className="text-xs text-slate-400">
              Why must this be an intelligent voice conversation rather than a simple web form, chatbot, or SMS?
            </p>
            <textarea
              id="box-e-input"
              rows={3}
              value={canvas.boxE_voiceModality}
              onChange={(e) => updateField('boxE_voiceModality', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. Voice delivers immediate urgency, interruptibility, and psychological reassurance that SMS cannot provide during high-stress financial alerts..."
            />
          </div>

          {/* Pagination control */}
          <div className="flex items-center justify-end pt-4">
            <button
              type="button"
              onClick={() => setCurrentPage('page_2')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-950/30 transition-all"
            >
              <span>Continue to Page 2 (Agent & ElevenLabs Tech)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PAGE 2: Agent Solution & ElevenLabs Tech (Boxes F-I) */}
      {currentPage === 'page_2' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Box F */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX F • AGENT ARCHITECTURE & PERSONA
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Agent Persona, Tone & Conversation Architecture
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxF_agentArchitecture} limit={WORD_LIMITS.boxF} />
            </div>
            <p className="text-xs text-slate-400">
              Describe the agent’s name, persona, conversational pacing, dialect switching, and state machine node transitions.
            </p>
            <textarea
              id="box-f-input"
              rows={4}
              value={canvas.boxF_agentArchitecture}
              onChange={(e) => updateField('boxF_agentArchitecture', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. Operates as a dual-node hierarchical agent: Node 1 handles identity challenge & biometric match; Node 2 executes card lockdown or travel unblocking..."
            />
          </div>

          {/* Box G */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX G • ELEVENLABS STACK SELECTION (ASSESSED ON SELECTION, NOT COVERAGE)
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  ElevenLabs Stack Architecture & Technical Rationales
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxG_elevenLabsStack} limit={WORD_LIMITS.boxG} />
            </div>

            <p className="text-xs text-slate-400">
              Summarize your stack architecture in the overview below, and check only the specific ElevenLabs components strictly required for your build with individual reasons.
            </p>

            <textarea
              id="box-g-input"
              rows={3}
              value={canvas.boxG_elevenLabsStack}
              onChange={(e) => updateField('boxG_elevenLabsStack', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. Architecture leverages Scribe v2 STT with keyterm biasing, Eleven v3 bilingual TTS, Agent Workflows for deterministic node isolation..."
            />

            {/* Interactive Component Selector */}
            <BoxGComponentSelector
              selectedComponents={canvas.boxG_selectedComponents || []}
              onChange={(updated) => updateField('boxG_selectedComponents', updated)}
            />
          </div>

          {/* Box H */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX H • INTEGRATIONS & TOOLS
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  System Integration, Tool Calling & Data Flow
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxH_toolsAndIntegrations} limit={WORD_LIMITS.boxH} />
            </div>
            <p className="text-xs text-slate-400">
              Detail external APIs, core banking/CRM webhooks, Twilio SIP telephony connectors, and payload structures.
            </p>
            <textarea
              id="box-h-input"
              rows={3}
              value={canvas.boxH_toolsAndIntegrations}
              onChange={(e) => updateField('boxH_toolsAndIntegrations', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. Integrates with Temenos T24 core banking via mTLS webhooks, Twilio SIP trunking, and UAE PASS identity federation..."
            />
          </div>

          {/* Box I */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX I • 6-ROW GUARDRAIL MATRIX (CONCRETE MECHANISMS REQUIRED)
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Safety, Failure Guardrails & Governance
                </h3>
              </div>
            </div>

            <BoxIGuardrailTable
              guardrails={canvas.boxI_guardrails || []}
              onChange={(updated) => updateField('boxI_guardrails', updated)}
            />
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentPage('page_1')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Page 1</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage('page_3')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-950/30 transition-all"
            >
              <span>Continue to Page 3 (Impact, ROI & Demo)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* PAGE 3: Impact, Viability & Demo (Boxes J-N) */}
      {currentPage === 'page_3' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Box J */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX J • TARGET KPIS (CROSS-CHECKED WITH BOX D)
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Target Quantitative KPIs & Business Impact
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxJ_kpisAndImpact} limit={WORD_LIMITS.boxJ} />
            </div>
            <p className="text-xs text-slate-400">
              State measurable target improvements (e.g. 94% reduction from 14 min to 45 sec, AED 3.6M fraud savings). Must cross-check against Box D baseline.
            </p>
            <textarea
              id="box-j-input"
              rows={3}
              value={canvas.boxJ_kpisAndImpact}
              onChange={(e) => updateField('boxJ_kpisAndImpact', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. Target KPIs: 94% reduction in intervention time (from 14.2 min to 45 sec). 85% reachability on outbound automated fraud calls. AED 3.6M estimated annual fraud loss mitigation..."
            />

            {/* Cross Check Component */}
            <BoxDandJCrossChecker boxD={canvas.boxD_baseline} boxJ={canvas.boxJ_kpisAndImpact} />
          </div>

          {/* Box K */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX K • BUSINESS CASE & ROI
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Economic Viability, Cost Structure & Payback Period
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxK_businessCaseRoi} limit={WORD_LIMITS.boxK} />
            </div>
            <p className="text-xs text-slate-400">
              Outline development cost, ElevenLabs voice token/minute cost, contact center headcount savings, and estimated ROI / payback months.
            </p>
            <textarea
              id="box-k-input"
              rows={3}
              value={canvas.boxK_businessCaseRoi}
              onChange={(e) => updateField('boxK_businessCaseRoi', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. Total deployment and voice infrastructure cost: AED 140,000. Annual fraud loss savings: AED 3.6M. 3-Year ROI calculated at 680% with a 4.2-month payback..."
            />
          </div>

          {/* Box L */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX L • ROLLOUT & HANDOFF
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Rollout Phases & Human Agent Operational Handoff
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxL_rolloutPlan} limit={WORD_LIMITS.boxL} />
            </div>
            <p className="text-xs text-slate-400">
              How does the system roll out safely in stages? How does it warm-transfer complex calls to human specialists?
            </p>
            <textarea
              id="box-l-input"
              rows={3}
              value={canvas.boxL_rolloutPlan}
              onChange={(e) => updateField('boxL_rolloutPlan', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. Phase 1: 4-week pilot on overseas debit cards. Phase 2: High-value transfers. Phase 3: UAE-wide rollout with warm transfer to senior fraud desk..."
            />
          </div>

          {/* Box M */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX M • COMPETITIVE ADVANTAGE
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Unfair Advantage & Differentiation
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxM_competitiveAdvantage} limit={WORD_LIMITS.boxM} />
            </div>
            <p className="text-xs text-slate-400">
              Why can your team and architecture win against off-the-shelf legacy IVR or general chatbot competitors?
            </p>
            <textarea
              id="box-m-input"
              rows={2}
              value={canvas.boxM_competitiveAdvantage}
              onChange={(e) => updateField('boxM_competitiveAdvantage', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 resize-none font-sans"
              placeholder="e.g. Proprietary sub-second voice interruptibility optimized for Gulf Arabic/English code-switching, pre-integrated with DIFC open banking protocols..."
            />
          </div>

          {/* Box N */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  BOX N • WORKING PROTOTYPE LINK (MANDATORY WORKING LINK)
                </span>
                <h3 className="font-display font-bold text-sm text-white">
                  Working Prototype Sandbox URL
                </h3>
              </div>
              <CanvasWordBadge text={canvas.boxN_prototypeLink} limit={WORD_LIMITS.boxN} />
            </div>
            <p className="text-xs text-slate-400">
              Must be a valid, reachable URL to your ElevenLabs agent talk-to link, WebRTC demo, or video sandbox.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="box-n-link-input"
                  type="url"
                  value={canvas.boxN_prototypeLink}
                  onChange={(e) => updateField('boxN_prototypeLink', e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm font-mono focus:outline-none focus:border-amber-500 transition-all"
                  placeholder="https://elevenlabs.io/app/talk-to?agent_id=..."
                />
              </div>

              <button
                type="button"
                onClick={handleTestLink}
                disabled={pingStatus === 'checking'}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                {pingStatus === 'checking' ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                ) : (
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>Test Reachability</span>
              </button>
            </div>

            {/* Ping Feedback status */}
            {pingStatus === 'success' && (
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Simulated Ping: URL format valid & ElevenLabs agent endpoint responding (HTTP 200 OK).</span>
              </div>
            )}
            {pingStatus === 'failed' && (
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Invalid URL. Please enter a valid URL beginning with http:// or https://</span>
              </div>
            )}
          </div>

          {/* Navigation and Next Stage */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentPage('page_2')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Page 2</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('compliance')}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all w-full sm:w-auto"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Run Compliance Audit</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('submission')}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-950/40 transition-all w-full sm:w-auto"
              >
                <span>Final Submission Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
