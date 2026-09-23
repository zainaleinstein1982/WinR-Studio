import { Voice, TTSModel, PresetCategory } from '../types/studio';

export const VOICES: Voice[] = [
  {
    id: 'verity',
    name: 'Verity',
    avatarColor: 'from-emerald-400 to-teal-500',
    gender: 'female',
    accent: 'American (Natural & Warm)',
    category: 'Expressive / Storytelling',
    description: 'Silky smooth, dynamic expressive range with natural breathiness and emotion.',
    sampleText: 'Welcome to the audio studio. Type your text with audio tags like [laughs] to turn it into life!'
  },
  {
    id: 'rachel',
    name: 'Rachel',
    avatarColor: 'from-purple-400 to-indigo-500',
    gender: 'female',
    accent: 'American (Calm & Clear)',
    category: 'Narration / Commercial',
    description: 'Clear, engaging, and friendly voice ideal for presentations and podcasts.',
    sampleText: 'In a world shaped by innovation, the voice remains our most authentic bridge.'
  },
  {
    id: 'adam',
    name: 'Adam',
    avatarColor: 'from-blue-500 to-indigo-600',
    gender: 'male',
    accent: 'American (Deep & Resonant)',
    category: 'Documentary / Trailer',
    description: 'Commanding baritone with crisp articulation and powerful presence.',
    sampleText: 'Beneath the ancient desert dunes lay secrets waiting thousands of years to be spoken.'
  },
  {
    id: 'amira',
    name: 'Amira',
    avatarColor: 'from-amber-400 to-orange-500',
    gender: 'female',
    accent: 'Middle Eastern / Gulf English',
    category: 'Customer Experience / Dual',
    description: 'Polite, empathetic, and fluent in both Gulf Arabic and English accents.',
    sampleText: 'Marhaba! I am Amira, ready to assist your digital journey with speed and care.'
  },
  {
    id: 'josh',
    name: 'Josh',
    avatarColor: 'from-rose-400 to-pink-500',
    gender: 'male',
    accent: 'British (Modern & Youthful)',
    category: 'Character / Dynamic',
    description: 'Lively, casual, and energetic tone with great comedic timing.',
    sampleText: 'Wait, did you really think that would work? [laughs] Let me show you how it is done!'
  },
  {
    id: 'bella',
    name: 'Bella',
    avatarColor: 'from-teal-400 to-cyan-500',
    gender: 'female',
    accent: 'Australian (Bright & Cheerful)',
    category: 'Educational / Children',
    description: 'Uplifting, warm, and highly engaging for storytelling and kids content.',
    sampleText: 'Look at the stars tonight! [excited] They are shining brighter than ever before!'
  },
  {
    id: 'tariq',
    name: 'Tariq',
    avatarColor: 'from-emerald-500 to-teal-700',
    gender: 'male',
    accent: 'Arabic / English Bilingual',
    category: 'Fintech & Enterprise',
    description: 'Authoritative, calm, and trustworthy voice tuned for high-stakes enterprise dialogues.',
    sampleText: 'Your transaction has been verified securely. Safe travels on your upcoming journey.'
  }
];

export const TTS_MODELS: TTSModel[] = [
  {
    id: 'win-s2-pro',
    name: 'Win Audio S2.1 Pro',
    tag: 'Stable',
    tagType: 'stable',
    description: 'Next-gen zero-shot multilingual voice synthesis with high emotional fidelity.',
    languagesCount: 32
  },
  {
    id: 'eleven-multilingual-v2',
    name: 'Eleven Multilingual v2',
    tag: 'Pro',
    tagType: 'pro',
    description: 'Industry-standard high-fidelity voice synthesis supporting rich cross-lingual nuances.',
    languagesCount: 29
  },
  {
    id: 'win-flash-v1',
    name: 'Win Audio Flash v1.2',
    tag: 'Fast',
    tagType: 'fast',
    description: 'Ultra-low latency streaming model optimized for interactive voice agents and telephony.',
    languagesCount: 16
  },
  {
    id: 'eleven-turbo-v2-5',
    name: 'Eleven Turbo v2.5',
    tag: 'Realtime',
    tagType: 'fast',
    description: 'Sub-180ms generation speed with enhanced audio tag compatibility.',
    languagesCount: 32
  }
];

export const PRESET_CATEGORIES: PresetCategory[] = [
  {
    id: 'character',
    label: 'Character voice',
    description: 'Rich emotional cues, laughter, dramatic sighs, and playful pacing.',
    sampleText: 'Hey! [excited] Look what I just found in the attic! [whispers] Don\'t tell anyone, but I think it\'s a real treasure map! [giggles] Are you ready for an adventure?',
    recommendedVoiceId: 'josh'
  },
  {
    id: 'storytelling',
    label: 'Storytelling',
    description: 'Atmospheric pacing with emotional depth and cinematic tone.',
    sampleText: 'The old lighthouse stood alone against the raging sea. [sighs] For forty years, Thomas kept the beacon burning, waiting for a ship that never returned. [pause] Until tonight.',
    recommendedVoiceId: 'verity'
  },
  {
    id: 'narration',
    label: 'Narration',
    description: 'Professional, articulate pacing ideal for audiobooks and explainer videos.',
    sampleText: 'Artificial intelligence is fundamentally reshaping how humans interact with digital soundscapes. By capturing subtle vocal micro-expressions, we create authentic human connections.',
    recommendedVoiceId: 'rachel'
  },
  {
    id: 'documentary',
    label: 'Documentary',
    description: 'Deep, resonant, contemplative narration suited for history and nature.',
    sampleText: 'Deep within the Pacific trench, life thrives in complete darkness. Under immense pressure and freezing temperatures, strange bioluminescent creatures illuminate the oceanic abyss.',
    recommendedVoiceId: 'adam'
  },
  {
    id: 'educational',
    label: 'Educational',
    description: 'Clear, encouraging, and easy to comprehend across languages.',
    sampleText: 'Welcome to Chapter Three. Today, we will explore quantum entanglement. [curious] How can two distant particles instantaneously influence one another? Let\'s break it down step-by-step.',
    recommendedVoiceId: 'bella'
  },
  {
    id: 'conversation',
    label: 'Conversation',
    description: 'Natural conversational cadence, thoughtful pauses, and interactive replies.',
    sampleText: 'Salam Alaykum! I noticed you were trying to access your account from London. [laughs] No worries at all, I have authorized your travel allowance right now!',
    recommendedVoiceId: 'amira'
  }
];

export const AUDIO_TAGS = [
  { tag: '[laughs]', label: 'laughs', icon: '😄', desc: 'Adds natural laughter' },
  { tag: '[whispers]', label: 'whispers', icon: '🤫', desc: 'Lowers volume & increases breathiness' },
  { tag: '[sighs]', label: 'sighs', icon: '😮‍💨', desc: 'Exhales with emotional weight' },
  { tag: '[excited]', label: 'excited', icon: '🎉', desc: 'Higher energy and faster tempo' },
  { tag: '[giggles]', label: 'giggles', icon: '🤭', desc: 'Lighthearted playful chuckle' },
  { tag: '[curious]', label: 'curious', icon: '🤔', desc: 'Inquisitive upward inflection' },
  { tag: '[screams]', label: 'screams', icon: '😱', desc: 'Dramatic intense vocal shock' },
  { tag: '[cries]', label: 'cries', icon: '🥺', desc: 'Tearful, trembling timbre' },
  { tag: '[cheering]', label: 'cheering', icon: '🙌', desc: 'Celebratory crowd vocalization' },
  { tag: '[pause: 1s]', label: 'pause: 1s', icon: '⏱️', desc: '1 second dramatic silence' },
  { tag: '[deep breath]', label: 'deep breath', icon: '🫁', desc: 'Natural inhalation pause' },
];
