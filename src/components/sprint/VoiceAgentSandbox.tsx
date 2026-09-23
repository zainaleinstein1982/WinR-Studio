import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  PhoneCall, 
  PhoneOff, 
  Volume2, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  MessageSquare,
  Globe,
  RefreshCw,
  Zap
} from 'lucide-react';
import { UserProfile } from '../../types';
import { USE_CASES } from '../../data/competitionData';

interface VoiceAgentSandboxProps {
  user: UserProfile;
}

interface MessageLog {
  sender: 'agent' | 'user' | 'system';
  text: string;
  time: string;
  dialect?: string;
  toolTriggered?: string;
}

interface ScenarioStep {
  sender: 'agent' | 'user' | 'system';
  text: string;
  delay: number;
  node?: string;
  tool?: string;
  dialect?: string;
}

export const VoiceAgentSandbox: React.FC<VoiceAgentSandboxProps> = ({ user }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [languageMode, setLanguageMode] = useState<'english' | 'arabic'>('english');
  const [currentNode, setCurrentNode] = useState<string>('Idle');
  const [messages, setMessages] = useState<MessageLog[]>([]);
  const [currentScenario, setCurrentScenario] = useState<'legitimate_unblock' | 'fraud_lockdown' | 'dialect_switch'>('legitimate_unblock');

  const selectedUseCase = USE_CASES.find(u => u.id === user.selectedUseCaseId) || USE_CASES[0];

  const SCENARIOS: Record<'legitimate_unblock' | 'fraud_lockdown' | 'dialect_switch', ScenarioStep[]> = {
    legitimate_unblock: [
      { sender: 'agent', text: 'Salam Alaykum Mr. Zayed, this is Amira from Dubai Digital Bank Security. We noticed a 4,200 AED charge in London. Did you attempt this transaction?', delay: 1000, node: 'Node 1: Identity Challenge', tool: 'verify_biometrics()' },
      { sender: 'user', text: 'Yes, I am currently travelling in London for a conference and made that hotel booking.', delay: 3500 },
      { sender: 'agent', text: 'Understood. I have authenticated your voice biometrics. I am authorizing London merchant terminal transactions and unblocking your travel allowance now.', delay: 6000, node: 'Node 2: Transaction Auth', tool: 'authorize_merchant(txn_4821)' },
      { sender: 'agent', text: 'All set! An SMS confirmation has been dispatched. Have a safe journey in the UK.', delay: 9000, node: 'Node 3: Complete', tool: 'dispatch_sms_receipt()' }
    ],
    fraud_lockdown: [
      { sender: 'agent', text: 'Urgent Security Notice from Dubai Digital Bank. A withdrawal of 8,500 AED was attempted in Istanbul on your debit card ending in 4102. Did you make this charge?', delay: 1000, node: 'Node 1: Urgent Triage', tool: 'query_anomaly_state()' },
      { sender: 'user', text: 'No! I am in Dubai right now. I never authorized that transaction!', delay: 3500 },
      { sender: 'agent', text: 'Understood. Freezing your debit card immediately to prevent further unauthorized attempts.', delay: 5500, node: 'Node 2: Instant Lockdown', tool: 'freeze_card(card_4102, "CONFIRMED_FRAUD")' },
      { sender: 'agent', text: 'Card locked within 180ms. Dispute ticket #DXB-9812 has been created and a replacement digital card has been provisioned to your Apple Wallet.', delay: 8500, node: 'Node 3: Dispute & Provision', tool: 'issue_instant_virtual_card()' }
    ],
    dialect_switch: [
      { sender: 'agent', text: 'Marhaba! Welcome to Dubai Customer Support. How can I assist your services today?', delay: 1000, node: 'Node 0: Greeting' },
      { sender: 'user', text: 'مرحبا، بغيت استفسر عن تجديد بطاقة الهوية الإماراتية (I want to ask about renewing my Emirates ID)', delay: 3500, dialect: 'Gulf Arabic' },
      { sender: 'agent', text: 'يا هلا بك! تقدر تجدد الهوية بكل سهولة عبر تطبيق دبي الآن أو زيارة مركز آمر. تبي ارسل لك رابط التقديم المباشر؟', delay: 6500, node: 'Node 1: Arabic Dialect Triage', tool: 'trigger_dubainow_sms()', dialect: 'Gulf Arabic (Emirati)' }
    ]
  };

  const startCall = () => {
    setIsCallActive(true);
    setMessages([]);
    setCurrentNode('Initializing WebRTC...');

    const scenarioSteps = SCENARIOS[currentScenario];
    
    scenarioSteps.forEach((step) => {
      setTimeout(() => {
        setIsCallActive((prev) => {
          if (!prev) return false;
          setCurrentNode(step.node || 'Active Dialogue');
          setMessages((m) => [
            ...m,
            {
              sender: step.sender,
              text: step.text,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              dialect: step.dialect,
              toolTriggered: step.tool
            }
          ]);
          return true;
        });
      }, step.delay);
    });
  };

  const endCall = () => {
    setIsCallActive(false);
    setCurrentNode('Call Ended (Latency: 280ms • Pass: 100%)');
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="font-display font-bold text-base text-white">
              ElevenLabs Voice Agent Live Sandbox Simulator
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Test real-time conversational flows, sub-second barge-in, Arabic code-switching, and tool-call assertions.
          </p>
        </div>

        {/* Scenario Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Test Scenario:</span>
          <select
            value={currentScenario}
            disabled={isCallActive}
            onChange={(e) => setCurrentScenario(e.target.value as unknown as 'legitimate_unblock' | 'fraud_lockdown' | 'dialect_switch')}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="legitimate_unblock">Legitimate Travel Unblock</option>
            <option value="fraud_lockdown">Fraud Lockdown & Instant Freeze</option>
            <option value="dialect_switch">Emirati Arabic Dialect Switch</option>
          </select>
        </div>
      </div>

      {/* Interactive Telephony Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Call Control & Waveform */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-between text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              {selectedUseCase.shortTag} AGENT
            </span>
            <h5 className="font-bold text-base text-slate-100">
              {isCallActive ? 'Call Connected (Scribe v2 Realtime)' : 'Agent Ready on Telephony'}
            </h5>
            <p className="text-xs text-slate-400 font-mono">
              State: <span className="text-amber-300 font-semibold">{currentNode}</span>
            </p>
          </div>

          {/* Audio Waveform visualization */}
          <div className="flex items-center justify-center gap-1.5 h-16 w-full px-4">
            {[40, 65, 25, 90, 45, 80, 100, 70, 30, 85, 50, 95, 35, 60].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-150 ${
                  isCallActive
                    ? 'bg-gradient-to-t from-amber-500 to-amber-300'
                    : 'bg-slate-800'
                }`}
                style={{
                  height: isCallActive ? `${Math.max(15, (h * (Math.sin(Date.now() / 200 + i) + 1.2)) % 100)}%` : '8px'
                }}
              />
            ))}
          </div>

          {/* Call / Hangup Buttons */}
          <div className="flex items-center gap-4">
            {!isCallActive ? (
              <button
                type="button"
                onClick={startCall}
                id="sandbox-start-call-btn"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all hover:scale-105"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Simulate Call</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full border transition-all ${
                    isMuted ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                  title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={endCall}
                  id="sandbox-end-call-btn"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/50 transition-all hover:scale-105"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Hang Up</span>
                </button>
              </>
            )}
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ElevenLabs WebSocket Audio 16kHz • Encrypted</span>
          </div>
        </div>

        {/* Right: Live Dialogue & Tool Stream */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              Live Conversation Transcripts & Webhooks
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {messages.length} events logged
            </span>
          </div>

          {/* Transcript Scroll Area */}
          <div className="space-y-3 min-h-[220px] max-h-[260px] overflow-y-auto pr-1 text-xs">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12">
                <Volume2 className="w-8 h-8 mb-2 opacity-30" />
                <p>Click "Simulate Call" to test the voice agent interaction.</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl space-y-1.5 transition-all ${
                    msg.sender === 'agent'
                      ? 'bg-slate-900 border border-slate-800 ml-4'
                      : 'bg-blue-950/40 border border-blue-500/30 mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className={`font-bold uppercase tracking-wider ${
                      msg.sender === 'agent' ? 'text-amber-400' : 'text-blue-400'
                    }`}>
                      {msg.sender === 'agent' ? 'ElevenLabs Voice Agent' : 'User / Caller'}
                    </span>
                    <span className="font-mono">{msg.time}</span>
                  </div>

                  <p className="text-slate-200 leading-relaxed font-sans">
                    {msg.text}
                  </p>

                  {/* Tool execution badge if any */}
                  {msg.toolTriggered && (
                    <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                      <Zap className="w-3 h-3 text-emerald-400" />
                      <span>Executed: {msg.toolTriggered}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Latency Target: &lt;300ms</span>
            <span className="text-emerald-400 font-semibold font-mono">Status: 99.4% Pass Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
