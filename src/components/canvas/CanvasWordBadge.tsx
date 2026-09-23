import React from 'react';
import { countWords } from '../../utils/validation';

interface CanvasWordBadgeProps {
  text: string;
  limit: number;
}

export const CanvasWordBadge: React.FC<CanvasWordBadgeProps> = ({ text, limit }) => {
  const count = countWords(text);
  const isOver = count > limit;
  const isNear = count >= limit * 0.85 && !isOver;
  const isEmpty = count === 0;

  const percentage = Math.min(100, Math.round((count / limit) * 100));

  let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
  let barColor = 'bg-slate-500';

  if (isEmpty) {
    badgeColor = 'bg-slate-900 text-slate-500 border-slate-800';
  } else if (isOver) {
    badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse';
    barColor = 'bg-rose-500';
  } else if (isNear) {
    badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    barColor = 'bg-amber-400';
  } else {
    badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    barColor = 'bg-emerald-500';
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 hidden sm:block">
        <div 
          className={`h-full transition-all duration-300 ${barColor}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${badgeColor}`}>
        {count}/{limit} words {isOver ? `(+${count - limit} OVER)` : ''}
      </span>
    </div>
  );
};
