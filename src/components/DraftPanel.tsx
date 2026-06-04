import { useState } from 'react';
import { Loader2, RotateCcw, Send, Bot } from 'lucide-react';
import type { Patient, IncomingMessage, DraftTone } from '../types';
import { generateDraft } from '../api/draft';

interface Props {
  patient: Patient;
  message: IncomingMessage;
  onSend: (messageId: string) => void;
}

type DraftState = 'idle' | 'loading' | 'ready';

export default function DraftPanel({ patient, message, onSend }: Props) {
  const [state, setState] = useState<DraftState>('idle');
  const [draftText, setDraftText] = useState('');
  const [tone, setTone] = useState<DraftTone>('Reassuring');
  const [sent, setSent] = useState(false);

  async function handleGenerate() {
    setState('loading');
    setDraftText('');
    const result = await generateDraft(patient, message, tone);
    setDraftText(result.draft);
    setState('ready');
  }

  async function handleRegenerate() {
    setState('loading');
    setDraftText('');
    const result = await generateDraft(patient, message, tone);
    setDraftText(result.draft);
    setState('ready');
  }

  function handleSend() {
    setSent(true);
    onSend(message.id);
  }

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 bg-stone-50">
        <div className="flex items-center gap-2">
          <Bot size={14} className="text-teal-600" />
          <span className="text-[12.5px] font-semibold text-stone-600 uppercase tracking-wider">
            AI Draft Reply
          </span>
        </div>

        {/* Tone selector */}
        <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-0.5">
          {(['Reassuring', 'Direct'] as DraftTone[]).map((t) => (
            <button
              key={t}
              onClick={async () => {
                if (t === tone) return;
                setTone(t);
                if (state === 'ready') {
                  setState('loading');
                  setDraftText('');
                  const result = await generateDraft(patient, message, t);
                  setDraftText(result.draft);
                  setState('ready');
                }
              }}
              disabled={state === 'loading'}
              className={[
                'px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors focus:outline-none',
                tone === t
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-700',
              ].join(' ')}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Idle state */}
        {state === 'idle' && (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <p className="text-sm text-stone-400 text-center max-w-xs">
              Generate a personalized draft reply grounded in{' '}
              <span className="text-stone-600 font-medium">{patient.name}'s</span> care
              plan and recent Gut Check data.
            </p>
            <button
              onClick={handleGenerate}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Generate Draft
            </button>
          </div>
        )}

        {/* Loading state */}
        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <Loader2 size={22} className="text-teal-500 animate-spin" />
            <p className="text-sm text-stone-400">Drafting a reply...</p>
          </div>
        )}

        {/* Ready state */}
        {state === 'ready' && (
          <div className="space-y-3">
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={6}
              className="w-full text-sm text-stone-800 border border-stone-200 rounded-lg px-3.5 py-3 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-shadow"
            />

            {/* Disclaimer */}
            <div className="flex items-center gap-1.5">
              <Bot size={11} className="text-stone-400" />
              <p className="text-[11px] text-stone-400">
                AI-drafted · A clinician always reviews and edits before sending
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleRegenerate}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-stone-600 font-medium border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors focus:outline-none"
              >
                <RotateCcw size={13} />
                Regenerate
              </button>

              <div className="flex-1" />

              <button
                onClick={handleSend}
                disabled={sent}
                className={[
                  'flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
                  sent
                    ? 'bg-teal-100 text-teal-600 cursor-default'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm',
                ].join(' ')}
              >
                <Send size={13} />
                {sent ? 'Sent' : 'Send Reply'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
