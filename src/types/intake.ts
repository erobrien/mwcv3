export type YesNoUrgent = "yes" | "no" | "urgent_only" | null;
export type TobaccoUse = "yes" | "no" | "former" | null;
export type AlcoholUse = "yes" | "no" | "occasionally" | null;

export interface IntakeState {
  contact_id: string | null;
  submitted_at: string | null;
  intake_version: "v1";
  about_you: {
    full_legal_name: string;
    phone: string;
    email: string;
    dob: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
  };
  occupation: string;
  emergency_contact: {
    name: string;
    relationship: string;
    phone: string;
  };
  primary_care_provider: {
    provider_name: string;
    clinic_name: string;
    may_contact: YesNoUrgent;
    none: boolean;
  };
  medical_history: {
    diagnoses: string[];
    diagnosis_details: string;
  };
  medications: string;
  allergies: string;
  lifestyle: {
    tobacco: TobaccoUse;
    alcohol: AlcoholUse;
  };
  hormone_therapy: {
    used_before: boolean | null;
    details: string;
  };
  symptoms: {
    physical: string[];
    psychological: string[];
    sexual: string[];
  };
  visit: {
    primary_reason: string;
    primary_reason_other: string;
    symptom_duration: string;
  };
  referral_source: string;
  consents: {
    info_accurate: boolean;
    authorize_treatment: boolean;
    telemedicine: boolean;
    privacy_practices: boolean;
  };
  signature: {
    typed_name: string;
    signed_at: string | null;
  };
}

export const TOTAL_STEPS = 20;

/** Map a step (1–20) to a phase index (0 empty, 1 About, 2 History, 3 Symptoms, 4 Consent). */
export const phaseForStep = (step: number): number => {
  if (step <= 1) return 0;
  if (step <= 6) return 1;
  if (step <= 12) return 2;
  if (step <= 18) return 3;
  return 4;
};

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
}
