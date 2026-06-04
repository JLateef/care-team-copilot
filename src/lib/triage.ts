import type { MessageCategory, Urgency } from '../types';

const RED_FLAG_PATTERNS: [RegExp, string][] = [
  [/blood\s*(in|in\s*my)?\s*(stool|poop|bowel|toilet)/i, 'mentions blood in stool'],
  [/bloody\s*(stool|poop|diarrhea|bowel)/i, 'mentions bloody stool'],
  [/black\s*(stool|poop)|tarry\s*stool/i, 'mentions black/tarry stool'],
  [/dark\s*red\s*blood/i, 'mentions dark red blood'],
  [/severe\s*(abdominal|stomach|belly|gut)\s*pain/i, 'reports severe abdominal pain'],
  [/can't\s*keep\s*(anything|food|water|fluids)\s*down/i, 'unable to keep fluids down'],
  [/vomit(ed|ing)\s*(four|4|five|5|six|6|\d+)\s*times/i, 'persistent vomiting'],
  [/can't\s*stop\s*vomit/i, 'persistent vomiting'],
  [/chest\s*pain/i, 'reports chest pain'],
  [/self.{0,5}harm/i, 'self-harm mention'],
  [/rapid\s*weight\s*loss/i, 'reports rapid weight loss'],
  [/dehydrat/i, 'signs of dehydration'],
];

const SYMPTOM_FLARE_PATTERNS = [
  /flare/i,
  /flaring/i,
  /cramping/i,
  /worse\s*(than\s*usual|today|this\s*week|lately)/i,
  /symptoms\s*(are\s*)?(back|returning|worsening)/i,
  /bloating.*worse/i,
  /worse.*bloating/i,
  /diarrhea/i,
  /constipat/i,
  /nausea/i,
  /vomit/i,
  /rough\s*(night|day|week)/i,
];

const DIET_PATTERNS = [
  /low.?fodmap/i,
  /gluten/i,
  /fiber/i,
  /trigger\s*food/i,
  /meal\s*(idea|plan|prep)/i,
  /eating|eat\b/i,
  /diet/i,
  /food/i,
  /oats|oatmeal/i,
  /protein/i,
  /recipe/i,
  /reintroduc/i,
  /carbohydrate\s*diet/i,
];

const MED_PATTERNS = [
  /supplement/i,
  /medication/i,
  /probiotics?/i,
  /enzyme/i,
  /berberine/i,
  /glp.?1/i,
  /prescription/i,
  /vitamin/i,
  /melatonin/i,
  /omega.?3/i,
  /pill|tablet|capsule/i,
];

const LOGISTICS_PATTERNS = [
  /reschedul/i,
  /appointment/i,
  /visit/i,
  /cancel/i,
  /availab/i,
  /billing|bill|insurance|copay/i,
  /time slot/i,
];

const ENCOURAGEMENT_PATTERNS = [
  /just\s*(wanted\s*to\s*share|sharing)/i,
  /exciting\s*news/i,
  /down\s*\d+\s*(lbs|pounds)/i,
  /hard\s*day/i,
  /discouraged/i,
  /overwhelm/i,
  /thank\s*you/i,
  /progress/i,
  /impossible/i,
  /venting|vent\b/i,
];

export interface TriageResult {
  category: MessageCategory;
  urgency: Urgency;
  triageReason?: string;
}

export function triageMessage(text: string): TriageResult {
  for (const [pattern, reason] of RED_FLAG_PATTERNS) {
    if (pattern.test(text)) {
      return {
        category: 'Red flag — escalate',
        urgency: 'Urgent',
        triageReason: `Flagged urgent: ${reason} — requires immediate physician evaluation.`,
      };
    }
  }

  if (MED_PATTERNS.some((p) => p.test(text))) {
    return { category: 'Medication/supplement question', urgency: 'Routine' };
  }

  if (LOGISTICS_PATTERNS.some((p) => p.test(text))) {
    return { category: 'Logistics/scheduling', urgency: 'Low' };
  }

  if (ENCOURAGEMENT_PATTERNS.some((p) => p.test(text))) {
    return { category: 'Encouragement/check-in', urgency: 'Low' };
  }

  if (SYMPTOM_FLARE_PATTERNS.some((p) => p.test(text))) {
    return { category: 'Symptom flare', urgency: 'Routine' };
  }

  if (DIET_PATTERNS.some((p) => p.test(text))) {
    return { category: 'Diet/nutrition question', urgency: 'Routine' };
  }

  return { category: 'Encouragement/check-in', urgency: 'Low' };
}

export const urgencyOrder: Record<Urgency, number> = {
  Urgent: 0,
  Routine: 1,
  Low: 2,
};

export function sortMessages<T extends { urgency: Urgency; timestamp: Date }>(
  messages: T[]
): T[] {
  return [...messages].sort((a, b) => {
    const uDiff = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    if (uDiff !== 0) return uDiff;
    return a.timestamp.getTime() - b.timestamp.getTime();
  });
}

export function formatTimeAgo(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) {
    const rem = diffMins % 60;
    return rem > 0 ? `${diffHrs}h ${rem}m ago` : `${diffHrs}h ago`;
  }
  const diffDays = Math.floor(diffHrs / 24);
  return diffDays === 1 ? 'Yesterday' : `${diffDays}d ago`;
}
