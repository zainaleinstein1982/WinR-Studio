export interface TeamMember {
  id: string;
  name: string;
  role: 'Lead Architect' | 'Prompt Engineer' | 'Compliance Auditor' | 'Full-Stack Dev' | 'Mentor';
  avatar: string;
  color: string;
  status: 'online' | 'idle' | 'offline';
  currentViewing?: string; // e.g., 'boxD_baseline', 'telephony_sandbox'
  lastActive: string;
}

export interface ActivityEvent {
  id: string;
  userId: string;
  userName: string;
  userColor: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface TeamComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorColor: string;
  boxId?: string;
  content: string;
  timestamp: string;
  resolved?: boolean;
}

export interface CollaborationRoom {
  roomId: string;
  roomName: string;
  passcode: string;
  connectedMembers: TeamMember[];
  isSyncing: boolean;
}
