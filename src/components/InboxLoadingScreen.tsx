import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const DURATION_MS = 4600;

const STATUS_MESSAGES = [
  'Connecting to care team records...',
  'Syncing Gut Check tracker data...',
  'Loading patient message queue...',
  'Applying triage rules...',
  'Preparing your inbox...',
];

export default function InboxLoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION_MS) * 100, 100);
      setProgress(pct);

      const idx = Math.min(
        Math.floor((elapsed / DURATION_MS) * STATUS_MESSAGES.length),
        STATUS_MESSAGES.length - 1
      );
      setStatusIdx(idx);

      if (pct >= 100) {
        setDone(true);
        setTimeout(onComplete, 300);
        return;
      }
      requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center shadow-sm">
            <Activity size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-stone-900 font-semibold text-xl tracking-tight">Salvo Health</span>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-none"
              style={{ width: `${progress}%`, transition: 'width 0.08s linear' }}
            />
          </div>
        </div>

        {/* Status text */}
        <div className="text-center h-6">
          <p
            key={statusIdx}
            className="text-sm text-stone-500 animate-fade-in"
            style={{ animationDelay: '0ms', animationDuration: '0.4s' }}
          >
            {done ? 'Ready!' : STATUS_MESSAGES[statusIdx]}
          </p>
        </div>

        {/* Animated dots */}
        {!done && (
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 120}ms`, animationDuration: '0.9s' }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
