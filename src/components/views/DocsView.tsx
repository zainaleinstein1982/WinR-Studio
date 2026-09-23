import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Layers, 
  PhoneCall, 
  ShieldCheck, 
  Code2, 
  Copy, 
  Check, 
  Search, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Cpu,
  FileText,
  Users
} from 'lucide-react';

export const DocsView: React.FC = () => {
  const [activeDocSection, setActiveDocSection] = useState<'quickstart' | 'canvas' | 'telephony' | 'compliance' | 'api' | 'collab'>('quickstart');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sections = [
    { id: 'quickstart', label: '1. Quickstart & Setup', icon: Terminal },
    { id: 'canvas', label: '2. 14-Box Canvas Guide', icon: Layers },
    { id: 'telephony', label: '3. WebRTC Telephony SDK', icon: PhoneCall },
    { id: 'compliance', label: '4. 16-Point Compliance Rules', icon: ShieldCheck },
    { id: 'api', label: '5. REST & WebSocket API', icon: Code2 },
    { id: 'collab', label: '6. Real-Time Collaboration', icon: Users }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121626] via-[#1a1f36] to-[#121626] border border-[#232a42] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Developer Documentation & Guidelines</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            WinR Studio Technical Documentation
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Comprehensive reference architecture, API endpoints, 14-box canvas completion instructions, and ElevenLabs conversational voice agent SDK guides.
          </p>
        </div>
      </div>

      {/* Main Docs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar Menu */}
        <div className="space-y-2">
          <div className="p-2 rounded-2xl bg-[#111524] border border-[#20263c] space-y-1">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeDocSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveDocSection(sec.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-950/40'
                      : 'text-slate-300 hover:text-white hover:bg-[#181d30]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{sec.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1a172c] to-[#121020] border border-[#302652] text-xs text-slate-300 space-y-2">
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
              Ignyte × ElevenLabs Hackathon
            </span>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Stage 1 Idea Canvas submission deadline is <strong>23 September 2026 23:59 GST</strong>.
            </p>
          </div>
        </div>

        {/* Right Content Pane */}
        <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-[#101422] border border-[#20273c] text-slate-300 space-y-6">
          {/* SECTION 1: QUICKSTART */}
          {activeDocSection === 'quickstart' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">1. Quickstart & Local Installation</h2>
                <p className="text-xs text-slate-400 mt-1">Get WinR Studio running locally with zero latency loopback.</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-200">Terminal Quick Install (One-Liner)</h3>
                <div className="p-4 rounded-xl bg-[#090b12] border border-[#1d2235] relative font-mono text-xs text-rose-300 flex items-center justify-between">
                  <code>irm https://winrstudio.sh/install | iex</code>
                  <button
                    onClick={() => handleCopy('irm https://winrstudio.sh/install | iex', 'install-1')}
                    className="p-1.5 rounded-lg bg-[#191e30] hover:bg-[#252c46] text-slate-300 hover:text-white"
                  >
                    {copiedIndex === 'install-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-200">Docker Run Container</h3>
                <div className="p-4 rounded-xl bg-[#090b12] border border-[#1d2235] relative font-mono text-xs text-sky-300 flex items-center justify-between">
                  <code>docker run -d -p 3000:3000 --gpus all winrstudio/engine:latest</code>
                  <button
                    onClick={() => handleCopy('docker run -d -p 3000:3000 --gpus all winrstudio/engine:latest', 'install-2')}
                    className="p-1.5 rounded-lg bg-[#191e30] hover:bg-[#252c46] text-slate-300 hover:text-white"
                  >
                    {copiedIndex === 'install-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#14192a] border border-[#232c48] text-xs space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider">Prerequisites:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>Node.js 18+ or Python 3.10+</li>
                  <li>Microphone permissions enabled for local voice cloning & telephony sandbox</li>
                  <li>Modern Web Browser (Chrome, Edge, Firefox, Safari) with WebRTC & Web Audio support</li>
                </ul>
              </div>
            </div>
          )}

          {/* SECTION 2: CANVAS */}
          {activeDocSection === 'canvas' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">2. 14-Box Stage 1 Idea Canvas Guide</h2>
                <p className="text-xs text-slate-400 mt-1">Official structuring rules for Boxes A through N.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#14192a] border border-[#232b45] space-y-2">
                  <span className="text-xs font-bold text-rose-400 uppercase">Page 1: Context & Baseline</span>
                  <p className="text-xs text-slate-400">
                    <strong>Boxes A–E:</strong> Problem statement, target user archetype, current workflow baseline, and quantitative baseline metrics (Box D).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#14192a] border border-[#232b45] space-y-2">
                  <span className="text-xs font-bold text-rose-400 uppercase">Page 2: Architecture & Safety</span>
                  <p className="text-xs text-slate-400">
                    <strong>Boxes F–I:</strong> ElevenLabs architectural components (Box G) and 6-row concrete software safety guardrails matrix (Box I).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-2">
                <span className="font-bold uppercase tracking-wider text-amber-400">Box D & Box J Cross-Validation Rule:</span>
                <p>
                  Judges require quantitative consistency between your baseline metrics in Box D (e.g., <em>"Average resolution: 14 mins, 42% abandonment"</em>) and target impact KPIs in Box J (e.g., <em>"Target: 90s resolution, &lt;5% abandonment"</em>).
                </p>
              </div>
            </div>
          )}

          {/* SECTION 3: TELEPHONY */}
          {activeDocSection === 'telephony' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">3. WebRTC Telephony SDK & Dialer</h2>
                <p className="text-xs text-slate-400 mt-1">Sub-second voice agents with Gulf Arabic & English dialect switching.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090b12] border border-[#1e2335] font-mono text-xs text-emerald-300 space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-[#1e2335] pb-2">
                  <span>telephony_agent.js</span>
                  <button
                    onClick={() => handleCopy(`const { ElevenLabsClient } = require('elevenlabs');
const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

const session = await client.conversationalAi.createSession({
  agentId: 'winr-telephony-agent-dxb',
  overrides: {
    language: 'ar-AE',
    latency_tier: 'ultra_low'
  }
});`, 'code-tel')}
                    className="p-1 rounded bg-[#191e30] text-slate-300 hover:text-white"
                  >
                    {copiedIndex === 'code-tel' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <pre className="overflow-x-auto text-slate-300">
{`const { ElevenLabsClient } = require('elevenlabs');
const client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });

const session = await client.conversationalAi.createSession({
  agentId: 'winr-telephony-agent-dxb',
  overrides: {
    language: 'ar-AE',
    latency_tier: 'ultra_low'
  }
});`}
                </pre>
              </div>
            </div>
          )}

          {/* SECTION 4: COMPLIANCE */}
          {activeDocSection === 'compliance' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">4. 16-Point Compliance Rules Matrix</h2>
                <p className="text-xs text-slate-400 mt-1">Automated validation criteria applied to every submission.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#14192a] border border-[#232c48] flex items-center justify-between">
                  <span>1. Single-Entry Limit & Track Selection</span>
                  <span className="text-emerald-400 font-bold font-mono">100% Validated</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14192a] border border-[#232c48] flex items-center justify-between">
                  <span>2. Word Count Boundaries (Boxes A–N)</span>
                  <span className="text-emerald-400 font-bold font-mono">Real-time Counter</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14192a] border border-[#232c48] flex items-center justify-between">
                  <span>3. Box I Software Mechanism Rigor (No Vague Statements)</span>
                  <span className="text-emerald-400 font-bold font-mono">6 Safety Rows</span>
                </div>
                <div className="p-3 rounded-xl bg-[#14192a] border border-[#232c48] flex items-center justify-between">
                  <span>4. Stage 2 Deliverables Size (&le; 40MB limit)</span>
                  <span className="text-emerald-400 font-bold font-mono">Strict Bundle Cap</span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: API */}
          {activeDocSection === 'api' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">5. REST & WebSocket API Specification</h2>
                <p className="text-xs text-slate-400 mt-1">Connect directly via local HTTP POST or WebSocket loopback.</p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300">POST /api/tts</span>
                <div className="p-4 rounded-xl bg-[#090b12] border border-[#1e2335] font-mono text-xs text-rose-300">
                  <pre className="overflow-x-auto">
{`curl -X POST http://localhost:3000/api/tts \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Salam Alaykum", "voice_id": "amira_dubai", "speed": 1.0}'`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: COLLABORATION */}
          {activeDocSection === 'collab' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">6. Real-Time Team Collaboration Suite</h2>
                <p className="text-xs text-slate-400 mt-1">BroadcastChannel synchronization and role management.</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                WinR Studio implements a zero-latency client-side bus using the browser <code>BroadcastChannel</code> standard. When multiple teammates open the same session room, canvas edits, comments, and activity events are broadcast instantly without requiring third-party cloud database overhead.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
