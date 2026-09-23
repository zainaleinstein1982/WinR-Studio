import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

export const LocalApiDocs: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const curlTts = `curl -X POST http://localhost:3000/api/tts \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Salam Alaykum, this is your WinR Studio local agent.",
    "voice_id": "amira_dubai",
    "speed": 1.0,
    "format": "wav"
  }'`;

  const pythonWs = `import asyncio
import websockets
import json

async def stream_audio():
    uri = "ws://localhost:3000/api/conversational-ai"
    async with websockets.connect(uri) as websocket:
        await websocket.send(json.dumps({
            "action": "start_session",
            "track": "track_1_banking_fraud",
            "dialect": "ar-AE"
        }))
        while True:
            response = await websocket.recv()
            print("Received voice chunk:", len(response))

asyncio.run(stream_audio())`;

  return (
    <div className="space-y-6 pt-6 animate-in fade-in duration-300">
      <div className="rounded-2xl bg-gradient-to-r from-[#11131c] via-[#1a141f] to-[#11131c] border border-[#262b3d] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              Local Developer Endpoints & WebSocket Server
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              WinR Studio Local API
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Integrate WinR Studio directly into your Python / Node.js agent pipeline with sub-millisecond local network loopback.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>http://localhost:3000 (Active)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Endpoint 1: REST TTS Generation */}
        <div className="rounded-2xl bg-[#0f1118] border border-[#1e2333] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold">
                POST
              </span>
              <span className="text-xs font-mono text-slate-200">/api/tts</span>
            </div>

            <button
              onClick={() => copyCode('curl', curlTts)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-[#181c28] border border-slate-700"
            >
              {copiedId === 'curl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedId === 'curl' ? 'Copied' : 'Copy cURL'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-[#07090e] border border-[#1a1e2b] text-xs font-mono text-rose-300 overflow-x-auto leading-relaxed">
            {curlTts}
          </pre>
        </div>

        {/* Endpoint 2: WebSocket Streaming */}
        <div className="rounded-2xl bg-[#0f1118] border border-[#1e2333] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold">
                WS
              </span>
              <span className="text-xs font-mono text-slate-200">/api/conversational-ai</span>
            </div>

            <button
              onClick={() => copyCode('ws', pythonWs)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-[#181c28] border border-slate-700"
            >
              {copiedId === 'ws' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedId === 'ws' ? 'Copied' : 'Copy Python'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-[#07090e] border border-[#1a1e2b] text-xs font-mono text-sky-300 overflow-x-auto leading-relaxed">
            {pythonWs}
          </pre>
        </div>
      </div>
    </div>
  );
};
