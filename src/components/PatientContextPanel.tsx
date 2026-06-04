import type { Patient } from '../types';
import { Calendar, User, Activity } from 'lucide-react';

interface Props {
  patient: Patient;
}

const CONDITION_COLORS: Record<string, string> = {
  IBS: 'bg-orange-50 text-orange-700 border-orange-200',
  IBD: 'bg-rose-50 text-rose-700 border-rose-200',
  GERD: 'bg-amber-50 text-amber-700 border-amber-200',
  'MASLD (fatty liver)': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Obesity: 'bg-purple-50 text-purple-700 border-purple-200',
  SIBO: 'bg-blue-50 text-blue-700 border-blue-200',
  Celiac: 'bg-teal-50 text-teal-700 border-teal-200',
};

function formatSymptomKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export default function PatientContextPanel({ patient }: Props) {
  const conditionCls =
    CONDITION_COLORS[patient.primaryCondition] ??
    'bg-stone-100 text-stone-600 border-stone-200';

  const symptoms = Object.entries(patient.recentSymptoms);

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[13px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
            Patient Context
          </h3>
          <p className="text-base font-semibold text-stone-900">{patient.name}</p>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${conditionCls}`}
        >
          {patient.primaryCondition}
        </span>
      </div>

      {/* Meta pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <MetaPill
          icon={<User size={11} />}
          label={patient.assignedClinicianRole}
        />
        <MetaPill
          icon={<Calendar size={11} />}
          label={`${patient.weeksEnrolled} weeks enrolled`}
        />
      </div>

      {/* Care plan */}
      <div className="mb-4">
        <SectionLabel icon={<Activity size={11} />} text="Active Care Plan" />
        <p className="text-[13px] text-stone-600 leading-relaxed mt-1">
          {patient.carePlanSummary}
        </p>
      </div>

      {/* Gut Check snapshot */}
      <div>
        <SectionLabel icon={<Activity size={11} />} text="Recent Gut Check" />
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {symptoms.map(([key, val]) => (
            <div key={key} className="flex items-center justify-between min-w-0">
              <span className="text-[11.5px] text-stone-400 truncate pr-1">
                {formatSymptomKey(key)}
              </span>
              <span className="text-[11.5px] font-medium text-stone-700 text-right flex-shrink-0">
                {String(val)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetaPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-200 rounded-full text-[11.5px] text-stone-500">
      {icon}
      {label}
    </span>
  );
}

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
      {icon}
      {text}
    </div>
  );
}
