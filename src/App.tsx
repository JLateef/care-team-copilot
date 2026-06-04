import { useState, useMemo, useCallback } from 'react';
import type { IncomingMessage, Urgency } from './types';
import { initialMessages, patientMap } from './data/mockData';
import { sortMessages } from './lib/triage';
import LoadingPage from './components/LoadingPage';
import InboxLoadingScreen from './components/InboxLoadingScreen';
import TopBar from './components/TopBar';
import InboxList from './components/InboxList';
import MessageWorkspace from './components/MessageWorkspace';

type Screen = 'landing' | 'loading' | 'inbox';
type Filter = 'All' | Urgency;

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [messages, setMessages] = useState<IncomingMessage[]>(initialMessages);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [minutesSaved, setMinutesSaved] = useState(0);
  const [filter, setFilter] = useState<Filter>('All');

  const sorted = useMemo(() => sortMessages(messages), [messages]);

  const filtered = useMemo(() => {
    if (filter === 'All') return sorted;
    return sorted.filter((m) => m.urgency === filter);
  }, [sorted, filter]);

  const selectedMessage = useMemo(
    () => messages.find((m) => m.id === selectedMessageId) ?? null,
    [messages, selectedMessageId]
  );
  const selectedPatient = selectedMessage ? patientMap[selectedMessage.patientId] ?? null : null;

  const handleOpenInbox = useCallback(() => setScreen('loading'), []);

  const handleLoadingComplete = useCallback(() => {
    setScreen('inbox');
    // Auto-select first message
    const first = sortMessages(initialMessages)[0];
    if (first) setSelectedMessageId(first.id);
  }, []);

  const handleSelect = useCallback((id: string) => setSelectedMessageId(id), []);

  const handleSend = useCallback((messageId: string) => {
    setMessages((prev) => {
      const updated = prev.map((m) =>
        m.id === messageId ? { ...m, status: 'Replied' as const } : m
      );
      const sorted = sortMessages(updated);
      const idx = sorted.findIndex((m) => m.id === messageId);
      const next = sorted.slice(idx + 1).find((m) => m.status === 'Needs reply');
      if (next) setSelectedMessageId(next.id);
      return updated;
    });
    setMinutesSaved((prev) => prev + 2.5);
  }, []);

  const handleFilterChange = useCallback((f: Filter) => setFilter(f), []);

  if (screen === 'landing') return <LoadingPage onOpen={handleOpenInbox} />;
  if (screen === 'loading')
    return <InboxLoadingScreen onComplete={handleLoadingComplete} />;

  return (
    <div className="h-screen flex flex-col bg-stone-50 overflow-hidden">
      <TopBar
        messages={messages}
        minutesSaved={minutesSaved}
        filter={filter}
        onFilterChange={handleFilterChange}
        onHome={() => setScreen('landing')}
      />

      <div className="flex-1 flex overflow-hidden">
        <InboxList
          messages={filtered}
          selectedMessageId={selectedMessageId}
          onSelect={handleSelect}
          filter={filter}
          onFilterChange={handleFilterChange}
          totalCount={sorted.length}
        />
        <MessageWorkspace
          message={selectedMessage}
          patient={selectedPatient}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
