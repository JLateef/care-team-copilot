import { Activity, Zap } from 'lucide-react';
import type { IncomingMessage, Urgency } from '../types';

type Filter = 'All' | Urgency;

interface Props {
  messages: IncomingMessage[];
  minutesSaved: number;
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  onHome: () => void;
}

const TIERS: { urgency: Urgency; label: string; active: string; inactive: string; dot: string }[] = [
  {
    urgency: 'Urgent',
    label: 'Urgent',
    active: 'bg-red-600 text-white border-red-600',
    inactive: 'bg-white text-red-600 border-red-200 hover:bg-red-50',
    dot: 'bg-red-500',
  },
  {
    urgency: 'Routine',
    label: 'Routine',
    active: 'bg-amber-500 text-white border-amber-500',
    inactive: 'bg-white text-amber-600 border-amber-200 hover:bg-amber-50',
    dot: 'bg-amber-400',
  },
  {
    urgency: 'Low',
    label: 'Low',
    active: 'bg-stone-500 text-white border-stone-500',
    inactive: 'bg-white text-stone-500 border-stone-200 hover:bg-stone-100',
    dot: 'bg-stone-400',
  },
];

export default function TopBar({ messages, minutesSaved, filter, onFilterChange, onHome }: Props) {
  const counts: Record<Urgency, number> = {
    Urgent: messages.filter((m) => m.urgency === 'Urgent' && m.status === 'Needs reply').length,
    Routine: messages.filter((m) => m.urgency === 'Routine' && m.status === 'Needs reply').length,
    Low: messages.filter((m) => m.urgency === 'Low' && m.status === 'Needs reply').length,
  };

  function handleTierClick(urgency: Urgency) {
    // Toggle off if already active
    onFilterChange(filter === urgency ? 'All' : urgency);
  }

  return (
    <header className="h-14 bg-white border-b border-stone-200 flex items-center px-5 gap-5 flex-shrink-0 z-10">
      {/* Brand */}
      <button
        onClick={onHome}
        className="flex items-center gap-2 hover:opacity-75 transition-opacity focus:outline-none"
      >
        <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
          <Activity size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="text-stone-900 font-semibold text-[15px] tracking-tight">Salvo Health</span>
        <span className="text-stone-300 text-sm font-light">/</span>
        <span className="text-stone-400 text-sm">Care Team Co-Pilot</span>
      </button>

      <div className="flex-1" />

      {/* Urgency filter bars */}
      <div className="flex items-center gap-1.5">
        {TIERS.map(({ urgency, label, active, inactive, dot }) => {
          const isActive = filter === urgency;
          return (
            <button
              key={urgency}
              onClick={() => handleTierClick(urgency)}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-semibold transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-stone-300',
                isActive ? active : inactive,
              ].join(' ')}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-white/70' : dot}`} />
              {label}
              <span className={[
                'ml-0.5 text-[11px] font-bold tabular-nums',
                isActive ? 'text-white/90' : '',
              ].join(' ')}>
                {counts[urgency]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="w-px h-5 bg-stone-200" />

      {/* Minutes saved */}
      <div className="group relative flex items-center gap-1.5 cursor-default">
        <Zap size={13} className="text-teal-500" />
        <span className="text-sm font-medium text-teal-700">
          ~{Math.round(minutesSaved)} min saved today
        </span>

        {/* Tooltip */}
        <div className="absolute right-0 top-full mt-2 w-60 bg-stone-900 text-white text-xs rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          <p className="font-medium mb-1">How is this calculated?</p>
          <p className="text-stone-300 leading-relaxed">
            ~2.5 min saved per accepted AI draft (vs. drafting from scratch). Resets daily.
            Actual savings vary by message complexity.
          </p>
        </div>
      </div>
    </header>
  );
}
