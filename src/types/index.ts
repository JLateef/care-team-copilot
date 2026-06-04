export type Condition =
  | 'IBS'
  | 'IBD'
  | 'GERD'
  | 'MASLD (fatty liver)'
  | 'Obesity'
  | 'SIBO'
  | 'Celiac';

export type ClinicianRole = 'Dietitian' | 'Nurse';

export type MessageCategory =
  | 'Symptom flare'
  | 'Diet/nutrition question'
  | 'Medication/supplement question'
  | 'Logistics/scheduling'
  | 'Encouragement/check-in'
  | 'Red flag — escalate';

export type Urgency = 'Urgent' | 'Routine' | 'Low';
export type MessageStatus = 'Needs reply' | 'Replied';
export type DraftTone = 'Reassuring' | 'Direct';

export interface Patient {
  id: string;
  name: string;
  primaryCondition: Condition;
  carePlanSummary: string;
  recentSymptoms: Record<string, string | number>;
  assignedClinicianRole: ClinicianRole;
  weeksEnrolled: number;
}

export interface IncomingMessage {
  id: string;
  patientId: string;
  timestamp: Date;
  text: string;
  category: MessageCategory;
  urgency: Urgency;
  status: MessageStatus;
  triageReason?: string;
}
