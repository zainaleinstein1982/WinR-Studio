export interface Voice {
  id: string;
  name: string;
  avatarColor: string;
  avatarImage?: string;
  gender: 'female' | 'male' | 'neutral';
  accent: string;
  category: string;
  description: string;
  sampleText: string;
  isCustom?: boolean;
}

export interface TTSModel {
  id: string;
  name: string;
  tag: string;
  tagType: 'stable' | 'fast' | 'pro' | 'experimental';
  description: string;
  languagesCount: number;
}

export interface AudioSettings {
  volume: number; // -10 to 10 (or 0)
  speed: number;  // 0.5 to 2.0 (default 1.0)
  loudnessNormalization: boolean;
  textNormalization: boolean;
  tagCompatibleMode: boolean;
  stability: number; // 0 - 100
  similarity: number; // 0 - 100
  pitchOffset: number; // -5 to +5
}

export interface SpeakerBlock {
  id: string;
  voiceId: string;
  text: string;
  selectedTag?: string;
}

export interface GenerationHistoryItem {
  id: string;
  text: string;
  voiceId: string;
  voiceName: string;
  voiceAvatarColor: string;
  modelId: string;
  modelName: string;
  timestamp: number;
  durationSeconds: number;
  audioUrl?: string;
  tagsUsed: string[];
}

export interface PresetCategory {
  id: string;
  label: string;
  description: string;
  sampleText: string;
  recommendedVoiceId: string;
}
