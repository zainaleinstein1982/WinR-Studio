import React, { useState, useEffect } from 'react';

// VoiceStudio Layout Components
import { VoiceStudioHeader } from './components/voicestudio/VoiceStudioHeader';
import { VoiceStudioHero } from './components/voicestudio/VoiceStudioHero';
import { VoiceStudioNavTabs, MainNavTab } from './components/voicestudio/VoiceStudioNavTabs';
import { VoiceGallery } from './components/voicestudio/VoiceGallery';
import { VoiceDesignStudio } from './components/voicestudio/VoiceDesignStudio';
import { LocalApiDocs } from './components/voicestudio/LocalApiDocs';

// Collaboration Components
import { LiveCollaborationPanel } from './components/collaboration/LiveCollaborationPanel';
import { InviteTeammateModal } from './components/collaboration/InviteTeammateModal';
import { TeamCommentsDrawer } from './components/collaboration/TeamCommentsDrawer';

// Challenge Views & Accomplishments
import { DashboardView } from './components/dashboard/DashboardView';
import { UseCaseExplorer } from './components/explorer/UseCaseExplorer';
import { CanvasBuilder } from './components/canvas/CanvasBuilder';
import { BuildSprintManager } from './components/sprint/BuildSprintManager';
import { ComplianceAuditor } from './components/compliance/ComplianceAuditor';
import { SubmissionPortal } from './components/submission/SubmissionPortal';
import { CommunityForum } from './components/forum/CommunityForum';
import { JudgeScorecard } from './components/judge/JudgeScorecard';
import { RegistrationModal } from './components/registration/RegistrationModal';
import { ExportModal } from './components/export/ExportModal';
import { DemoSimulationModal } from './components/demo/DemoSimulationModal';

// Top Header Views
import { ModelsView } from './components/views/ModelsView';
import { DocsView } from './components/views/DocsView';
import { CloudView } from './components/views/CloudView';
import { ProView } from './components/views/ProView';

// Win Audio / VoiceStudio 3-Sidebar Studio Components
import { LeftSidebar } from './components/studio/LeftSidebar';
import { CenterTTSWorkspace } from './components/studio/CenterTTSWorkspace';
import { RightSettingsSidebar } from './components/studio/RightSettingsSidebar';
import { VoiceCreatorModal } from './components/studio/VoiceCreatorModal';
import { UpgradeModal } from './components/studio/UpgradeModal';

// Types & Data
import { 
  UserProfile, 
  IdeaCanvasData, 
  Stage2Deliverable, 
  ComplianceReport, 
  UseCase 
} from './types';
import { 
  Voice, 
  TTSModel, 
  AudioSettings, 
  GenerationHistoryItem 
} from './types/studio';
import { 
  TeamMember, 
  ActivityEvent, 
  TeamComment 
} from './types/collaboration';
import { VOICES, TTS_MODELS } from './data/studioData';
import { 
  DEFAULT_TEAM_MEMBERS, 
  INITIAL_ACTIVITY_LOGS, 
  INITIAL_COMMENTS, 
  collabBus 
} from './utils/collaborationSync';
import { Storage } from './utils/storage';
import { runFullComplianceAudit } from './utils/validation';
import { synthesizeAudioBuffer, speakWithBrowserTts } from './utils/audioSynthesis';

import { 
  Layers, 
  FileText, 
  ShieldCheck, 
  Trophy, 
  Volume2, 
  PhoneCall, 
  Sparkles,
  ArrowRight,
  RefreshCw,
  FolderDown,
  UserCheck
} from 'lucide-react';

export function App() {
  // Navigation State
  const [activeTopLink, setActiveTopLink] = useState<string>('cloud');
  const [activeNavTab, setActiveNavTab] = useState<MainNavTab>('gallery');
  const [workflowSubView, setWorkflowSubView] = useState<'canvas' | 'sprint' | 'tts'>('canvas');
  const [challengeSubView, setChallengeSubView] = useState<'dashboard' | 'explorer' | 'compliance' | 'submission' | 'forum' | 'judge'>('dashboard');

  // Challenge Core State
  const [user, setUser] = useState<UserProfile>(() => Storage.getProfile());
  const [canvas, setCanvas] = useState<IdeaCanvasData>(() => Storage.getCanvas());
  const [deliverables, setDeliverables] = useState<Stage2Deliverable[]>(() => Storage.getStage2Deliverables());
  const [complianceReport, setComplianceReport] = useState<ComplianceReport>(() => 
    runFullComplianceAudit(Storage.getCanvas(), Storage.getStage2Deliverables(), Storage.getProfile())
  );

  // Collaboration State
  const [collaborators, setCollaborators] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('voicestudio_collaborators');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_TEAM_MEMBERS;
  });
  const [activityLogs, setActivityLogs] = useState<ActivityEvent[]>(() => {
    try {
      const saved = localStorage.getItem('voicestudio_activity');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ACTIVITY_LOGS;
  });
  const [comments, setComments] = useState<TeamComment[]>(() => {
    try {
      const saved = localStorage.getItem('voicestudio_comments');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_COMMENTS;
  });

  // Modals & Drawers
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCreateVoiceOpen, setIsCreateVoiceOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Voice Studio TTS State
  const [voices, setVoices] = useState<Voice[]>(() => {
    try {
      const saved = localStorage.getItem('win_audio_custom_voices');
      if (saved) {
        const customVoices: Voice[] = JSON.parse(saved);
        return [...VOICES, ...customVoices];
      }
    } catch {}
    return VOICES;
  });
  const [selectedVoice, setSelectedVoice] = useState<Voice>(() => VOICES[0]);
  const [selectedModel, setSelectedModel] = useState<TTSModel>(() => TTS_MODELS[0]);
  const [studioActiveProduct, setStudioActiveProduct] = useState<string>('tts');
  const [rightSidebarTab, setRightSidebarTab] = useState<'settings' | 'history'>('settings');
  const [settings, setSettings] = useState<AudioSettings>(() => {
    try {
      const saved = localStorage.getItem('win_audio_settings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      volume: 0,
      speed: 1.0,
      loudnessNormalization: true,
      textNormalization: true,
      tagCompatibleMode: true,
      stability: 75,
      similarity: 85,
      pitchOffset: 0
    };
  });
  const [history, setHistory] = useState<GenerationHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('win_audio_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [lastGeneratedAudio, setLastGeneratedAudio] = useState<{
    url: string;
    duration: number;
    text: string;
    voiceName: string;
  } | null>(null);
  const [playingHistoryId, setPlayingHistoryId] = useState<string | null>(null);

  // Multi-tab Real-Time Synchronization Listener
  useEffect(() => {
    const unsubscribe = collabBus.subscribe((msg) => {
      if (msg.type === 'CANVAS_UPDATED') {
        setCanvas(msg.payload);
      } else if (msg.type === 'DELIVERABLES_UPDATED') {
        setDeliverables(msg.payload);
      } else if (msg.type === 'COMMENT_ADDED') {
        setComments(prev => [msg.payload, ...prev]);
      } else if (msg.type === 'NEW_COLLABORATOR') {
        setCollaborators(prev => [...prev, msg.payload]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update compliance when canvas/deliverables change
  const handleCanvasChange = (updated: IdeaCanvasData) => {
    setCanvas(updated);
    Storage.saveCanvas(updated);
    setComplianceReport(runFullComplianceAudit(updated, deliverables, user));
    collabBus.broadcast('CANVAS_UPDATED', updated);

    // Record activity
    const newAct: ActivityEvent = {
      id: `act-${Date.now()}`,
      userId: 'user-1',
      userName: user.teamLeadName || 'Lead Architect',
      userColor: '#f43f5e',
      action: 'updated Idea Canvas parameters in',
      target: '14-Box Canvas',
      timestamp: 'Just now'
    };
    const updatedActs = [newAct, ...activityLogs.slice(0, 19)];
    setActivityLogs(updatedActs);
    localStorage.setItem('voicestudio_activity', JSON.stringify(updatedActs));
  };

  const handleDeliverablesChange = (updated: Stage2Deliverable[]) => {
    setDeliverables(updated);
    Storage.saveStage2Deliverables(updated);
    setComplianceReport(runFullComplianceAudit(canvas, updated, user));
    collabBus.broadcast('DELIVERABLES_UPDATED', updated);
  };

  const handleSaveProfile = (updated: UserProfile) => {
    setUser(updated);
    Storage.saveProfile(updated);
    setComplianceReport(runFullComplianceAudit(canvas, deliverables, updated));
  };

  const handleSelectUseCase = (uc: UseCase) => {
    const updatedUser: UserProfile = {
      ...user,
      track: uc.track,
      selectedUseCaseId: uc.id
    };
    setUser(updatedUser);
    Storage.saveProfile(updatedUser);

    const updatedCanvas: IdeaCanvasData = {
      ...canvas,
      boxA_title: `${uc.title} Voice Assistant`,
      boxC_problem: `[${uc.scope}] Addressing operational friction in ${uc.title}.`,
      boxE_voiceModality: uc.voiceOpportunity
    };
    handleCanvasChange(updatedCanvas);
  };

  const handleAddComment = (content: string, boxId?: string) => {
    const newCmt: TeamComment = {
      id: `cmt-${Date.now()}`,
      authorId: 'user-current',
      authorName: user.teamLeadName || 'Zayed Al-Hashimi',
      authorRole: 'Lead Architect',
      authorColor: '#f43f5e',
      boxId,
      content,
      timestamp: 'Just now',
      resolved: false
    };
    const updated = [newCmt, ...comments];
    setComments(updated);
    localStorage.setItem('voicestudio_comments', JSON.stringify(updated));
    collabBus.broadcast('COMMENT_ADDED', newCmt);
  };

  const handleAddCollaborator = (member: TeamMember) => {
    const updated = [...collaborators, member];
    setCollaborators(updated);
    localStorage.setItem('voicestudio_collaborators', JSON.stringify(updated));
    collabBus.broadcast('NEW_COLLABORATOR', member);
  };

  // Studio Audio Synthesize Handler
  const handleGenerate = async (text: string, voice: Voice): Promise<GenerationHistoryItem> => {
    const { audioUrl, duration } = await synthesizeAudioBuffer(text, voice, settings);
    speakWithBrowserTts(text, voice, settings);

    const tagMatches = text.match(/\[[^\]]+\]/g) || [];

    const newHistoryItem: GenerationHistoryItem = {
      id: `gen-${Date.now()}`,
      text,
      voiceId: voice.id,
      voiceName: voice.name,
      voiceAvatarColor: voice.avatarColor,
      modelId: selectedModel.id,
      modelName: selectedModel.name,
      timestamp: Date.now(),
      durationSeconds: duration,
      audioUrl,
      tagsUsed: tagMatches
    };

    const updatedHistory = [newHistoryItem, ...history.slice(0, 49)];
    setHistory(updatedHistory);
    localStorage.setItem('win_audio_history', JSON.stringify(updatedHistory));

    setLastGeneratedAudio({
      url: audioUrl,
      duration,
      text,
      voiceName: voice.name
    });

    return newHistoryItem;
  };

  const handlePlayHistory = (item: GenerationHistoryItem) => {
    if (playingHistoryId === item.id) {
      window.speechSynthesis?.cancel();
      setPlayingHistoryId(null);
      return;
    }

    setPlayingHistoryId(item.id);
    const voiceObj = voices.find(v => v.id === item.voiceId) || selectedVoice;
    speakWithBrowserTts(
      item.text,
      voiceObj,
      settings,
      () => setPlayingHistoryId(item.id),
      () => setPlayingHistoryId(null)
    );
  };

  const handleDeleteHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('win_audio_history', JSON.stringify(updated));
  };

  const handleLoadHistoryToEditor = (item: GenerationHistoryItem) => {
    const matchingVoice = voices.find(v => v.id === item.voiceId);
    if (matchingVoice) setSelectedVoice(matchingVoice);
    const matchingModel = TTS_MODELS.find(m => m.id === item.modelId);
    if (matchingModel) setSelectedModel(matchingModel);
    
    setLastGeneratedAudio({
      url: item.audioUrl || '',
      duration: item.durationSeconds,
      text: item.text,
      voiceName: item.voiceName
    });
  };

  const handleUpdateSettings = (updated: Partial<AudioSettings>) => {
    const newSettings = { ...settings, ...updated };
    setSettings(newSettings);
    localStorage.setItem('win_audio_settings', JSON.stringify(newSettings));
  };

  const handleAddCustomVoice = (newVoice: Voice) => {
    const updatedVoices = [...voices, newVoice];
    setVoices(updatedVoices);
    setSelectedVoice(newVoice);
    const customOnly = updatedVoices.filter(v => v.isCustom);
    localStorage.setItem('win_audio_custom_voices', JSON.stringify(customOnly));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* 1. VoiceStudio Header with Live Collaboration Status */}
      <VoiceStudioHeader
        activeTopLink={activeTopLink}
        setActiveTopLink={setActiveTopLink}
        collaborators={collaborators}
        onOpenInviteModal={() => setIsInviteModalOpen(true)}
        onOpenComments={() => setIsCommentsDrawerOpen(true)}
        onOpenDemoSimulation={() => setIsDemoModalOpen(true)}
        complianceScore={complianceReport.score}
      />

      {/* 2. VoiceStudio Hero Section (Obsidian background, Soundwave spectrum, 646 languages, OS selector, install command) */}
      <VoiceStudioHero
        onExploreChallenge={() => {
          setActiveNavTab('challenge');
          setChallengeSubView('dashboard');
        }}
      />

      {/* 3. Sub-Navigation Tabs Bar (Matching VoiceStudio horizontal subnav) */}
      <VoiceStudioNavTabs
        activeTab={activeNavTab}
        onChangeTab={(tab) => {
          setActiveNavTab(tab);
          setActiveTopLink('cloud');
        }}
        complianceScore={complianceReport.score}
        collaboratorsCount={collaborators.filter(c => c.status === 'online').length}
      />

      {/* 4. Dynamic Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* TOP HEADER VIEW 1: Models */}
        {activeTopLink === 'models' && (
          <ModelsView
            selectedModel={selectedModel}
            onSelectModel={(m) => {
              setSelectedModel(m);
              setActiveTopLink('cloud');
              setActiveNavTab('workflow');
              setWorkflowSubView('tts');
            }}
            onOpenGallery={() => {
              setActiveTopLink('cloud');
              setActiveNavTab('gallery');
            }}
            onOpenCanvas={() => {
              setActiveTopLink('cloud');
              setActiveNavTab('workflow');
              setWorkflowSubView('canvas');
            }}
          />
        )}

        {/* TOP HEADER VIEW 2: Docs */}
        {activeTopLink === 'docs' && (
          <DocsView />
        )}

        {/* TOP HEADER VIEW 3: Pro */}
        {activeTopLink === 'pro' && (
          <ProView
            onOpenUpgradeModal={() => setIsUpgradeOpen(true)}
            onExploreGallery={() => {
              setActiveTopLink('cloud');
              setActiveNavTab('gallery');
            }}
          />
        )}

        {/* TOP HEADER VIEW 4: Cloud (Default Workspace) */}
        {activeTopLink === 'cloud' && (
          <>
            {/* VIEW 1: Voice Gallery (Matching the bottom part of screenshot) */}
            {activeNavTab === 'gallery' && (
              <VoiceGallery
                onSelectVoiceForStudio={(v) => {
                  setSelectedVoice(v);
                  setActiveNavTab('workflow');
                  setWorkflowSubView('tts');
                }}
                onOpenVoiceDesign={() => setActiveNavTab('design')}
              />
            )}

        {/* VIEW 2: WorkflowStudio (14-Box Idea Canvas, Build Sprint, TTS Studio) */}
        {activeNavTab === 'workflow' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Subnav Pills for Workflow */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1f2330]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWorkflowSubView('canvas')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    workflowSubView === 'canvas'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
                      : 'bg-[#151824] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>14-Box Stage 1 Idea Canvas (Boxes A-N)</span>
                </button>

                <button
                  onClick={() => setWorkflowSubView('sprint')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    workflowSubView === 'sprint'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
                      : 'bg-[#151824] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Stage 2 Build Sprint Deliverables</span>
                </button>

                <button
                  onClick={() => setWorkflowSubView('tts')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    workflowSubView === 'tts'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
                      : 'bg-[#151824] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>TTS Synthesis Studio</span>
                </button>
              </div>

              <button
                onClick={() => setIsExportModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161924] hover:bg-[#1f2436] border border-slate-700 text-xs font-medium text-slate-200"
              >
                <FolderDown className="w-3.5 h-3.5 text-rose-400" />
                <span>Export Official Submission</span>
              </button>
            </div>

            {/* Workflow Subview Content */}
            {workflowSubView === 'canvas' && (
              <CanvasBuilder
                canvas={canvas}
                onChange={handleCanvasChange}
                user={user}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                setActiveTab={(tab) => {
                  if (tab === 'compliance') {
                    setActiveNavTab('challenge');
                    setChallengeSubView('compliance');
                  }
                }}
              />
            )}

            {workflowSubView === 'sprint' && (
              <BuildSprintManager
                deliverables={deliverables}
                onChange={handleDeliverablesChange}
                user={user}
              />
            )}

            {workflowSubView === 'tts' && (
              <div className="rounded-2xl border border-[#1e2333] overflow-hidden bg-[#0a1530]" style={{ height: '700px' }}>
                <div className="h-full flex flex-row overflow-hidden gap-2 p-2">
                  <div className="h-full rounded-xl overflow-hidden flex">
                    <LeftSidebar
                      activeProduct={studioActiveProduct}
                      onSelectProduct={(p) => setStudioActiveProduct(p)}
                      onOpenCreateVoice={() => setIsCreateVoiceOpen(true)}
                      onOpenUpgrade={() => setIsUpgradeOpen(true)}
                    />
                  </div>

                  <div className="h-full flex-1 rounded-xl overflow-hidden flex">
                    <CenterTTSWorkspace
                      voices={voices}
                      selectedVoice={selectedVoice}
                      onSelectVoice={setSelectedVoice}
                      selectedModel={selectedModel}
                      settings={settings}
                      onGenerate={handleGenerate}
                      onOpenCreateVoice={() => setIsCreateVoiceOpen(true)}
                      lastGeneratedAudio={lastGeneratedAudio}
                    />
                  </div>

                  <div className="h-full rounded-xl overflow-hidden flex">
                    <RightSettingsSidebar
                      activeTab={rightSidebarTab}
                      onTabChange={setRightSidebarTab}
                      voices={voices}
                      selectedVoice={selectedVoice}
                      onSelectVoice={setSelectedVoice}
                      models={TTS_MODELS}
                      selectedModel={selectedModel}
                      onSelectModel={setSelectedModel}
                      settings={settings}
                      onUpdateSettings={handleUpdateSettings}
                      history={history}
                      onPlayHistory={handlePlayHistory}
                      onDeleteHistory={handleDeleteHistory}
                      onLoadHistoryToEditor={handleLoadHistoryToEditor}
                      onOpenCreateVoice={() => setIsCreateVoiceOpen(true)}
                      playingHistoryId={playingHistoryId}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: Challenge Hub (Dashboard, 8 Tracks Explorer, 16-Pt Auditor, Submission Portal, Forum, Judge Scorecard) */}
        {activeNavTab === 'challenge' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Challenge Subnav Bar */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#1f2330]">
              {[
                { id: 'dashboard', label: 'Countdown & Readiness', icon: Trophy },
                { id: 'explorer', label: '8 Official Tracks Explorer', icon: Sparkles },
                { id: 'compliance', label: '16-Point Compliance Auditor', icon: ShieldCheck },
                { id: 'submission', label: 'Submission Portal & SHA-256 Seal', icon: FolderDown },
                { id: 'judge', label: 'Judge Scorecard Rubric', icon: UserCheck },
                { id: 'forum', label: 'Community Q&A Forum', icon: Layers }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = challengeSubView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setChallengeSubView(item.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-950/40'
                        : 'bg-[#141724] text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Subview Rendering */}
            {challengeSubView === 'dashboard' && (
              <DashboardView
                user={user}
                canvas={canvas}
                deliverables={deliverables}
                complianceReport={complianceReport}
                setActiveTab={(tab) => {
                  if (tab === 'canvas') {
                    setActiveNavTab('workflow');
                    setWorkflowSubView('canvas');
                  } else if (tab === 'sprint') {
                    setActiveNavTab('workflow');
                    setWorkflowSubView('sprint');
                  } else if (tab === 'explorer') {
                    setChallengeSubView('explorer');
                  } else if (tab === 'compliance') {
                    setChallengeSubView('compliance');
                  } else if (tab === 'submission') {
                    setChallengeSubView('submission');
                  }
                }}
                onOpenExportModal={() => setIsExportModalOpen(true)}
              />
            )}

            {challengeSubView === 'explorer' && (
              <UseCaseExplorer
                user={user}
                onSelectUseCase={handleSelectUseCase}
                onLoadTemplate={(uc) => {
                  handleSelectUseCase(uc);
                  setActiveNavTab('workflow');
                  setWorkflowSubView('canvas');
                }}
                setActiveTab={(tab) => {
                  if (tab === 'canvas') {
                    setActiveNavTab('workflow');
                    setWorkflowSubView('canvas');
                  }
                }}
              />
            )}

            {challengeSubView === 'compliance' && (
              <ComplianceAuditor
                report={complianceReport}
                canvas={canvas}
                deliverables={deliverables}
                user={user}
                setActiveTab={(tab) => {
                  if (tab === 'canvas') {
                    setActiveNavTab('workflow');
                    setWorkflowSubView('canvas');
                  } else if (tab === 'sprint') {
                    setActiveNavTab('workflow');
                    setWorkflowSubView('sprint');
                  }
                }}
                onRefreshAudit={() => setComplianceReport(runFullComplianceAudit(canvas, deliverables, user))}
              />
            )}

            {challengeSubView === 'submission' && (
              <SubmissionPortal
                canvas={canvas}
                deliverables={deliverables}
                user={user}
                complianceReport={complianceReport}
                onOpenExportModal={() => setIsExportModalOpen(true)}
                setActiveTab={(tab) => {
                  if (tab === 'canvas') {
                    setActiveNavTab('workflow');
                    setWorkflowSubView('canvas');
                  } else if (tab === 'compliance') {
                    setChallengeSubView('compliance');
                  }
                }}
              />
            )}

            {challengeSubView === 'judge' && (
              <JudgeScorecard
                user={user}
                canvas={canvas}
              />
            )}

            {challengeSubView === 'forum' && (
              <CommunityForum
                user={user}
              />
            )}
          </div>
        )}

        {/* VIEW 4: Telephony Sandbox (WebRTC Voice Agent Simulator) */}
        {activeNavTab === 'sandbox' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <BuildSprintManager
              deliverables={deliverables}
              onChange={handleDeliverablesChange}
              user={user}
            />
          </div>
        )}

        {/* VIEW 5: VoiceDesign (Custom Local Neural Voice Designer & Cloner) */}
        {activeNavTab === 'design' && (
          <VoiceDesignStudio
            onSaveVoice={handleAddCustomVoice}
            onNavigateToCanvas={() => {
              setActiveNavTab('workflow');
              setWorkflowSubView('canvas');
            }}
          />
        )}

        {/* VIEW 6: Live Collaboration Hub */}
        {activeNavTab === 'collab' && (
          <LiveCollaborationPanel
            collaborators={collaborators}
            activityLogs={activityLogs}
            comments={comments}
            onAddComment={handleAddComment}
            onOpenInviteModal={() => setIsInviteModalOpen(true)}
            onNavigateToBox={(boxId) => {
              setActiveNavTab('workflow');
              setWorkflowSubView('canvas');
            }}
          />
        )}

        {/* VIEW 7: Local API Documentation */}
        {activeNavTab === 'api' && <LocalApiDocs />}
          </>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <InviteTeammateModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onAddMember={handleAddCollaborator}
      />

      <TeamCommentsDrawer
        isOpen={isCommentsDrawerOpen}
        onClose={() => setIsCommentsDrawerOpen(false)}
        comments={comments}
        collaborators={collaborators}
        onAddComment={handleAddComment}
      />

      <RegistrationModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        canvas={canvas}
        deliverables={deliverables}
        user={user}
      />

      <VoiceCreatorModal
        isOpen={isCreateVoiceOpen}
        onClose={() => setIsCreateVoiceOpen(false)}
        onAddVoice={handleAddCustomVoice}
      />

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
      />

      <DemoSimulationModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigateTab={(tab, subView) => {
          setActiveNavTab(tab);
          if (tab === 'workflow' && subView) {
            setWorkflowSubView(subView);
          } else if (tab === 'challenge' && subView) {
            setChallengeSubView(subView);
          }
        }}
      />
    </div>
  );
}

export default App;
