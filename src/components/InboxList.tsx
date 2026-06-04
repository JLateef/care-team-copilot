import type { IncomingMessage, Urgency } from '../types';
import { patientMap } from '../data/mockData';
import MessageRow from './MessageRow';

type Filter = 'All' | Urgency;

interface Props {
  messages: IncomingMessage[];
  selectedMessageId: string | null;
  onSelect: (id: string) => void;
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  totalCount: number;
}

const FILTERS: Filter[] = ['All', 'Urgent', 'Routine', 'Low'];

const filterStyles: Record<Filter, { active: string; inactive: string }> = {
  All: {
    active: 'bg-stone-800 text-white border-stone-800',
    inactive: 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50',
  },
  Urgent: {
    active: 'bg-red-600 text-white border-red-600',
    inactive: 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50',
  },
  Routine: {
    active: 'bg-amber-500 text-white border-amber-500',
    inactive: 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50',
  },
  Low: {
    active: 'bg-stone-400 text-white border-stone-400',
    inactive: 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50',
  },
};

export default function InboxList({
  messages,
  selectedMessageId,
  onSelect,
  filter,
  onFilterChange,
  totalCount,
}: Props) {
  return (
    <aside className="w-[360px] flex-shrink-0 flex flex-col border-r border-stone-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-stone-100 flex-shrink-0">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-[13px] font-semibold text-stone-700 uppercase tracking-wider">
            Patient Inbox
          </h2>
          <span className="text-xs text-stone-400">
            {messages.length} of {totalCount}
          </span>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={[
                'px-3 py-1 rounded-full text-[11.5px] font-medium border transition-all duration-100 focus:outline-none',
                filter === f ? filterStyles[f].active : filterStyles[f].inactive,
              ].join(' ')}
            >
              {f === 'All' ? 'Show all' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center px-6">
            <p className="text-sm text-stone-400">No messages in this category.</p>
            <button
              onClick={() => onFilterChange('All')}
              className="mt-3 text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Show all messages
            </button>
          </div>
        ) : (
          messages.map((msg) => {
            const patient = patientMap[msg.patientId];
            if (!patient) return null;
            return (
              <MessageRow
                key={msg.id}
                message={msg}
                patient={patient}
                isSelected={msg.id === selectedMessageId}
                onClick={() => onSelect(msg.id)}
              />
            );
          })
        )}
      </div>
    </aside>
  );
}
