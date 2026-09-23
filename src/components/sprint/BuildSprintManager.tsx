import React, { useState } from 'react';
import { 
  Zap, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Video, 
  Code, 
  Layers, 
  FileSpreadsheet, 
  Sparkles,
  ExternalLink,
  Trash2,
  PhoneCall,
  ShieldCheck,
  Download
} from 'lucide-react';
import { Stage2Deliverable, UserProfile } from '../../types';
import { MAX_FILE_SIZE_BYTES } from '../../data/competitionData';
import { VoiceAgentSandbox } from './VoiceAgentSandbox';

interface BuildSprintManagerProps {
  deliverables: Stage2Deliverable[];
  onChange: (updatedDeliverables: Stage2Deliverable[]) => void;
  user: UserProfile;
}

export const BuildSprintManager: React.FC<BuildSprintManagerProps> = ({
  deliverables,
  onChange,
  user
}) => {
  const [activeTab, setActiveTab] = useState<'deliverables' | 'simulator'>('deliverables');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const updateDeliverable = (id: string, updates: Partial<Stage2Deliverable>) => {
    const updated = deliverables.map((d) => (d.id === id ? { ...d, ...updates } : d));
    onChange(updated);
  };

  const handleFileUpload = (id: string, file: File) => {
    setUploadError(null);
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError(`File "${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Exceeds the strict 40MB competition limit!`);
      return;
    }

    updateDeliverable(id, {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      lastUpdated: new Date().toISOString(),
      status: 'complete'
    });
  };

  const removeFile = (id: string) => {
    updateDeliverable(id, {
      fileName: undefined,
      fileSize: undefined,
      fileType: undefined,
      lastUpdated: undefined,
      status: 'empty'
    });
  };

  const totalBytes = deliverables.reduce((sum, d) => sum + (d.fileSize || 0), 0);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
  const completedCount = deliverables.filter((d) => d.status === 'complete').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Sprint Header */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Stage 2 Build Sprint • 30 Sep – 14 Oct 2026
              </span>
              <span className="text-xs font-mono text-slate-400">
                Max 40MB Deliverable Bundle
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Stage 2 Build Sprint Manager
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Manage your callable agent URL, recorded walkthrough, testing pass rates (&gt;90%), transcripts, and architecture diagrams.
            </p>
          </div>

          {/* Sprint Readiness stats */}
          <div className="flex items-center gap-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Deliverables Ready
              </span>
              <span className="text-xl font-extrabold text-blue-400 font-display">
                {completedCount}/6 Complete
              </span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                Bundle Package Size
              </span>
              <span className={`text-sm font-bold font-mono ${
                totalBytes > MAX_FILE_SIZE_BYTES ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {totalMB} MB / 40 MB
              </span>
            </div>
          </div>
        </div>

        {/* Tab Toggle between Deliverable list & Live Sandbox */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('deliverables')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'deliverables'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-950/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sprint Deliverables Checklist (6)</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'simulator'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-950/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>Voice Agent Live Sandbox Simulator</span>
          </button>
        </div>
      </div>

      {/* Global upload error banner */}
      {uploadError && (
        <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError(null)} className="text-rose-400 font-bold text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* VIEW: LIVE VOICE AGENT SANDBOX SIMULATOR */}
      {activeTab === 'simulator' && <VoiceAgentSandbox user={user} />}

      {/* VIEW: DELIVERABLES CHECKLIST */}
      {activeTab === 'deliverables' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deliverables.map((item) => {
            const isDone = item.status === 'complete';

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl bg-slate-900 border transition-all flex flex-col justify-between space-y-4 ${
                  isDone ? 'border-slate-800' : 'border-slate-800/80 bg-slate-900/60'
                }`}
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                      DELIVERABLE #{item.id.toUpperCase()}
                    </span>
                    {isDone ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Complete
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                        Pending
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-sm text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Input Controls according to type */}
                <div className="space-y-3">
                  {/* Type: URL */}
                  {item.type === 'url' && (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Public URL / Endpoint Link *
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={item.value || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateDeliverable(item.id, {
                              value: val,
                              status: val.trim().length > 8 ? 'complete' : 'empty'
                            });
                          }}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                        />
                        {item.value && (
                          <a
                            href={item.value}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                            title="Open Link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Type: Text/Metrics (e.g. Test Suite Pass Rates or README) */}
                  {item.type === 'text' && (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Content / Test Metrics *
                      </label>
                      <textarea
                        rows={3}
                        value={item.value || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateDeliverable(item.id, {
                            value: val,
                            status: val.trim().length > 10 ? 'complete' : 'empty'
                          });
                        }}
                        placeholder="Enter markdown notes, test suite results, pass rates..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>
                  )}

                  {/* Type: File (Transcripts or Architecture Diagram max 40MB) */}
                  {item.type === 'file' && (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Attachment File (Max 40MB) *
                      </label>

                      {item.fileName ? (
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                            <div className="truncate">
                              <p className="text-xs font-semibold text-slate-200 truncate">
                                {item.fileName}
                              </p>
                              <p className="text-[10px] text-slate-500 font-mono">
                                {((item.fileSize || 0) / 1024).toFixed(1)} KB • {item.fileType || 'Document'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(item.id)}
                            className="p-1.5 rounded text-rose-400 hover:bg-rose-950/40"
                            title="Remove file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/60 cursor-pointer transition-colors text-center">
                          <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                          <span className="text-xs font-medium text-slate-300">
                            Click to upload or drag & drop
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            JSON, PDF, PNG, MP4 (under 40MB)
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(item.id, file);
                            }}
                          />
                        </label>
                      )}
                    </div>
                  )}

                  {/* Optional Notes field */}
                  <div>
                    <input
                      type="text"
                      value={item.notes || ''}
                      onChange={(e) => updateDeliverable(item.id, { notes: e.target.value })}
                      placeholder="Optional notes for judges..."
                      className="w-full px-2.5 py-1 rounded bg-slate-950/40 border border-slate-800 text-[11px] text-slate-400 focus:outline-none focus:border-slate-700"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
