import type { Patient, IncomingMessage, DraftTone } from '../types';

export interface DraftResult {
  draft: string;
  fallback: boolean;
}

export async function generateDraft(
  patient: Patient,
  message: IncomingMessage,
  tone: DraftTone = 'Reassuring'
): Promise<DraftResult> {
  try {
    const res = await fetch('/api/draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient, message, tone }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return { draft: buildClientFallback(patient, message), fallback: true };
  }
}

function buildClientFallback(patient: Patient, message: IncomingMessage): string {
  const firstName = patient.name.split(' ')[0];
  const { category } = message;

  const fallbacks: Record<string, string> = {
    'Red flag — escalate': `Hi ${firstName}, thank you for reaching out right away — please don't wait on this. What you're describing needs urgent medical attention. Please contact your physician immediately, go to your nearest urgent care or emergency room, or call 911 if symptoms feel severe. We will follow up with you closely once you've been seen and are safe.`,
    'Symptom flare': `Hi ${firstName}, I'm so sorry to hear you're going through a rough patch — flares are incredibly frustrating, especially when you've been doing the work. I'd love to figure out what might be triggering this with you. Can you walk me through what you've eaten in the past 24–48 hours and whether anything in your routine or stress levels has shifted? That context will help me give you the most targeted guidance.`,
    'Diet/nutrition question': `Hi ${firstName}, great question — and I love that you're thinking this through! Your care plan gives us a solid foundation to work from here. Let me put together some specific guidance and follow up with you shortly. In the meantime, keep logging in your daily Gut Check — the more data we have, the better we can tailor your next steps.`,
    'Medication/supplement question': `Hi ${firstName}, thanks so much for checking before adding anything new — that's exactly the right approach. For questions about supplements and medications, I'd want to coordinate with your broader care team to rule out any interactions. I'll flag this for clinical review and get back to you with guidance. Is there anything else on your mind in the meantime?`,
    'Logistics/scheduling': `Hi ${firstName}, of course — no problem at all! I'll pass this along to our care coordination team and they'll be in touch shortly with options. Is there anything else I can help you with today?`,
    'Encouragement/check-in': `Hi ${firstName}, thank you so much for sharing this with us — it truly means a lot, and we're so glad you did. Your feelings are completely valid and we're here for every part of this journey, including the harder days. You've made real, meaningful progress, and that doesn't disappear on a tough day. What would feel most supportive right now?`,
  };

  return (
    fallbacks[category] ||
    `Hi ${firstName}, thanks so much for your message. I'll review this carefully and get back to you with a thoughtful response shortly. Please don't hesitate to reach out if anything feels urgent in the meantime.`
  );
}
