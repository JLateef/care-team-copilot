import type { IncomingMessage, Patient } from '../types';
import PatientContextPanel from './PatientContextPanel';
import RedFlagBanner from './RedFlagBanner';
import DraftPanel from './DraftPanel';
import { formatTimeAgo } from '../lib/triage';
import { MessageSquare } from 'lucide-react';

interface Props {
  message: IncomingMessage | null;
  patient: Patient | null;
  onSend: (messageId: string) => void;
}

export default function MessageWorkspace({ message, patient, onSend }: Props) {
  if (!message || !patient) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-stone-50 text-center px-6">
        <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center mb-4">
          <MessageSquare size={22} className="text-stone-400" />
        </div>
        <p className="text-[15px] font-medium text-stone-500 mb-1">Select a message</p>
        <p className="text-sm text-stone-400">
          Choose a patient message from the inbox to review and draft a reply.
        </p>
      </div>
    );
  }

  const isRedFlag = message.category === 'Red flag — escalate';

  return (
    <div className="flex-1 overflow-y-auto bg-stone-50">
      <div className="max-w-2xl mx-auto px-6 py-6 space-y-4">

        {/* Patient + message header */}
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="text-lg font-semibold text-stone-900">{patient.name}</h2>
            <span className="text-sm text-stone-400">{patient.primaryCondition}</span>
          </div>
          <p className="text-xs text-stone-400">{formatTimeAgo(message.timestamp)}</p>
        </div>

        {/* Red flag banner */}
        {isRedFlag && <RedFlagBanner triageReason={message.triageReason} />}

        {/* Patient message */}
        <div className="bg-white border border-stone-200 rounded-xl p-4">
          <p className="text-[11.5px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
            Patient Message
          </p>
          <p className="text-[14.5px] text-stone-800 leading-relaxed">{message.text}</p>
        </div>

        {/* Patient context */}
        <PatientContextPanel patient={patient} />

        {/* Draft panel — key forces remount on message change so state resets */}
        <DraftPanel
          key={message.id}
          patient={patient}
          message={message}
          onSend={onSend}
        />
      </div>
    </div>
  );
}
