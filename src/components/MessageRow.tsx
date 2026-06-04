import type { IncomingMessage, Patient, Urgency, MessageCategory } from '../types';
import { formatTimeAgo } from '../lib/triage';
import { CheckCircle } from 'lucide-react';

interface Props {
  message: IncomingMessage;
  patient: Patient;
  isSelected: boolean;
  onClick: () => void;
}

export default function MessageRow({ message, patient, isSelected, onClick }: Props) {
  const isRedFlag = message.category === 'Red flag — escalate';
  const isReplied = message.status === 'Replied';

  return (
    <button
      onClick={onClick}
      className={[
        'w-full text-left px-4 py-3.5 border-b border-stone-100 transition-colors duration-100 relative focus:outline-none group',
        isSelected
          ? 'bg-teal-50 border-l-[3px] border-l-teal-500 pl-[13px]'
          : isRedFlag
          ? 'bg-red-50/50 border-l-[3px] border-l-red-400 pl-[13px] hover:bg-red-50'
          : 'hover:bg-stone-50 border-l-[3px] border-l-transparent pl-[13px]',
        isReplied ? 'opacity-60' : '',
      ].join(' ')}
    >
      {/* Top row: name + time */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <span
          className={`font-semibold text-[13.5px] leading-tight truncate ${
            isReplied ? 'text-stone-400' : 'text-stone-900'
          }`}
        >
          {patient.name}
        </span>
        <span className="text-[11px] text-stone-400 whitespace-nowrap flex-shrink-0 mt-0.5">
          {formatTimeAgo(message.timestamp)}
        </span>
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap gap-1 mb-1.5">
        <UrgencyBadge urgency={message.urgency} />
        <CategoryBadge category={message.category} />
        <ConditionBadge condition={patient.primaryCondition} />
        {isReplied && (
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-teal-50 text-teal-600 border border-teal-200">
            <CheckCircle size={9} />
            Replied
          </span>
        )}
      </div>

      {/* Message preview */}
      <p className="text-[12.5px] text-stone-500 leading-snug line-clamp-2">
        {message.text}
      </p>
    </button>
  );
}

function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const styles: Record<Urgency, string> = {
    Urgent: 'bg-red-50 text-red-700 border-red-200',
    Routine: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-stone-100 text-stone-500 border-stone-200',
  };
  const dots: Record<Urgency, string> = {
    Urgent: 'bg-red-500',
    Routine: 'bg-amber-400',
    Low: 'bg-stone-400',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold border ${styles[urgency]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[urgency]}`} />
      {urgency}
    </span>
  );
}

function CategoryBadge({ category }: { category: MessageCategory }) {
  const isRedFlag = category === 'Red flag — escalate';
  if (isRedFlag) {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-700 border border-red-200">
        ⚠ Red flag
      </span>
    );
  }

  const styles: Partial<Record<MessageCategory, string>> = {
    'Symptom flare': 'bg-orange-50 text-orange-700 border-orange-200',
    'Diet/nutrition question': 'bg-teal-50 text-teal-700 border-teal-200',
    'Medication/supplement question': 'bg-blue-50 text-blue-700 border-blue-200',
    'Logistics/scheduling': 'bg-stone-100 text-stone-500 border-stone-200',
    'Encouragement/check-in': 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const labels: Partial<Record<MessageCategory, string>> = {
    'Symptom flare': 'Symptom flare',
    'Diet/nutrition question': 'Diet',
    'Medication/supplement question': 'Medication',
    'Logistics/scheduling': 'Scheduling',
    'Encouragement/check-in': 'Check-in',
  };

  const cls = styles[category] ?? 'bg-stone-100 text-stone-500 border-stone-200';
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${cls}`}>
      {labels[category] ?? category}
    </span>
  );
}

function ConditionBadge({ condition }: { condition: string }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-stone-50 text-stone-400 border border-stone-200">
      {condition}
    </span>
  );
}
