import { Activity } from 'lucide-react';

interface Props {
  onOpen: () => void;
}

const lines = [
  { text: 'Salvo Health', delay: 400, type: 'brand' },
  { text: 'Care Team Co-Pilot', delay: 1100, type: 'headline' },
  {
    text: 'Triage patient messages, generate grounded draft replies,\nand move through your inbox with confidence.',
    delay: 1900,
    type: 'sub',
  },
  { text: 'pills', delay: 2700, type: 'pills' },
  { text: 'open', delay: 3500, type: 'cta' },
];

export default function LoadingPage({ onOpen }: Props) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-lg w-full flex flex-col items-center gap-0">

        {/* Brand */}
        <div
          className="animate-fade-in flex items-center gap-2.5 mb-8"
          style={{ animationDelay: `${lines[0].delay}ms` }}
        >
          <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center shadow-sm">
            <Activity size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-stone-900 font-semibold text-xl tracking-tight">Salvo Health</span>
        </div>

        {/* Headline */}
        <div
          className="animate-fade-in text-center mb-5"
          style={{ animationDelay: `${lines[1].delay}ms` }}
        >
          <h1 className="text-[2.6rem] font-semibold text-stone-900 tracking-tight leading-tight">
            Care Team Co-Pilot
          </h1>
        </div>

        {/* Sub-heading */}
        <div
          className="animate-fade-in text-center mb-10"
          style={{ animationDelay: `${lines[2].delay}ms` }}
        >
          <p className="text-lg text-stone-500 leading-relaxed whitespace-pre-line max-w-md">
            {lines[2].text}
          </p>
        </div>

        {/* Feature pills */}
        <div
          className="animate-fade-in flex flex-wrap items-center justify-center gap-2 mb-10"
          style={{ animationDelay: `${lines[3].delay}ms` }}
        >
          {[
            '12 patients',
            'Instant triage',
            'AI-assisted drafts',
            'Human-in-the-loop',
          ].map((pill) => (
            <span
              key={pill}
              className="px-3 py-1 bg-white border border-stone-200 rounded-full text-sm text-stone-500 shadow-sm"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="animate-fade-in"
          style={{ animationDelay: `${lines[4].delay}ms` }}
        >
          <button
            onClick={onOpen}
            className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-medium text-base rounded-xl shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Open Inbox
          </button>
        </div>

        {/* Footer note */}
        <div
          className="animate-fade-in mt-12 text-center"
          style={{ animationDelay: `${lines[4].delay + 300}ms` }}
        >
          <p className="text-xs text-stone-400">
            Prototype · Mock data only · No real patient information
          </p>
        </div>
      </div>
    </div>
  );
}
