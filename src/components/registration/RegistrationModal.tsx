import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Building, 
  User, 
  Mail, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { UserProfile, TrackType } from '../../types';
import { USE_CASES } from '../../data/competitionData';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...user });
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
    }, 1200);
  };

  const currentTrackUseCases = USE_CASES.filter(u => u.track === formData.track);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="registration-modal-card"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                Participant Profile & Ignyte Account
              </h3>
              <p className="text-xs text-slate-400">
                Enforcing single-entry rule for the Ignyte × ElevenLabs Voice Challenge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Ignyte Account Badge */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Official Ignyte Challenges ID
              </span>
              <p className="font-mono text-sm font-semibold text-slate-200">
                {formData.ignyteId}
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <Lock className="w-3 h-3" />
              <span>1 Entry Locked</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Startup Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                Startup / Team Name *
              </label>
              <input
                type="text"
                required
                value={formData.startupName}
                onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                placeholder="e.g. AegisVoice Technologies"
              />
            </div>

            {/* Team Lead Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Lead Founder / Lead Name *
              </label>
              <input
                type="text"
                required
                value={formData.teamLeadName}
                onChange={(e) => setFormData({ ...formData, teamLeadName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                placeholder="e.g. Zayed Al-Hashimi"
              />
            </div>

            {/* Lead Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                Lead Contact Email *
              </label>
              <input
                type="email"
                required
                value={formData.leadEmail}
                onChange={(e) => setFormData({ ...formData, leadEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                placeholder="founder@startup.com"
              />
            </div>

            {/* Country / HQ */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                Country / DIFC Entity
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                placeholder="United Arab Emirates"
              />
            </div>
          </div>

          {/* Track Selection */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Competition Track (Select Exactly One) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData({ 
                    ...formData, 
                    track: 'track_1', 
                    selectedUseCaseId: 't1_fraud' 
                  });
                }}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  formData.track === 'track_1'
                    ? 'bg-blue-950/40 border-blue-500/80 text-white shadow-lg shadow-blue-950/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-blue-400">TRACK 1</span>
                  {formData.track === 'track_1' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                </div>
                <p className="font-semibold text-sm text-slate-200">Banking & Insurance</p>
                <p className="text-[11px] text-slate-400 mt-1">5 core use cases: Fraud, Collections, Pre-Auth, Support, Multilingual.</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({ 
                    ...formData, 
                    track: 'track_2', 
                    selectedUseCaseId: 't2_proactive_app' 
                  });
                }}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  formData.track === 'track_2'
                    ? 'bg-amber-950/40 border-amber-500/80 text-white shadow-lg shadow-amber-950/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-amber-400">TRACK 2</span>
                  {formData.track === 'track_2' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </div>
                <p className="font-semibold text-sm text-slate-200">Government Services</p>
                <p className="text-[11px] text-slate-400 mt-1">3 core use cases: Proactive Apps, Life-Events, Rights & Dispute Prevention.</p>
              </button>
            </div>
          </div>

          {/* Selected Use Case Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Specific Track Use Case Focus *
            </label>
            <select
              value={formData.selectedUseCaseId}
              onChange={(e) => setFormData({ ...formData, selectedUseCaseId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition-all"
            >
              {currentTrackUseCases.map((uc) => (
                <option key={uc.id} value={uc.id}>
                  {uc.title} ({uc.shortTag})
                </option>
              ))}
            </select>
          </div>

          {/* Mandatory Rule Checks */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.acceptedRules}
                onChange={(e) => setFormData({ ...formData, acceptedRules: e.target.checked })}
                className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-950"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                I understand the **Single-Entry Rule**: Each startup/team can submit exactly one Idea Canvas for one use case. No external private sharing is permitted.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.acceptedProhibitedUsePolicy}
                onChange={(e) => setFormData({ ...formData, acceptedProhibitedUsePolicy: e.target.checked })}
                className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-950"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                I agree to the **ElevenLabs Prohibited Use Policy** & safety rules (No non-consensual voice cloning, no spam robocalls, no production live deployments outside sandbox).
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-800">
            {successMsg && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile saved successfully!</span>
              </div>
            )}
            {!successMsg && <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="save-profile-submit-btn"
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-950/40 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
