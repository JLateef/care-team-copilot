import type { Patient, IncomingMessage } from '../types';

const now = Date.now();
const minsAgo = (m: number) => new Date(now - m * 60 * 1000);
const hoursAgo = (h: number, m = 0) => new Date(now - (h * 60 + m) * 60 * 1000);
const daysAgo = (d: number, h = 0) => new Date(now - (d * 24 * 60 + h * 60) * 60 * 1000);

export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Sarah Chen',
    primaryCondition: 'IBS',
    carePlanSummary:
      'Phase 2 low-FODMAP reintroduction in progress; daily diaphragmatic breathing (5 min). Targeting 25g fiber with emphasis on soluble sources like oats and psyllium.',
    recentSymptoms: {
      bloating: 'moderate',
      abdominalPain: 'mild',
      bowelRegularity: 'improving',
      stressLevel: 'moderate',
      checkInStreak: 12,
    },
    assignedClinicianRole: 'Dietitian',
    weeksEnrolled: 8,
  },
  {
    id: 'p2',
    name: 'Maria Rodriguez',
    primaryCondition: 'IBD',
    carePlanSummary:
      'Post-flare remission maintenance on Mediterranean-inspired anti-inflammatory diet. Avoiding raw vegetables and high-residue foods; monitoring CRP trend and fatigue levels.',
    recentSymptoms: {
      flareActivity: 'low',
      bowelUrgency: 'mild',
      fatigue: 'moderate',
      dietAdherence: 'good',
      checkInStreak: 31,
    },
    assignedClinicianRole: 'Nurse',
    weeksEnrolled: 15,
  },
  {
    id: 'p3',
    name: 'Jennifer Park',
    primaryCondition: 'GERD',
    carePlanSummary:
      'GERD management: 3-hour pre-bed fasting cutoff, elimination of trigger foods (coffee, alcohol, spicy foods, citrus). Head-of-bed elevation protocol in place.',
    recentSymptoms: {
      refluxFrequency: '2–3x/week',
      heartburn: 'mild',
      nausea: 'none',
      dietAdherence: 'fair',
      checkInStreak: 4,
    },
    assignedClinicianRole: 'Dietitian',
    weeksEnrolled: 6,
  },
  {
    id: 'p4',
    name: 'Amanda Wilson',
    primaryCondition: 'MASLD (fatty liver)',
    carePlanSummary:
      'Mediterranean diet with calorie-modest approach; goal of 30 min aerobic activity 5x/week. Strict no-alcohol, minimal ultra-processed foods; weekly weigh-in tracking.',
    recentSymptoms: {
      rightSideDiscomfort: 'none',
      fatigue: 'mild',
      dietAdherence: 'good',
      weightTrend: 'down 4.2 lbs (4 wks)',
      checkInStreak: 8,
    },
    assignedClinicianRole: 'Dietitian',
    weeksEnrolled: 11,
  },
  {
    id: 'p5',
    name: 'Lisa Thompson',
    primaryCondition: 'Obesity',
    carePlanSummary:
      'Phase 1 dietary foundation: structured meals 3x/day, no restriction yet. Building sustainable habits; tracking hunger and fullness cues using the hunger scale.',
    recentSymptoms: {
      hungerControl: 'moderate',
      energyLevel: 'low',
      moodAroundFood: 'improving',
      checkInStreak: 6,
    },
    assignedClinicianRole: 'Nurse',
    weeksEnrolled: 4,
  },
  {
    id: 'p6',
    name: 'Patricia Davis',
    primaryCondition: 'SIBO',
    carePlanSummary:
      'Post-antibiotic SIBO maintenance: low-fermentation diet, prokinetic nutrition timing (4-hr meal spacing). Systematic reintroduction of fermentable foods in progress.',
    recentSymptoms: {
      bloating: 'mild',
      postMealFullness: 'improving',
      belching: 'occasional',
      dietAdherence: 'very good',
      checkInStreak: 47,
    },
    assignedClinicianRole: 'Dietitian',
    weeksEnrolled: 20,
  },
  {
    id: 'p7',
    name: 'Rachel Kim',
    primaryCondition: 'Celiac',
    carePlanSummary:
      'Strict gluten-free diet for intestinal healing; iron and B12 supplementation in place. Oats currently excluded pending formal celiac-oat tolerance assessment.',
    recentSymptoms: {
      GISymptoms: 'minimal',
      fatigue: 'improving',
      ironLevels: 'trending up',
      checkInStreak: 19,
    },
    assignedClinicianRole: 'Dietitian',
    weeksEnrolled: 13,
  },
  {
    id: 'p8',
    name: 'Olivia Martinez',
    primaryCondition: 'IBS',
    carePlanSummary:
      'Phase 1 low-FODMAP elimination diet; gut-directed hypnotherapy audio 20 min/day. Mood-bowel connection journaling and trigger identification in progress.',
    recentSymptoms: {
      bloating: 'mild',
      diarrhea: 'occasional',
      abdominalPain: 'mild',
      stressLevel: 'high',
      checkInStreak: 3,
    },
    assignedClinicianRole: 'Nurse',
    weeksEnrolled: 5,
  },
  {
    id: 'p9',
    name: 'David Johnson',
    primaryCondition: 'IBD',
    carePlanSummary:
      "Crohn's disease in remission; low-residue diet during vulnerability periods. Anti-inflammatory omega-3 foods emphasized; probiotic protocol (Lactobacillus GG) ongoing.",
    recentSymptoms: {
      flareActivity: 'none',
      bowelFrequency: 'normal',
      fatigue: 'mild',
      dietAdherence: 'good',
      checkInStreak: 25,
    },
    assignedClinicianRole: 'Nurse',
    weeksEnrolled: 18,
  },
  {
    id: 'p10',
    name: 'Michael Chen',
    primaryCondition: 'MASLD (fatty liver)',
    carePlanSummary:
      'Low-sugar Mediterranean plan; eliminating fructose-heavy processed foods. Unsweetened coffee (2 cups/day) included per MASLD benefit data. ALT trend monitoring quarterly.',
    recentSymptoms: {
      fatigue: 'moderate',
      rightFlankDiscomfort: 'none',
      dietAdherence: 'fair',
      weightTrend: 'down 2.1 lbs (4 wks)',
      checkInStreak: 11,
    },
    assignedClinicianRole: 'Dietitian',
    weeksEnrolled: 9,
  },
  {
    id: 'p11',
    name: 'Keisha Williams',
    primaryCondition: 'Obesity',
    carePlanSummary:
      'Plate-method meal structure; evening snack substitution protocol. Protein adequacy target 25–30g per meal; sleep hygiene coaching as secondary focus.',
    recentSymptoms: {
      hungerControl: 'mild',
      energyLevel: 'moderate',
      moodAroundFood: 'positive',
      checkInStreak: 14,
    },
    assignedClinicianRole: 'Nurse',
    weeksEnrolled: 7,
  },
  {
    id: 'p12',
    name: 'Fatima Hassan',
    primaryCondition: 'GERD',
    carePlanSummary:
      'Initial GERD protocol: personal trigger food identification via elimination diary. Meal timing and portion reduction guidance; head-of-bed elevation (6 inches) started week 1.',
    recentSymptoms: {
      refluxFrequency: '4–5x/week',
      heartburn: 'moderate',
      nausea: 'mild',
      dietAdherence: 'good',
      checkInStreak: 9,
    },
    assignedClinicianRole: 'Dietitian',
    weeksEnrolled: 3,
  },
];

export const patientMap: Record<string, Patient> = Object.fromEntries(
  patients.map((p) => [p.id, p])
);

export const initialMessages: IncomingMessage[] = [
  // ── RED FLAGS / URGENT ────────────────────────────────────────────────────
  {
    id: 'm1',
    patientId: 'p2',
    timestamp: hoursAgo(2, 14),
    text: "Hi, I'm really scared right now. When I went to the bathroom this morning there was dark red blood in my stool — it happened twice. I don't know if it's related to my Crohn's but it's never been like this before. Please tell me what I should do.",
    category: 'Red flag — escalate',
    urgency: 'Urgent',
    status: 'Needs reply',
    triageReason: 'Flagged urgent: mentions blood in stool — GI alarm feature requiring immediate physician evaluation.',
  },
  {
    id: 'm2',
    patientId: 'p4',
    timestamp: minsAgo(47),
    text: "I've been having severe abdominal pain on my right side for the past 6 hours and I can't keep anything down — not even water. I've vomited four times since last night. I'm really worried. Is this something to do with my liver condition?",
    category: 'Red flag — escalate',
    urgency: 'Urgent',
    status: 'Needs reply',
    triageReason: 'Flagged urgent: severe abdominal pain + persistent vomiting + inability to tolerate fluids — potential medical emergency.',
  },

  // ── ROUTINE ───────────────────────────────────────────────────────────────
  {
    id: 'm3',
    patientId: 'p7',
    timestamp: daysAgo(1, 4),
    text: "Quick question — I found a brand of oats labeled 'certified gluten-free.' My mom keeps saying I should try them since I miss oatmeal so much. Are certified gluten-free oats actually safe for someone with celiac, or is it still too risky? I don't want to undo all my progress.",
    category: 'Diet/nutrition question',
    urgency: 'Routine',
    status: 'Needs reply',
  },
  {
    id: 'm4',
    patientId: 'p3',
    timestamp: hoursAgo(23),
    text: "I went to my cousin's birthday party over the weekend and kind of threw caution to the wind — cake, pizza, wine, the works. I know I shouldn't have. Now my reflux is terrible, way worse than when I started the program. What can I do to help reset? I feel like I've undone everything.",
    category: 'Diet/nutrition question',
    urgency: 'Routine',
    status: 'Needs reply',
  },
  {
    id: 'm5',
    patientId: 'p1',
    timestamp: hoursAgo(18),
    text: "My bloating has been really uncomfortable the past three days — definitely worse than usual. I've been following the Phase 2 reintroduction list really carefully, or at least I thought I was. Could I be reacting to something that's supposed to be safe? Is it possible some of the foods I'm reintroducing aren't working for me?",
    category: 'Symptom flare',
    urgency: 'Routine',
    status: 'Needs reply',
  },
  {
    id: 'm6',
    patientId: 'p10',
    timestamp: hoursAgo(15),
    text: 'Hi! My coworker told me about berberine and said it\'s supposed to be great for metabolic conditions and the liver. He\'s been taking it for a few months and swears by it. Would that be something worth adding to my plan? I looked it up and there seems to be real research behind it.',
    category: 'Medication/supplement question',
    urgency: 'Routine',
    status: 'Needs reply',
  },
  {
    id: 'm7',
    patientId: 'p9',
    timestamp: hoursAgo(12),
    text: "I've been reading a lot lately and came across the Specific Carbohydrate Diet for IBD — people in an online forum swear by it for Crohn's. Is this something we should be trying? I sometimes wonder if my current plan is doing enough to keep me in remission long-term.",
    category: 'Diet/nutrition question',
    urgency: 'Routine',
    status: 'Needs reply',
  },
  {
    id: 'm8',
    patientId: 'p8',
    timestamp: hoursAgo(9),
    text: "I had a really rough night — major cramping and diarrhea that started after dinner. I think it might have been the garlic in the pasta sauce but I'm not 100% sure. How do I figure out if it was a FODMAP trigger or just something else? I was supposed to be keeping a trigger log but I forgot to write it down.",
    category: 'Symptom flare',
    urgency: 'Routine',
    status: 'Needs reply',
  },
  {
    id: 'm9',
    patientId: 'p12',
    timestamp: hoursAgo(7),
    text: "I found a digestive enzyme supplement at the natural health store that's supposed to help with GERD and bloating. I started taking it a few days ago. Is it okay to keep taking it alongside my other medications? I didn't want to ask my regular doctor because she always seems a little dismissive about supplements.",
    category: 'Medication/supplement question',
    urgency: 'Routine',
    status: 'Needs reply',
  },
  {
    id: 'm10',
    patientId: 'p11',
    timestamp: hoursAgo(5),
    text: "I'm really struggling with meal ideas. I work 12-hour shifts at the hospital and by the time I get home I'm completely wiped. I can't bring myself to cook so I end up ordering something that probably isn't on plan. Can you help me come up with some quick grab-and-go options that actually fit the plate method?",
    category: 'Diet/nutrition question',
    urgency: 'Routine',
    status: 'Needs reply',
  },
  {
    id: 'm11',
    patientId: 'p6',
    timestamp: hoursAgo(4),
    text: "I'm a little worried — the bloating and fullness after eating are back. It's not as severe as at the very beginning but it's definitely there, even after smaller portions. I thought we'd finally gotten this under control. Could the foods I'm reintroducing be causing this flare-up? I've been so careful.",
    category: 'Symptom flare',
    urgency: 'Routine',
    status: 'Needs reply',
  },
  {
    id: 'm12',
    patientId: 'p5',
    timestamp: hoursAgo(2, 30),
    text: "My primary care doctor mentioned at my last appointment that I might be a candidate for a GLP-1 medication for weight loss. She said to check with my care team here first. Can you explain what that is and how it would work with what I'm already doing in this program? I'm not sure what to think about it.",
    category: 'Medication/supplement question',
    urgency: 'Routine',
    status: 'Needs reply',
  },

  // ── LOW ───────────────────────────────────────────────────────────────────
  {
    id: 'm13',
    patientId: 'p3',
    timestamp: daysAgo(2),
    text: "Hi! I need to reschedule my video visit that's coming up next Thursday the 11th — something came up at work that I can't move. Is there a way to find a new time? What does availability usually look like?",
    category: 'Logistics/scheduling',
    urgency: 'Low',
    status: 'Needs reply',
  },
  {
    id: 'm14',
    patientId: 'p11',
    timestamp: daysAgo(1, 6),
    text: "Just had to share some exciting news — I'm officially down 8 pounds since starting the program! I know it's not just about the number on the scale but it feels so good to see it moving in the right direction. And honestly, the plate method is starting to feel more natural. Thank you so much for sticking with me!",
    category: 'Encouragement/check-in',
    urgency: 'Low',
    status: 'Needs reply',
  },
  {
    id: 'm15',
    patientId: 'p10',
    timestamp: daysAgo(1, 3),
    text: "Hey, I got an Explanation of Benefits from my insurance that looks different from what I expected. It mentions a copay amount I didn't know I'd owe. Who should I reach out to about billing questions? I don't want this to affect my enrollment in the program.",
    category: 'Logistics/scheduling',
    urgency: 'Low',
    status: 'Needs reply',
  },
  {
    id: 'm16',
    patientId: 'p1',
    timestamp: hoursAgo(6),
    text: "I'm having a really hard day today. Some days the food restrictions feel completely overwhelming — like I can't have a normal meal without analyzing every single ingredient. I know I'm making progress but today everything just feels impossible. Sorry for dumping this on you. I just didn't know who else to tell.",
    category: 'Encouragement/check-in',
    urgency: 'Low',
    status: 'Needs reply',
  },
];
