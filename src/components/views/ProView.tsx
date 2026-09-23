import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Check, 
  Crown, 
  Rocket, 
  Headphones, 
  Cpu, 
  Globe2, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface ProViewProps {
  onOpenUpgradeModal: () => void;
  onExploreGallery: () => void;
}

export const ProView: React.FC<ProViewProps> = ({ onOpenUpgradeModal, onExploreGallery }) => {
  const [activatedPro, setActivatedPro] = useState(false);

  const handleActivateFreeProTrial = () => {
    setActivatedPro(true);
  };

  const plans = [
    {
      id: 'free',
      name: 'Community Open Source',
      price: '$0',
      period: 'forever free',
      badge: 'Current License',
      description: 'Standard local synthesis and full access to Ignyte challenge 14-box canvas builder.',
      features: [
        'Complete 14-Box Stage 1 Canvas workflow',
        '8 Official Tracks Explorer & guidelines',
        'Automated 16-Point Compliance Auditor',
        'WebRTC Telephony dialer sandbox',
        'SHA-256 Digital verification seal & JSON export'
      ],
      isPopular: false,
      cta: 'Active Plan',
      isCurrent: true
    },
    {
      id: 'pro',
      name: 'WinR Studio Pro',
      price: '$19',
      period: 'per month',
      badge: 'Hackathon Acceleration',
      description: 'Zero-latency dedicated inference, unlimited 1-second voice clones, and priority DIFC edge telephony routing.',
      features: [
        'Everything in Community Open Source',
        'Unlimited 1-second instant neural voice cloning',
        'Sub-100ms ultra low-latency streaming pipeline',
        'Dedicated Dubai Edge WebRTC SIP trunking',
        'Priority 24/7 technical mentor support'
      ],
      isPopular: true,
      cta: activatedPro ? 'Pro Active (Unlocked)' : 'Unlock Pro Studio Access',
      isCurrent: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise Sovereign',
      price: '$99',
      period: 'per team / month',
      badge: 'Enterprise Deployment',
      description: 'Dedicated on-premises deployment, air-gapped sovereign compliance, and custom fine-tuning.',
      features: [
        'Everything in WinR Studio Pro',
        'On-premise air-gapped container deployment',
        'Custom Emirati Arabic & Gulf dialect fine-tuning',
        'Dedicated SLA & sovereign data residency compliance',
        'Custom institutional branding & white-label reports'
      ],
      isPopular: false,
      cta: 'Contact Architecture Team',
      isCurrent: false
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171424] via-[#241a38] to-[#171424] border border-[#382855] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Pro & Enterprise Acceleration</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Elevate Your Voice Agents with WinR Pro
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Accelerate your hackathon prototype with sub-100ms dedicated edge inference, unlimited neural voice clones, and enterprise-grade regional telephony routing.
          </p>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                plan.isPopular
                  ? 'bg-[#18152e] border-rose-500 shadow-xl shadow-rose-950/40 ring-1 ring-rose-500/50'
                  : 'bg-[#101322] border-[#20273c]'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-l from-rose-500 to-pink-600 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-bl-xl shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                    {plan.badge}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {plan.name}
                  </h3>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {plan.description}
                </p>

                <div className="pt-3 border-t border-[#20273e] space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Features Included:</span>
                  <ul className="space-y-2">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#20273e]">
                {plan.id === 'free' ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-[#171d30] text-slate-400 text-xs font-bold cursor-default"
                  >
                    Current Plan
                  </button>
                ) : plan.id === 'pro' ? (
                  <button
                    onClick={handleActivateFreeProTrial}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                      activatedPro
                        ? 'bg-emerald-600 text-white shadow-emerald-950/50'
                        : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-rose-950/50'
                    }`}
                  >
                    {activatedPro ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                    <span>{plan.cta}</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenUpgradeModal}
                    className="w-full py-2.5 rounded-xl bg-[#1b2238] hover:bg-[#252f4e] text-slate-200 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
