import React from 'react';
import { 
  Layers, 
  Sparkles, 
  Mic2, 
  Code2, 
  Trophy, 
  PhoneCall, 
  Users, 
  ShieldCheck, 
  FileText,
  Volume2
} from 'lucide-react';

export type MainNavTab = 
  | 'workflow'
  | 'gallery'
  | 'design'
  | 'challenge'
  | 'sandbox'
  | 'collab'
  | 'api';

interface VoiceStudioNavTabsProps {
  activeTab: MainNavTab;
  onChangeTab: (tab: MainNavTab) => void;
  complianceScore: number;
  collaboratorsCount: number;
}

export const VoiceStudioNavTabs: React.FC<VoiceStudioNavTabsProps> = ({
  activeTab,
  onChangeTab,
  complianceScore,
  collaboratorsCount
}) => {
  const tabs = [
    {
      id: 'gallery' as MainNavTab,
      label: 'Voice Gallery',
      icon: Volume2,
      badge: '646 Langs'
    },
    {
      id: 'workflow' as MainNavTab,
      label: 'WorkflowStudio',
      icon: Layers,
      badge: '14-Box Canvas'
    },
    {
      id: 'challenge' as MainNavTab,
      label: 'Challenge Hub',
      icon: Trophy,
      badge: `${complianceScore}% Valid`
    },
    {
      id: 'sandbox' as MainNavTab,
      label: 'Telephony Sandbox',
      icon: PhoneCall,
      badge: 'WebRTC Live'
    },
    {
      id: 'design' as MainNavTab,
      label: 'VoiceDesign',
      icon: Mic2,
      badge: 'Local Cloning'
    },
    {
      id: 'collab' as MainNavTab,
      label: 'Live Collaboration',
      icon: Users,
      badge: `${collaboratorsCount} Active`
    },
    {
      id: 'api' as MainNavTab,
      label: 'Local API',
      icon: Code2,
      badge: 'v1.4'
    }
  ];

  return (
    <div className="w-full bg-[#0d0f17] border-b border-[#1f2330] select-none sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`subnav-${tab.id}`}
                onClick={() => onChangeTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#131622]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>

                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}

                {/* Bottom Active Red/Rose Bar matching screenshot */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 shadow-sm shadow-rose-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
