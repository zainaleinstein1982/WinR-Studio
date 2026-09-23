import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Download,
  Printer,
  FileText
} from 'lucide-react';
import { JudgeScore, UserProfile, IdeaCanvasData } from '../../types';
import { Storage } from '../../utils/storage';

interface JudgeScorecardProps {
  user: UserProfile;
  canvas: IdeaCanvasData;
}

export const JudgeScorecard: React.FC<JudgeScorecardProps> = ({ user, canvas }) => {
  const [scoreData, setScoreData] = useState<JudgeScore>(() => Storage.getJudgeScore());
  const [savedToast, setSavedToast] = useState(false);

  const totalScore = scoreData.opportunityScore + scoreData.agentScore + scoreData.caseScore;

  const handleSave = () => {
    Storage.saveJudgeScore(scoreData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const getVerdict = (score: number) => {
    if (score >= 90) return { label: 'Top-Tier Finalist (Stage 2 Gold)', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    if (score >= 75) return { label: 'Shortlist Candidate (Pass)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    return { label: 'Requires Revision', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
  };

  const verdict = getVerdict(totalScore);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Official Evaluation Rubric
              </span>
              <span className="text-xs font-mono text-slate-400">
                100-Point Weighted Scoring Framework
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Admin & Venture Judge Scorecard
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Evaluates startup proposals across Market Opportunity (35%), Voice Agent Technical Architecture (35%), and Economic Business Case (30%).
            </p>
          </div>

          {/* Grand Score Display */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-5 shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Total Score
              </span>
              <span className="font-display font-black text-3xl text-amber-400">
                {totalScore} <span className="text-sm font-normal text-slate-500">/ 100</span>
              </span>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Stage 1 Verdict
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md border inline-block mt-1 ${verdict.color}`}>
                {verdict.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Criteria Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Criterion 1: Opportunity */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              CRITERION 1 • 35% WEIGHT
            </span>
            <span className="font-mono text-base font-extrabold text-blue-400">
              {scoreData.opportunityScore}/35
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-base text-white">
              Opportunity & Strategic Fit
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Alignment with Dubai economy, clarity of friction in Box C, and justification of voice modality in Box E.
            </p>
          </div>

          <input
            type="range"
            min="0"
            max="35"
            value={scoreData.opportunityScore}
            onChange={(e) => setScoreData({ ...scoreData, opportunityScore: parseInt(e.target.value) })}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        {/* Criterion 2: Agent Architecture */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              CRITERION 2 • 35% WEIGHT
            </span>
            <span className="font-mono text-base font-extrabold text-amber-400">
              {scoreData.agentScore}/35
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-base text-white">
              Agent Tech & Box I Guardrails
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              ElevenLabs stack curation in Box G, concrete software mechanisms in Box I, and tool scoping in Box H.
            </p>
          </div>

          <input
            type="range"
            min="0"
            max="35"
            value={scoreData.agentScore}
            onChange={(e) => setScoreData({ ...scoreData, agentScore: parseInt(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Criterion 3: Business Case & Feasibility */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              CRITERION 3 • 30% WEIGHT
            </span>
            <span className="font-mono text-base font-extrabold text-emerald-400">
              {scoreData.caseScore}/30
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-base text-white">
              Business Case, ROI & Feasibility
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Cross-check alignment between Box D & J, ROI calculation in Box K, and operational rollout in Box L.
            </p>
          </div>

          <input
            type="range"
            min="0"
            max="30"
            value={scoreData.caseScore}
            onChange={(e) => setScoreData({ ...scoreData, caseScore: parseInt(e.target.value) })}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Written Evaluation Notes */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Judges' Qualitative Evaluation & Strengths</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Identified Core Strengths
            </label>
            <textarea
              rows={3}
              value={scoreData.strengths}
              onChange={(e) => setScoreData({ ...scoreData, strengths: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Recommended Revisions for Stage 2
            </label>
            <textarea
              rows={3}
              value={scoreData.improvements}
              onChange={(e) => setScoreData({ ...scoreData, improvements: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            General Feedback & Overall Comments
          </label>
          <textarea
            rows={2}
            value={scoreData.feedbackNotes}
            onChange={(e) => setScoreData({ ...scoreData, feedbackNotes: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 font-sans focus:outline-none focus:border-amber-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          {savedToast && (
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Scorecard updated!
            </span>
          )}
          {!savedToast && <div />}

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-950/40 transition-all"
          >
            Save Judge Score
          </button>
        </div>
      </div>
    </div>
  );
};
