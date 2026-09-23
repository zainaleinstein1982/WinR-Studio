import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Layers, 
  PhoneCall, 
  ShieldCheck, 
  Users, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Play, 
  ExternalLink, 
  X, 
  Globe2, 
  FileText, 
  Terminal,
  ArrowRight,
  Code2
} from 'lucide-react';
import { MainNavTab } from '../voicestudio/VoiceStudioNavTabs';

export type SimulationLanguage = 'en' | 'id';

interface DemoSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: MainNavTab, subView?: any) => void;
}

export const DemoSimulationModal: React.FC<DemoSimulationModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [lang, setLang] = useState<SimulationLanguage>('en');
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!isOpen) return null;

  const content = {
    en: {
      modalTitle: 'WinR Studio Interactive Demo & Simulation Guide',
      modalSubtitle: 'Step-by-step guided walkthrough of features, workflows, and competition submissions',
      progressLabel: 'Step',
      ofLabel: 'of',
      nextBtn: 'Next Step',
      prevBtn: 'Previous',
      finishBtn: 'Complete Tour & Start Exploring',
      jumpToFeature: 'Open Feature in WinR Studio',
      steps: [
        {
          id: 'overview',
          title: '1. Neural Voice Gallery & Local VoiceDesign',
          tag: 'Voice Engine',
          icon: Volume2,
          color: 'from-rose-500 to-pink-600',
          targetTab: 'gallery' as MainNavTab,
          summary: 'Explore 646+ language profiles, zero-latency local neural synthesis, and instant voice cloning.',
          keyPoints: [
            'Filter by category: Conversational, Narration, Advertisement, and Gulf Arabic Dialects (Emirati).',
            'Live audio spectrum visualizer responding directly to generated speech.',
            'VoiceDesign cloner allows 1-second microphone recording to create custom AI personas with warmth and stability tuning.'
          ],
          tip: 'Click "Play" on Amira Al-Dhaheri or The Storyteller in the gallery to test acoustic fidelity.'
        },
        {
          id: 'canvas',
          title: '2. 14-Box Stage 1 Idea Canvas Builder',
          tag: 'Stage 1 Ideation',
          icon: Layers,
          color: 'from-indigo-500 to-purple-600',
          targetTab: 'workflow' as MainNavTab,
          targetSubView: 'canvas',
          summary: 'A 3-page structured workflow covering Boxes A through N with real-time word limits and deep validation.',
          keyPoints: [
            'Box D & J Cross-Validation: Automatically compares baseline metrics with target KPIs for quantitative consistency.',
            'Box G Component Checklist: Select ElevenLabs modules (TTS, Voice Cloning, WebRTC Agent) with technical justification.',
            'Box I Guardrails Matrix: 6-row safety matrix enforcing concrete software mechanisms (regex, biometric auth, human escalation).',
            'Box N Sandbox Link Tester: Performs HTTP 200 reachability checks on prototype endpoints.'
          ],
          tip: 'Keep each box within the specified word count limits to maintain a 100% compliance score.'
        },
        {
          id: 'sandbox',
          title: '3. WebRTC Telephony Sandbox & Sprint Manager',
          tag: 'Stage 2 Prototyping',
          icon: PhoneCall,
          color: 'from-amber-500 to-orange-600',
          targetTab: 'sandbox' as MainNavTab,
          summary: 'Interactive voice agent dialer with Arabic/English dialect switching and sub-350ms latency monitoring.',
          keyPoints: [
            'Simulate live outbound/inbound phone calls with real-time waveform visualization.',
            'Bilingual switching between Gulf Arabic (ar-AE) and US English (en-US).',
            'Inspect tool-call execution logs and live network round-trip latency.',
            'Stage 2 Sprint Manager validates deliverables bundle size against the strict 40MB limit.'
          ],
          tip: 'Use the canned test prompts in the dialer (e.g., Fraud Verification) to see tool calls in action.'
        },
        {
          id: 'auditor',
          title: '4. Automated 16-Point Compliance Auditor',
          tag: 'Automated Audit',
          icon: ShieldCheck,
          color: 'from-emerald-500 to-teal-600',
          targetTab: 'challenge' as MainNavTab,
          targetSubView: 'compliance',
          summary: 'Real-time rule engine evaluating single-entry rules, word boundaries, and technical rigor.',
          keyPoints: [
            'Dynamic compliance score dial (0% to 100%) updating with every keystroke.',
            'Categorized audit checks: Structure (A-C), Baseline/KPI (D & J), Architecture (F-H), Safety (I), Prototype (K-N).',
            'Direct "Fix Now" quick-jump buttons that take you immediately to flagged boxes.'
          ],
          tip: 'A 100% compliance score is required to generate the official SHA-256 digital submission seal.'
        },
        {
          id: 'collab',
          title: '5. Real-Time Team Collaboration Suite',
          tag: 'Multi-User Sync',
          icon: Users,
          color: 'from-blue-500 to-cyan-600',
          targetTab: 'collab' as MainNavTab,
          summary: 'Collaborate with teammates via BroadcastChannel, live presence indicators, and box-anchored review comments.',
          keyPoints: [
            'Live presence avatars show team members actively editing canvas boxes.',
            'Real-time activity ticker logging metric updates, safety rule adjustments, and test calls.',
            'Box-anchored comment threads allow architects and auditors to leave precise peer reviews.',
            'Shareable session invite links with customizable roles (Lead Architect, Prompt Engineer, Auditor).'
          ],
          tip: 'Open WinR Studio in another browser tab to experience instant multi-tab synchronization.'
        },
        {
          id: 'submission',
          title: '6. Digital Verification Seal & Submission Export',
          tag: 'Official Export',
          icon: Award,
          color: 'from-rose-500 to-red-600',
          targetTab: 'challenge' as MainNavTab,
          targetSubView: 'submission',
          summary: 'Generate cryptographic SHA-256 verification seals and export formatted 3-page PDFs.',
          keyPoints: [
            'Cryptographic SHA-256 seal generator locks canvas state and attaches a verified GST timestamp.',
            'Print-to-PDF engine formats your 14-box canvas into an official 3-page submission package.',
            'JSON package export includes full metadata, deliverable links, and audit logs for the judges.'
          ],
          tip: 'Use "Print / Save PDF" to generate an executive-ready hardcopy submission for review.'
        }
      ]
    },
    id: {
      modalTitle: 'Panduan Simulasi & Demo Interaktif WinR Studio',
      modalSubtitle: 'Penjelasan langkah demi langkah fitur, alur kerja, dan pengiriman submisi kompetisi',
      progressLabel: 'Langkah',
      ofLabel: 'dari',
      nextBtn: 'Langkah Berikutnya',
      prevBtn: 'Sebelumnya',
      finishBtn: 'Selesaikan Tur & Mulai Eksplorasi',
      jumpToFeature: 'Buka Fitur Ini di WinR Studio',
      steps: [
        {
          id: 'overview',
          title: '1. Galeri Suara Neural & Kloning Suara Lokal',
          tag: 'Mesin Suara',
          icon: Volume2,
          color: 'from-rose-500 to-pink-600',
          targetTab: 'gallery' as MainNavTab,
          summary: 'Jelajahi 646+ profil bahasa, sintesis neural berlatensi nol, dan pembuatan kloning suara instan.',
          keyPoints: [
            'Filter kategori suara: Percakapan (*Conversational*), Narasi, Iklan, dan Dialek Arab Teluk (Emirat).',
            'Visualisasi spektrum audio *real-time* yang merespons langsung setiap kali suara diputar.',
            'Fitur VoiceDesign memungkinkan perekaman mikrofon 1 detik untuk membuat persona AI dengan pengaturan kehangatan dan stabilitas.'
          ],
          tip: 'Klik tombol "Play" pada model suara Amira Al-Dhaheri atau The Storyteller di galeri untuk menguji kualitas audio.'
        },
        {
          id: 'canvas',
          title: '2. Pembangun 14-Box Stage 1 Idea Canvas',
          tag: 'Ideasi Stage 1',
          icon: Layers,
          color: 'from-indigo-500 to-purple-600',
          targetTab: 'workflow' as MainNavTab,
          targetSubView: 'canvas',
          summary: 'Alur kerja 3 halaman terstruktur mencakup Boks A hingga N dengan penghitung kata dan validasi mendalam.',
          keyPoints: [
            'Validasi Silang Box D & J: Membandingkan metrik *baseline* dengan target KPI agar kuantitatif konsisten.',
            'Daftar Komponen Box G: Pilih modul ElevenLabs (TTS, Voice Cloning, Agen WebRTC) dengan justifikasi teknis.',
            'Matriks Keamanan Box I: 6 baris mitigasi risiko wajib menggunakan mekanisme perangkat lunak konkret (regex, biometrik, eskalasi manusia).',
            'Penguji Tautan Box N: Melakukan uji jangkauan HTTP 200 pada tautan endpoint prototipe.'
          ],
          tip: 'Pastikan jumlah kata pada setiap boks tetap berada di bawah batas maksimum untuk menjaga skor kepatuhan 100%.'
        },
        {
          id: 'sandbox',
          title: '3. WebRTC Telephony Sandbox & Sprint Manager',
          tag: 'Prototipe Stage 2',
          icon: PhoneCall,
          color: 'from-amber-500 to-orange-600',
          targetTab: 'sandbox' as MainNavTab,
          summary: 'Simulator dialer telepon agen suara interaktif dengan pengalihan dialek Arab/Inggris dan monitor latensi <350ms.',
          keyPoints: [
            'Simulasi panggilan suara masuk/keluar secara langsung dengan gelombang audio dinamis.',
            'Pengalihan bahasa dwibahasa antara Arab Teluk (*ar-AE*) dan Bahasa Inggris (*en-US*).',
            'Pantau log eksekusi pemanggilan fungsi (*tool-call*) dan latensi jaringan waktu nyata.',
            'Stage 2 Sprint Manager memastikan total ukuran berkas *bundle* tetap di bawah batas ketat 40MB.'
          ],
          tip: 'Gunakan perintah uji coba bawaan (seperti Verifikasi Penipuan) untuk melihat alur kerja fungsi secara nyata.'
        },
        {
          id: 'auditor',
          title: '4. Auditor Kepatuhan Otomatis 16-Poin',
          tag: 'Audit Otomatis',
          icon: ShieldCheck,
          color: 'from-emerald-500 to-teal-600',
          targetTab: 'challenge' as MainNavTab,
          targetSubView: 'compliance',
          summary: 'Mesin evaluasi aturan *real-time* yang memeriksa batas kata, aturan satu entri, dan kekuatan mekanisme teknis.',
          keyPoints: [
            'Indikator skor kepatuhan dinamis (0% hingga 100%) yang diperbarui pada setiap ketikan.',
            'Kategori pemeriksaan audit: Struktur (A-C), Baseline/KPI (D & J), Arsitektur (F-H), Keamanan (I), Prototipe (K-N).',
            'Tombol pintas "Perbaiki Sekarang" untuk langsung menuju ke boks kanvas yang memerlukan revisi.'
          ],
          tip: 'Skor kepatuhan 100% diperlukan untuk membuka segel digital verifikasi resmi SHA-256.'
        },
        {
          id: 'collab',
          title: '5. Ruang Kolaborasi Tim Real-Time',
          tag: 'Sinkronisasi Tim',
          icon: Users,
          color: 'from-blue-500 to-cyan-600',
          targetTab: 'collab' as MainNavTab,
          summary: 'Berkolaborasi bersama rekan tim melalui BroadcastChannel, presensi aktif, dan komentar langsung pada boks kanvas.',
          keyPoints: [
            'Avatar presensi aktif memperlihatkan boks kanvas mana yang sedang diedit oleh rekan tim.',
            'Log aktivitas waktu nyata mencatat pembaruan metrik, perubahan aturan keamanan, dan tes telepon.',
            'Utas komentar tersemat langsung pada nomor boks tertentu (Box D, Box G, Box I) untuk *peer review*.',
            'Tautan undangan sesi berbagi cepat dengan peran tim yang dapat disesuaikan.'
          ],
          tip: 'Buka WinR Studio di tab browser baru untuk merasakan sinkronisasi instan antar-tab.'
        },
        {
          id: 'submission',
          title: '6. Segel Digital SHA-256 & Ekspor Berkas',
          tag: 'Ekspor Resmi',
          icon: Award,
          color: 'from-rose-500 to-red-600',
          targetTab: 'challenge' as MainNavTab,
          targetSubView: 'submission',
          summary: 'Buat tanda tangan kriptografi SHA-256 resmi dan ekspor dokumen PDF 3 halaman berformat rapi.',
          keyPoints: [
            'Generator segel kriptografi SHA-256 mengunci isi kanvas dan menyematkan stempel waktu zona GST resmi.',
            'Format Print-to-PDF menyusun 14 boks kanvas menjadi dokumen submisi 3 halaman siap cetak.',
            'Ekspor paket JSON menyertakan metadata lengkap, tautan deliverables, dan log audit untuk juri.'
          ],
          tip: 'Gunakan fitur "Print / Save PDF" untuk menghasilkan dokumen submisi resmi bagi dewan juri.'
        }
      ]
    }
  };

  const currentContent = content[lang];
  const stepData = currentContent.steps[currentStep];
  const IconComponent = stepData.icon;

  const handleJumpToFeature = () => {
    onNavigateTab(stepData.targetTab, stepData.targetSubView);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-4xl bg-[#0f121d] border border-[#252a3d] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Language Selector */}
        <div className="px-6 py-5 bg-[#141824] border-b border-[#222738] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                {currentContent.modalTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {currentContent.modalSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Bilingual Switcher */}
            <div className="flex items-center bg-[#1d2233] p-0.5 rounded-lg border border-[#2c3349]">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                  lang === 'en'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
              <button
                onClick={() => setLang('id')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                  lang === 'id'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇮🇩</span>
                <span>Bahasa Indonesia</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f2438] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Navigation Pill Bar */}
        <div className="px-6 py-3 bg-[#0d101a] border-b border-[#1c2132] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {currentContent.steps.map((s, idx) => {
            const isCurrent = idx === currentStep;
            const isCompleted = idx < currentStep;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isCurrent
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                    : isCompleted
                    ? 'bg-[#181d2c] text-emerald-300 hover:bg-[#20273b]'
                    : 'bg-[#141826] text-slate-400 hover:text-slate-200'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {idx + 1}
                  </span>
                )}
                <span>{s.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Main Step Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Step Hero Box */}
          <div className="p-6 rounded-2xl bg-[#141827] border border-[#23293e] relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${stepData.color} opacity-10 rounded-full blur-3xl pointer-events-none`} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stepData.color} flex items-center justify-center text-white shadow-lg`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                    {currentContent.progressLabel} {currentStep + 1} {currentContent.ofLabel} {currentContent.steps.length}
                  </span>
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    {stepData.title}
                  </h4>
                </div>
              </div>

              {/* Direct Open Button */}
              <button
                onClick={handleJumpToFeature}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all cursor-pointer self-start sm:self-auto"
              >
                <span>{currentContent.jumpToFeature}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 font-normal leading-relaxed mb-4">
              {stepData.summary}
            </p>

            {/* Key Accomplishments / Points */}
            <div className="space-y-2.5 pt-2 border-t border-[#22293e]">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {lang === 'en' ? 'Core Capabilities & Requirements:' : 'Kapabilitas Utama & Ketentuan:'}
              </h5>
              <ul className="space-y-2">
                {stepData.keyPoints.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Tip Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#1c2235] border border-[#2b334e] flex items-center gap-3 text-xs text-amber-200">
              <span className="font-bold text-amber-400 uppercase tracking-wider shrink-0">
                {lang === 'en' ? '💡 Pro Tip:' : '💡 Tips Pintar:'}
              </span>
              <span>{stepData.tip}</span>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="px-6 py-4 bg-[#141824] border-t border-[#222738] flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#1e2335] hover:bg-[#282f47] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{currentContent.prevBtn}</span>
          </button>

          <div className="flex items-center gap-1.5">
            {currentContent.steps.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStep
                    ? 'w-6 bg-rose-500'
                    : 'w-1.5 bg-slate-700'
                }`}
              />
            ))}
          </div>

          {currentStep < currentContent.steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(currentContent.steps.length - 1, prev + 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors shadow-sm cursor-pointer"
            >
              <span>{currentContent.nextBtn}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentContent.finishBtn}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
