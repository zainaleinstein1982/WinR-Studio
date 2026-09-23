import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Info, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Cpu,
  HelpCircle
} from 'lucide-react';
import { BoxGSelection, ElevenLabsComponent } from '../../types';
import { ELEVENLABS_STACK_COMPONENTS } from '../../data/competitionData';
import { evaluateBoxGArchitecture } from '../../utils/validation';

interface BoxGComponentSelectorProps {
  selectedComponents: BoxGSelection[];
  onChange: (updatedSelections: BoxGSelection[]) => void;
}

export const BoxGComponentSelector: React.FC<BoxGComponentSelectorProps> = ({
  selectedComponents = [],
  onChange
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const evaluation = evaluateBoxGArchitecture(selectedComponents);

  const categories = Array.from(
    new Set(ELEVENLABS_STACK_COMPONENTS.map((c) => c.category))
  );

  const isSelected = (id: string) => selectedComponents.some((s) => s.componentId === id);

  const getJustification = (id: string) => {
    const found = selectedComponents.find((s) => s.componentId === id);
    return found ? found.justification : '';
  };

  const toggleSelect = (comp: ElevenLabsComponent) => {
    if (isSelected(comp.id)) {
      onChange(selectedComponents.filter((s) => s.componentId !== comp.id));
    } else {
      onChange([
        ...selectedComponents,
        {
          componentId: comp.id,
          justification: `Selected for ${comp.architecturalRole.toLowerCase()} in this voice agent workflow.`
        }
      ]);
      setExpandedId(comp.id);
    }
  };

  const updateJustification = (id: string, text: string) => {
    onChange(
      selectedComponents.map((s) =>
        s.componentId === id ? { ...s, justification: text } : s
      )
    );
  };

  const filteredComponents = activeCategoryFilter === 'all'
    ? ELEVENLABS_STACK_COMPONENTS
    : ELEVENLABS_STACK_COMPONENTS.filter((c) => c.category === activeCategoryFilter);

  return (
    <div className="space-y-4 rounded-xl bg-slate-950/70 border border-slate-800 p-4 sm:p-5">
      {/* Selector Header & Bloat Evaluator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <h4 className="font-semibold text-sm text-slate-100">
              ElevenLabs Component Selection & Architectural Justifications
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Rule requirement: Assessed on focused selection, not exhaustive coverage. Selecting all without specific justifications is penalized.
          </p>
        </div>

        {/* Quality Score Meter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 shrink-0">
          <span className="text-[11px] text-slate-400 font-medium">Architecture Quality:</span>
          <span className={`text-xs font-black font-mono ${
            evaluation.score >= 80 ? 'text-emerald-400' : evaluation.score >= 50 ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {evaluation.score}/100
          </span>
          <span className="text-[10px] text-slate-400">({selectedComponents.length} selected)</span>
        </div>
      </div>

      {/* Bloat Warning Banner */}
      {evaluation.bloatWarning && (
        <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{evaluation.bloatWarning}</p>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => setActiveCategoryFilter('all')}
          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all ${
            activeCategoryFilter === 'all'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          All Categories ({ELEVENLABS_STACK_COMPONENTS.length})
        </button>
        {categories.map((cat) => {
          const selectedInCat = ELEVENLABS_STACK_COMPONENTS.filter(
            (c) => c.category === cat && isSelected(c.id)
          ).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{cat}</span>
              {selectedInCat > 0 && (
                <span className="w-4 h-4 rounded-full bg-slate-950 text-amber-300 text-[10px] flex items-center justify-center font-bold">
                  {selectedInCat}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
        {filteredComponents.map((comp) => {
          const selected = isSelected(comp.id);
          const justification = getJustification(comp.id);
          const isJustified = justification && justification.trim().length >= 15;
          const isExpanded = expandedId === comp.id || (selected && !isJustified);

          return (
            <div
              key={comp.id}
              className={`p-3 rounded-xl border transition-all ${
                selected
                  ? 'bg-slate-900/90 border-amber-500/50 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={() => toggleSelect(comp)}
                  className="flex items-start gap-2.5 text-left flex-1"
                >
                  <div className="mt-0.5 text-amber-400">
                    {selected ? (
                      <CheckSquare className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      {comp.category}
                    </span>
                    <h5 className="font-semibold text-xs text-slate-100 leading-tight">
                      {comp.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {comp.description}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedId(expandedId === comp.id ? null : comp.id)}
                  className="text-slate-400 hover:text-slate-200 p-1 rounded"
                >
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Justification Field (Visible when selected or expanded) */}
              {selected && (
                <div className="mt-3 pt-2.5 border-t border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Specific Reason for Selection: *
                    </span>
                    <span className={`font-mono text-[10px] ${isJustified ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isJustified ? 'Valid Justification' : 'Rationale Required'}
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={justification}
                    onChange={(e) => updateJustification(comp.id, e.target.value)}
                    placeholder={`Why is ${comp.title} strictly necessary for your architecture?`}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-500 resize-none font-sans"
                  />
                  <p className="text-[10px] text-slate-500 italic">
                    Best Practice: {comp.bestPractice}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
