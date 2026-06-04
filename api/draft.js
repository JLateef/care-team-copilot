import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-sonnet-4-6';

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

function buildSystemPrompt() {
  return `You are a compassionate care team member at Salvo Health, a virtual chronic-care platform specializing in GI and metabolic conditions (IBS, IBD, GERD, MASLD/fatty liver, obesity, SIBO, celiac disease). You help registered dietitians and licensed practical nurses draft replies to patient messages.

VOICE & TONE:
- Warm, supportive, encouraging, and plain-language
- Evidence-based with a food-as-medicine lens
- Reference low-FODMAP phases, brain-gut techniques, and behavioral approaches where appropriate
- Treat patients as capable adults managing real conditions with dignity

HARD GUARDRAILS (never break these):
1. Never diagnose any condition
2. Never prescribe medication or recommend changing a medication dose
3. Stay strictly within dietitian/nurse scope of practice at all times
4. For RED FLAG messages (blood in stool, severe pain, persistent vomiting, signs of dehydration, chest pain, rapid weight loss): ONLY express care and clearly direct the patient to seek urgent or emergency medical care. Do NOT offer self-management advice for the alarming symptom itself.

FORMAT:
- Start with "Hi [first name],"
- 3-5 sentences, warm and conversational
- End with a clear next step or open question
- No headers, no bullet points, no subject lines`;
}

function buildUserPrompt(patient, message, tone) {
  const symptomsText = Object.entries(patient.recentSymptoms)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');

  const toneInstruction =
    tone === 'Direct'
      ? 'Tone: Clear and direct — concise, efficient, still warm but no extra reassurance.'
      : 'Tone: Warm and reassuring — empathetic, encouraging, supportive.';

  return `Patient information:
Name: ${patient.name}
Condition: ${patient.primaryCondition}
Weeks enrolled: ${patient.weeksEnrolled}
Care plan: ${patient.carePlanSummary}
Recent daily Gut Check tracker data: ${symptomsText}

Message from patient:
"${message.text}"

Message category: ${message.category}
${toneInstruction}

Draft a reply for the care team clinician to review. Ground it specifically in this patient's care plan and recent Gut Check data.`;
}

function buildFallbackDraft(patient, message) {
  const firstName = patient.name.split(' ')[0];
  const { category } = message;

  const fallbacks = {
    'Red flag — escalate': `Hi ${firstName}, thank you for reaching out right away — please don't wait on this. What you're describing needs urgent medical attention. Please contact your physician immediately, go to your nearest urgent care or emergency room, or call 911 if symptoms feel severe. We will follow up with you closely once you've been seen and are safe.`,
    'Symptom flare': `Hi ${firstName}, I'm really sorry to hear you're going through a rough patch — flares are so frustrating, especially when you've been working so hard. Looking at your recent check-ins and where you are in your care plan, I want to help us get to the bottom of this together. Can you walk me through what you've eaten in the past 24–48 hours and whether anything in your stress levels or routine has changed? That context will help me give you the most targeted guidance.`,
    'Diet/nutrition question': `Hi ${firstName}, great question — and I love that you're thinking this through carefully! Your care plan gives us a really solid foundation here. Let me put together some specific guidance for you and follow up shortly. In the meantime, keep logging in your daily Gut Check — the more data we have, the better we can tailor your next steps.`,
    'Medication/supplement question': `Hi ${firstName}, thanks so much for checking in before adding anything new — that's exactly the right approach. For questions about specific supplements or medications, I'd want to make sure we coordinate with your broader care team to rule out any interactions. I'll flag this for clinical review and get back to you with guidance soon. Is there anything else on your mind in the meantime?`,
    'Logistics/scheduling': `Hi ${firstName}, of course — no problem at all! I'll pass this along to our care coordination team and they'll be in touch shortly. Is there anything else I can help you with today?`,
    'Encouragement/check-in': `Hi ${firstName}, thank you so much for sharing this with us — it really means a lot, and we're so glad you did. Your feelings are completely valid, and we're here for every part of this journey, including the hard days. You've made real, measurable progress, and that doesn't disappear on a tough day. What would feel most supportive to you right now?`,
  };

  return (
    fallbacks[category] ||
    `Hi ${firstName}, thanks so much for your message. I'll take a careful look at this and get back to you with a thoughtful response shortly. Please don't hesitate to reach out if anything feels urgent in the meantime.`
  );
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { patient, message, tone = 'Reassuring' } = req.body;

  if (!client) {
    return res.json({ draft: buildFallbackDraft(patient, message), fallback: true });
  }

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 512,
      system: buildSystemPrompt(),
      messages: [{ role: 'user', content: buildUserPrompt(patient, message, tone) }],
    });

    const draft =
      response.content[0].type === 'text' ? response.content[0].text : '';
    res.json({ draft, fallback: false });
  } catch (err) {
    console.error('Anthropic API error:', err.message);
    res.json({ draft: buildFallbackDraft(patient, message), fallback: true });
  }
}
