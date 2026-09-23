import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Mic2, 
  Lightbulb, 
  AudioWaveform,
  Volume2
} from 'lucide-react';
import { Voice } from '../../types/studio';

interface AskAgentWidgetProps {
  selectedVoice: Voice;
  onApplyPromptSuggestion?: (text: string) => void;
}

export const AskAgentWidget: React.FC<AskAgentWidgetProps> = ({
  selectedVoice,
  onApplyPromptSuggestion
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; actionText?: string }>>([
    {
      sender: 'agent',
      text: `Hello! I am your Voice AI Assistant. Need tips on adding emotional audio tags like [laughs], setting custom pauses, or tuning voice stability for ${selectedVoice.name}?`
    }
  ]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const newMessages = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(newMessages);
    setInputMessage('');

    // Generate intelligent assistant reply
    setTimeout(() => {
      let reply = "Here's an expressive audio prompt tuned for natural prosody:";
      let suggestion = "Wait, really? [laughs] I never thought about it like that! [whispers] Let me tell you what actually happened...";

      if (userText.toLowerCase().includes('laugh') || userText.toLowerCase().includes('humor')) {
        reply = "To get realistic comedic timing, place [laughs] or [giggles] right before punchlines:";
        suggestion = "So I walked into the room, and you wouldn't believe it! [laughs] The cat was wearing a bowtie! [giggles]";
      } else if (userText.toLowerCase().includes('whisper') || userText.toLowerCase().includes('secret')) {
        reply = "Use [whispers] to lower volume and add intimate breathiness:";
        suggestion = "[whispers] Keep this between us, but the vault code is four, seven, nine, two. [pause: 1s] Don't write it down.";
      } else if (userText.toLowerCase().includes('arabic') || userText.toLowerCase().includes('emirati') || userText.toLowerCase().includes('dubai')) {
        reply = "For Gulf Arabic or bilingual delivery, use Amira or Tariq with natural conversational pauses:";
        suggestion = "Salam Alaykum! [excited] Welcome to Dubai. [pause: 1s] How may I assist your business setup today?";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: reply,
          actionText: suggestion
        }
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button in Bottom Right */}
      <div className="fixed bottom-5 right-6 z-40 select-none">
        <button
          id="ask-agent-floating-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-white dark:bg-[#102046] text-blue-900 dark:text-blue-100 border border-[#d6e3f2] dark:border-[#1e3463] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
        >
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <div className="flex items-center space-x-0.5">
              <span className="w-0.5 h-2 bg-current rounded-full animate-pulse" />
              <span className="w-0.5 h-3.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
          <span className="text-xs font-bold tracking-tight">Ask Agent</span>
        </button>
      </div>

      {/* Floating Agent Dialog Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 max-w-[calc(100vw-2rem)] h-[480px] bg-[#fbfdff] dark:bg-[#0c1836] border border-[#d6e3f2] dark:border-[#1e3463] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden select-none animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-3.5 px-4 border-b border-[#e2ecf7] dark:border-[#1d3058] flex items-center justify-between bg-white/70 dark:bg-[#0a1530]/50">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                Win Audio AI Prompt Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-[#edf4fc] dark:hover:bg-[#192b52] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick suggestions pills */}
          <div className="px-3 py-2 bg-[#edf4fc]/70 dark:bg-[#132349]/50 border-b border-[#e2ecf7] dark:border-[#1e3463] flex items-center space-x-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => setInputMessage('How to use [whispers] and [laughs]?')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-[#102046] border border-[#d6e3f2] dark:border-[#1e3463] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300 hover:border-blue-300 whitespace-nowrap transition-colors"
            >
              🎭 Audio Tags Guide
            </button>
            <button
              onClick={() => setInputMessage('Give me a dramatic movie trailer text')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-[#102046] border border-[#d6e3f2] dark:border-[#1e3463] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-300 hover:border-blue-300 whitespace-nowrap transition-colors"
            >
              🎬 Movie Trailer
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-[#102046] border border-[#dce7f3] dark:border-[#1e3463] text-slate-800 dark:text-slate-200'}`}
                >
                  {m.text}

                  {m.actionText && (
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1.5">
                      <p className="font-mono text-[11px] bg-[#edf4fc] dark:bg-[#0a1530] p-2 rounded-lg border border-[#d6e3f2] dark:border-[#1e3463] text-blue-900 dark:text-blue-100">
                        "{m.actionText}"
                      </p>
                      {onApplyPromptSuggestion && (
                        <button
                          onClick={() => {
                            onApplyPromptSuggestion(m.actionText!);
                            setIsOpen(false);
                          }}
                          className="w-full py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider transition-colors shadow-2xs"
                        >
                          Use In Editor
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-[#e2ecf7] dark:border-[#1d3058] bg-white dark:bg-[#0c1836] flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for audio tags, prompt advice..."
              className="flex-1 text-xs px-3 py-2 rounded-xl bg-[#edf4fc] dark:bg-[#14244a] border border-[#d6e3f0] dark:border-[#1e3463] outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-opacity shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
