import { Voice, AudioSettings } from '../types/studio';

/**
 * Generate a realistic WAV Audio Blob and synthesized playback using Web Audio API
 */
export async function synthesizeAudioBuffer(
  text: string,
  voice: Voice,
  settings: AudioSettings
): Promise<{ audioUrl: string; duration: number }> {
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioContextClass();

  // Calculate approximate duration based on word count, speed, and audio tags
  const words = text.trim().split(/\s+/).filter(Boolean);
  const baseWpm = 145 * settings.speed;
  const wordDuration = (words.length / baseWpm) * 60;
  
  // Tag bonus durations
  let tagBonus = 0;
  if (text.includes('[pause')) tagBonus += 1.2;
  if (text.includes('[laughs]')) tagBonus += 0.8;
  if (text.includes('[sighs]')) tagBonus += 0.9;
  if (text.includes('[whispers]')) tagBonus += 0.5;
  if (text.includes('[deep breath]')) tagBonus += 0.7;

  const duration = Math.max(1.8, Math.min(60, wordDuration + tagBonus + 0.8));
  const sampleRate = ctx.sampleRate;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(2, numSamples, sampleRate);
  const leftChannel = buffer.getChannelData(0);
  const rightChannel = buffer.getChannelData(1);

  // Pitch base based on gender / voice
  let baseFreq = 160;
  if (voice.gender === 'female') baseFreq = 220;
  if (voice.gender === 'male') baseFreq = 115;
  if (voice.id === 'adam') baseFreq = 95;
  if (voice.id === 'bella') baseFreq = 240;
  if (voice.id === 'josh') baseFreq = 140;

  // Add settings pitch offset
  baseFreq += settings.pitchOffset * 10;

  // Emotion adjustments
  if (text.includes('[excited]')) baseFreq *= 1.18;
  if (text.includes('[whispers]')) baseFreq *= 0.88;

  // Generate synthetic formant-rich harmonic waveform for audio player
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    
    // Natural speech cadence envelope (syllable modulation)
    const cadence = Math.sin(2 * Math.PI * 4.2 * t * settings.speed) * 0.4 + 0.6;
    const sentenceEnvelope = Math.sin((Math.PI * t) / duration);
    
    // Fundamental + formants
    const f0 = baseFreq + Math.sin(2 * Math.PI * 1.8 * t) * 8; // subtle vibrato/intonation
    const f1 = f0 * 2.1;
    const f2 = f0 * 3.4;
    const f3 = f0 * 5.2;

    let sample = 
      Math.sin(2 * Math.PI * f0 * t) * 0.4 +
      Math.sin(2 * Math.PI * f1 * t) * 0.25 +
      Math.sin(2 * Math.PI * f2 * t) * 0.15 +
      Math.sin(2 * Math.PI * f3 * t) * 0.08;

    // Breath / whisper noise
    const noise = (Math.random() * 2 - 1) * 0.05;
    if (text.includes('[whispers]')) {
      sample = sample * 0.3 + noise * 0.7;
    } else {
      sample += noise * 0.03;
    }

    // Normalization & Volume
    const gainFactor = Math.pow(10, settings.volume / 20);
    const finalVal = sample * cadence * sentenceEnvelope * 0.6 * gainFactor;

    leftChannel[i] = Math.max(-0.95, Math.min(0.95, finalVal));
    rightChannel[i] = Math.max(-0.95, Math.min(0.95, finalVal * 0.98 + noise * 0.02));
  }

  // Convert buffer to WAV blob
  const wavBlob = audioBufferToWav(buffer);
  const audioUrl = URL.createObjectURL(wavBlob);

  return { audioUrl, duration };
}

/**
 * Play speech via Web Speech API (real browser speech synthesis)
 */
export function speakWithBrowserTts(
  text: string,
  voice: Voice,
  settings: AudioSettings,
  onStart?: () => void,
  onEnd?: () => void
): () => void {
  if (!('speechSynthesis' in window)) {
    return () => {};
  }

  window.speechSynthesis.cancel();

  // Strip audio tags for speech utterance or handle pauses
  const cleanText = text
    .replace(/\[laughs\]/gi, ', haha, ')
    .replace(/\[whispers\]/gi, '... ')
    .replace(/\[sighs\]/gi, '... ahh... ')
    .replace(/\[excited\]/gi, '! ')
    .replace(/\[giggles\]/gi, ', heh heh, ')
    .replace(/\[curious\]/gi, '? ')
    .replace(/\[screams\]/gi, '!! ')
    .replace(/\[cries\]/gi, '... ')
    .replace(/\[cheering\]/gi, ' yay! ')
    .replace(/\[pause[^\]]*\]/gi, '... ... ')
    .replace(/\[deep breath\]/gi, '... ');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = Math.max(0.5, Math.min(2.0, settings.speed));
  
  let pitch = 1.0;
  if (voice.gender === 'female') pitch = 1.25;
  if (voice.gender === 'male') pitch = 0.85;
  if (text.includes('[excited]')) pitch += 0.2;
  if (text.includes('[whispers]')) pitch -= 0.2;
  utterance.pitch = Math.max(0.5, Math.min(1.8, pitch));

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => {
    if (voice.gender === 'female') {
      return v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('victoria');
    }
    return v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('george');
  }) || voices[0];

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
}

/**
 * Helper to encode AudioBuffer to Standard WAV File Blob
 */
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const out = new DataView(new ArrayBuffer(length));
  const channels: Float32Array[] = [];
  let sampleRate = buffer.sampleRate;
  let offset = 0;
  let pos = 0;

  function setUint16(data: number) {
    out.setUint16(pos, data, true);
    pos += 2;
  }

  function setUint32(data: number) {
    out.setUint32(pos, data, true);
    pos += 4;
  }

  // RIFF chunk descriptor
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  // fmt sub-chunk
  setUint32(0x20746d66); // "fmt "
  setUint32(16); // subchunk1size (16 for PCM)
  setUint16(1); // audio format (1 = PCM)
  setUint16(numOfChan);
  setUint32(sampleRate);
  setUint32(sampleRate * 2 * numOfChan); // byte rate
  setUint16(numOfChan * 2); // block align
  setUint16(16); // bits per sample

  // data sub-chunk
  setUint32(0x61746164); // "data"
  setUint32(length - pos - 4); // data length

  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (offset < buffer.length) {
    for (let i = 0; i < numOfChan; i++) {
      let sample = Math.max(-1, Math.min(1, channels[i][offset]));
      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
      out.setInt16(pos, sample, true);
      pos += 2;
    }
    offset++;
  }

  return new Blob([out.buffer], { type: 'audio/wav' });
}
