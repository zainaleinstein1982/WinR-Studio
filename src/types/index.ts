export type TrackType = 'track_1' | 'track_2';

export interface UseCase {
  id: string;
  track: TrackType;
  trackTitle: string;
  title: string;
  shortTag: string;
  scope: string;
  builtFor: string;
  description: string;
  problemSummary: string;
  voiceOpportunity: string;
  keyElevenLabsCapabilities: string[];
  suggestedKpis: string[];
  sampleConversationPrompt: string;
}

export interface ElevenLabsComponent {
  id: string;
  category: string;
  title: string;
  description: string;
  architecturalRole: string;
  bestPractice: string;
}

export interface GuardrailRow {
  riskType: string;
  failureScenario: string;
  mechanism: string; // Must be concrete mechanism, not statement of intent
  isMechanismValid?: boolean;
}

export interface BoxGSelection {
  componentId: string;
  justification: string;
}

export interface IdeaCanvasData {
  // Page 1: Strategic Fit & Problem (A-E)
  boxA_title: string; // max 50 words
  boxB_persona: string; // max 100 words
  boxC_problem: string; // max 200 words
  boxD_baseline: string; // max 200 words (cross-checked with J)
  boxE_voiceModality: string; // max 150 words

  // Page 2: Agent Solution & ElevenLabs Tech (F-I)
  boxF_agentArchitecture: string; // max 300 words
  boxG_elevenLabsStack: string; // max 300 words
  boxG_selectedComponents: BoxGSelection[];
  boxH_toolsAndIntegrations: string; // max 200 words
  boxI_guardrails: GuardrailRow[]; // max 400 words total across 6 rows
  boxI_additionalNotes?: string;

  // Page 3: Impact, Viability & Demo (J-N)
  boxJ_kpisAndImpact: string; // max 200 words (cross-checked with D)
  boxK_businessCaseRoi: string; // max 200 words
  boxL_rolloutPlan: string; // max 150 words
  boxM_competitiveAdvantage: string; // max 100 words
  boxN_prototypeLink: string; // max 50 words + valid URL
  boxN_linkStatus?: 'unchecked' | 'valid' | 'invalid' | 'checking';
}

export interface UserProfile {
  ignyteId: string;
  startupName: string;
  teamLeadName: string;
  leadEmail: string;
  country: string;
  track: TrackType;
  selectedUseCaseId: string;
  registeredAt: string;
  acceptedRules: boolean;
  acceptedProhibitedUsePolicy: boolean;
}

export interface Stage2Deliverable {
  id: string;
  title: string;
  type: 'url' | 'file' | 'text' | 'metrics';
  description: string;
  required: boolean;
  value?: string;
  fileName?: string;
  fileSize?: number; // bytes (max 40MB = 40 * 1024 * 1024)
  fileType?: string;
  lastUpdated?: string;
  status: 'empty' | 'complete' | 'warning';
  notes?: string;
}

export interface ComplianceIssue {
  id: string;
  boxOrRule: string;
  severity: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  recommendation: string;
  targetTab?: string;
}

export interface ComplianceReport {
  isFullyCompliant: boolean;
  score: number; // 0-100
  totalChecks: number;
  passedChecks: number;
  issues: ComplianceIssue[];
  checkedAt: string;
}

export interface SubmissionRecord {
  submissionId: string;
  ignyteId: string;
  startupName: string;
  track: TrackType;
  useCaseTitle: string;
  stage1CompletedAt?: string;
  stage2CompletedAt?: string;
  canvasData: IdeaCanvasData;
  stage2Deliverables: Stage2Deliverable[];
  complianceScore: number;
  digitalSeal: string;
  status: 'draft' | 'submitted_stage1' | 'submitted_stage2';
}

export interface ForumPost {
  id: string;
  track: TrackType | 'all';
  useCaseId?: string;
  authorName: string;
  authorStartup: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  likes: number;
  repliesCount: number;
}

export interface JudgeScore {
  opportunityScore: number; // Max 35
  agentScore: number; // Max 35
  caseScore: number; // Max 30
  feedbackNotes: string;
  strengths: string;
  improvements: string;
}
