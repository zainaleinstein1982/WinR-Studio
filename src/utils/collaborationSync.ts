import { TeamMember, ActivityEvent, TeamComment } from '../types/collaboration';

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'user-1',
    name: 'Zayed Al-Hashimi',
    role: 'Lead Architect',
    avatar: 'Z',
    color: '#f43f5e',
    status: 'online',
    currentViewing: 'Box D: Baseline & Friction',
    lastActive: 'Just now'
  },
  {
    id: 'user-2',
    name: 'Sara Al-Mansoor',
    role: 'Prompt Engineer',
    avatar: 'S',
    color: '#38bdf8',
    status: 'online',
    currentViewing: 'Box I: Guardrails Matrix',
    lastActive: '1m ago'
  },
  {
    id: 'user-3',
    name: 'Dr. Tariq Al-Nuaimi',
    role: 'Compliance Auditor',
    avatar: 'T',
    color: '#34d399',
    status: 'online',
    currentViewing: '16-Point Auditor',
    lastActive: '3m ago'
  },
  {
    id: 'user-4',
    name: 'Rashid Al-Kindi',
    role: 'Full-Stack Dev',
    avatar: 'R',
    color: '#fbbf24',
    status: 'idle',
    currentViewing: 'Stage 2 WebRTC Sandbox',
    lastActive: '12m ago'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityEvent[] = [
  {
    id: 'act-1',
    userId: 'user-1',
    userName: 'Zayed Al-Hashimi',
    userColor: '#f43f5e',
    action: 'updated quantitative metrics in',
    target: 'Box D & Box J (4,200 AED fraud baseline)',
    timestamp: '2 mins ago'
  },
  {
    id: 'act-2',
    userId: 'user-2',
    userName: 'Sara Al-Mansoor',
    userColor: '#38bdf8',
    action: 'validated software mechanism regex on',
    target: 'Box I Guardrails (PII tokenization)',
    timestamp: '5 mins ago'
  },
  {
    id: 'act-3',
    userId: 'user-3',
    userName: 'Dr. Tariq Al-Nuaimi',
    userColor: '#34d399',
    action: 'completed automated audit test',
    target: '16-Point Compliance Matrix (Score: 100%)',
    timestamp: '8 mins ago'
  },
  {
    id: 'act-4',
    userId: 'user-4',
    userName: 'Rashid Al-Kindi',
    userColor: '#fbbf24',
    action: 'tested WebRTC dialer in',
    target: 'Gulf Arabic (Emirati) Dialect Sandbox',
    timestamp: '15 mins ago'
  }
];

export const INITIAL_COMMENTS: TeamComment[] = [
  {
    id: 'cmt-1',
    authorId: 'user-3',
    authorName: 'Dr. Tariq Al-Nuaimi',
    authorRole: 'Compliance Auditor',
    authorColor: '#34d399',
    boxId: 'boxI',
    content: 'Ensure the PII filtering is documented as a deterministic regex proxy before the LLM prompt payload, complying with DIFC Data Protection Law.',
    timestamp: 'Today at 09:42 AM',
    resolved: true
  },
  {
    id: 'cmt-2',
    authorId: 'user-2',
    authorName: 'Sara Al-Mansoor',
    authorRole: 'Prompt Engineer',
    authorColor: '#38bdf8',
    boxId: 'boxG',
    content: 'Added ElevenLabs Conversational AI WebSocket streaming with low-latency TTS model to keep turn-taking under 450ms.',
    timestamp: 'Today at 10:15 AM',
    resolved: false
  },
  {
    id: 'cmt-3',
    authorId: 'user-1',
    authorName: 'Zayed Al-Hashimi',
    authorRole: 'Lead Architect',
    authorColor: '#f43f5e',
    boxId: 'boxN',
    content: 'Tested prototype endpoint on staging cluster. Verification check returned HTTP 200 OK with sub-second ping.',
    timestamp: 'Today at 11:04 AM',
    resolved: false
  }
];

// Broadcast channel for real-time inter-tab collaboration
class CollaborationBus {
  private channel: BroadcastChannel | null = null;
  private listeners: ((message: any) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('voicestudio_collab_bus');
      this.channel.onmessage = (event) => {
        this.listeners.forEach((fn) => fn(event.data));
      };
    }
  }

  public broadcast(type: string, payload: any) {
    if (this.channel) {
      this.channel.postMessage({ type, payload, timestamp: Date.now() });
    }
  }

  public subscribe(fn: (message: any) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }
}

export const collabBus = new CollaborationBus();
