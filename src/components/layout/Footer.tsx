import React from 'react';
import { Shield, Sparkles, Scale, ExternalLink, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: About */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                DXB
              </div>
              <span className="font-display font-bold text-white text-sm">
                Ignyte × ElevenLabs
              </span>
            </div>
            <p className="text-slate-400 text-[12px] leading-relaxed">
              Dubai’s premier voice AI startup challenge under the Dubai Digital Economy Mandate & DIFC Innovation Hub.
            </p>
            <div className="flex items-center gap-2 text-amber-400/90 text-[11px] font-medium">
              <Sparkles className="w-3 h-3" />
              <span>DIFC Grand Demo Day: 20 Oct 2026</span>
            </div>
          </div>

          {/* Col 2: Key Challenge Milestones */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Timeline Milestones
            </h4>
            <ul className="space-y-1.5 text-[12px]">
              <li className="text-slate-400 flex items-center justify-between">
                <span>Stage 1 Idea Canvas</span>
                <span className="text-amber-400 font-mono">23 Sep 2026</span>
              </li>
              <li className="text-slate-400 flex items-center justify-between">
                <span>Finalist Shortlist</span>
                <span className="text-slate-300 font-mono">28 Sep 2026</span>
              </li>
              <li className="text-slate-400 flex items-center justify-between">
                <span>Stage 2 Build Sprint</span>
                <span className="text-slate-300 font-mono">30 Sep - 14 Oct</span>
              </li>
              <li className="text-slate-400 flex items-center justify-between">
                <span>Grand Demo Day (Dubai)</span>
                <span className="text-amber-300 font-mono">20 Oct 2026</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Strict Rules Summary */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Compliance Mandates</span>
            </h4>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li>• Exactly one canvas & one use case per startup team</li>
              <li>• Strict word limits enforced across all 14 boxes A-N</li>
              <li>• Box D baseline figures must align with Box J KPIs</li>
              <li>• Box G evaluated on architectural selection & justification</li>
              <li>• Box I mandates concrete mechanisms, not statements of intent</li>
              <li>• Max 40MB total deliverable file size package</li>
            </ul>
          </div>

          {/* Col 4: Resources & Official Terms */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Official Resources
            </h4>
            <ul className="space-y-1.5 text-[12px]">
              <li>
                <a 
                  href="https://elevenlabs.io/docs/conversational-ai" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>ElevenLabs Conversational AI Docs</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://elevenlabs.io/terms-of-use" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>ElevenLabs Prohibited Use Policy</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-slate-400">
                  Ignyte Platform Dubai: <span className="text-amber-400 font-mono">DIFC Innovation Hub</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Ignyte Dubai × ElevenLabs Challenge. All rights reserved. Non-exclusive license granted for competition evaluation.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3 h-3 text-emerald-400" />
              Secure Client-Side Sandbox
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <Award className="w-3 h-3" />
              Dubai Digital Economy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
