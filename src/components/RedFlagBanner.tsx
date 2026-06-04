import { AlertTriangle, PhoneCall } from 'lucide-react';

interface Props {
  triageReason?: string;
}

export default function RedFlagBanner({ triageReason }: Props) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertTriangle size={16} className="text-red-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-red-800 mb-1">
            Recommend escalating to supervising physician
          </p>
          <p className="text-[12.5px] text-red-700 leading-relaxed mb-2">
            This message contains alarm features that require immediate physician evaluation.
            Do not advise self-management — the drafted reply will acknowledge the patient
            with care and direct them to urgent medical attention.
          </p>
          {triageReason && (
            <p className="text-[11.5px] text-red-500 font-medium">
              Triage note: {triageReason}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-red-100 border border-red-200 rounded-lg text-[11.5px] font-semibold text-red-700">
            <PhoneCall size={11} />
            Escalate
          </div>
        </div>
      </div>
    </div>
  );
}
