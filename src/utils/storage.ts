import { IdeaCanvasData, Stage2Deliverable, UserProfile, SubmissionRecord, ForumPost, JudgeScore } from '../types';
import { SAMPLE_DEFAULT_CANVAS, INITIAL_STAGE2_DELIVERABLES, INITIAL_FORUM_POSTS } from '../data/competitionData';

const STORAGE_KEYS = {
  PROFILE: 'ignyte_elevenlabs_user_profile',
  CANVAS: 'ignyte_elevenlabs_idea_canvas',
  STAGE2: 'ignyte_elevenlabs_stage2_deliverables',
  SUBMISSIONS: 'ignyte_elevenlabs_submissions',
  FORUM: 'ignyte_elevenlabs_forum_posts',
  JUDGE_SCORE: 'ignyte_elevenlabs_judge_score',
};

const DEFAULT_PROFILE: UserProfile = {
  ignyteId: 'IGNYTE-DXB-2026-8492',
  startupName: 'AegisVoice Technologies',
  teamLeadName: 'Zayed Al-Hashimi',
  leadEmail: 'zayed@aegisvoice.io',
  country: 'United Arab Emirates',
  track: 'track_1',
  selectedUseCaseId: 't1_fraud',
  registeredAt: '2026-09-15T10:00:00Z',
  acceptedRules: true,
  acceptedProhibitedUsePolicy: true,
};

const DEFAULT_JUDGE_SCORE: JudgeScore = {
  opportunityScore: 33, // out of 35
  agentScore: 34, // out of 35
  caseScore: 28, // out of 30
  feedbackNotes: 'Exceptional alignment with Dubai Digital Economy vision. Strong technical rigor in Box I guardrails with regex proxy filtering and deterministic verification state machine. Stage 2 automated testing pass rate is top tier.',
  strengths: 'Sub-second interruptibility architecture, native Gulf Arabic code-switching, robust PII tokenization.',
  improvements: 'Expand on cross-border GCC banking regulatory handoffs in Box L.'
};

export const Storage = {
  getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  getCanvas(): IdeaCanvasData {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CANVAS);
      return data ? JSON.parse(data) : SAMPLE_DEFAULT_CANVAS;
    } catch {
      return SAMPLE_DEFAULT_CANVAS;
    }
  },

  saveCanvas(canvas: IdeaCanvasData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CANVAS, JSON.stringify(canvas));
    } catch (e) {
      console.error('Failed to save canvas', e);
    }
  },

  getStage2Deliverables(): Stage2Deliverable[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STAGE2);
      return data ? JSON.parse(data) : INITIAL_STAGE2_DELIVERABLES;
    } catch {
      return INITIAL_STAGE2_DELIVERABLES;
    }
  },

  saveStage2Deliverables(deliverables: Stage2Deliverable[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STAGE2, JSON.stringify(deliverables));
    } catch (e) {
      console.error('Failed to save deliverables', e);
    }
  },

  getSubmissions(): SubmissionRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveSubmission(submission: SubmissionRecord): void {
    try {
      const list = this.getSubmissions();
      const existingIdx = list.findIndex(s => s.submissionId === submission.submissionId);
      if (existingIdx >= 0) {
        list[existingIdx] = submission;
      } else {
        list.unshift(submission);
      }
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save submission', e);
    }
  },

  getForumPosts(): ForumPost[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FORUM);
      return data ? JSON.parse(data) : INITIAL_FORUM_POSTS;
    } catch {
      return INITIAL_FORUM_POSTS;
    }
  },

  saveForumPosts(posts: ForumPost[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FORUM, JSON.stringify(posts));
    } catch (e) {
      console.error('Failed to save forum posts', e);
    }
  },

  getJudgeScore(): JudgeScore {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JUDGE_SCORE);
      return data ? JSON.parse(data) : DEFAULT_JUDGE_SCORE;
    } catch {
      return DEFAULT_JUDGE_SCORE;
    }
  },

  saveJudgeScore(score: JudgeScore): void {
    try {
      localStorage.setItem(STORAGE_KEYS.JUDGE_SCORE, JSON.stringify(score));
    } catch (e) {
      console.error('Failed to save judge score', e);
    }
  },

  exportFullBackup(): string {
    return JSON.stringify({
      version: '1.0',
      exportedAt: new Date().toISOString(),
      profile: this.getProfile(),
      canvas: this.getCanvas(),
      stage2: this.getStage2Deliverables(),
      submissions: this.getSubmissions(),
      judgeScore: this.getJudgeScore()
    }, null, 2);
  },

  importFullBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) this.saveProfile(parsed.profile);
      if (parsed.canvas) this.saveCanvas(parsed.canvas);
      if (parsed.stage2) this.saveStage2Deliverables(parsed.stage2);
      if (parsed.submissions) localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(parsed.submissions));
      if (parsed.judgeScore) this.saveJudgeScore(parsed.judgeScore);
      return true;
    } catch (e) {
      console.error('Failed to import backup', e);
      return false;
    }
  },

  loadTemplate(canvasData: IdeaCanvasData): void {
    this.saveCanvas(canvasData);
  }
};
