import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IntakeState } from "@/types/intake";

const initialIntake: IntakeState = {
  contact_id: null,
  submitted_at: null,
  intake_version: "v1",
  about_you: { full_legal_name: "", phone: "", email: "", dob: "" },
  address: { street: "", city: "", state: "", postal_code: "" },
  occupation: "",
  emergency_contact: { name: "", relationship: "", phone: "" },
  primary_care_provider: {
    provider_name: "",
    clinic_name: "",
    may_contact: null,
    none: false,
  },
  medical_history: { diagnoses: [], diagnosis_details: "" },
  medications: "",
  allergies: "",
  lifestyle: { tobacco: null, alcohol: null },
  hormone_therapy: { used_before: null, details: "" },
  symptoms: { physical: [], psychological: [], sexual: [] },
  visit: { primary_reason: "", primary_reason_other: "", symptom_duration: "" },
  referral_source: "",
  consents: {
    info_accurate: false,
    authorize_treatment: false,
    telemedicine: false,
    privacy_practices: false,
  },
  signature: { typed_name: "", signed_at: null },
};

const formatPhoneRaw = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const formatDobInput = (raw: string): string => {
  if (!raw) return "";
  // ISO YYYY-MM-DD
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[2]}/${iso[3]}/${iso[1]}`;
  // Already MM/DD/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) return raw;
  // Digits only
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 8) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  }
  return raw;
};

interface IntakeStore extends IntakeState {
  currentStep: number;
  hasHydrated: boolean;
  setField: (path: string, value: unknown) => void;
  setMany: (updates: Array<{ path: string; value: unknown }>) => void;
  setStep: (n: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  loadFromUrlParams: () => void;
  _markHydrated: () => void;
}

const setByPath = <T extends object>(obj: T, path: string, value: unknown): T => {
  const parts = path.split(".");
  const root: any = { ...obj };
  let cursor: any = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    cursor[key] = Array.isArray(cursor[key]) ? [...cursor[key]] : { ...cursor[key] };
    cursor = cursor[key];
  }
  cursor[parts[parts.length - 1]] = value;
  return root;
};

export const useIntakeStore = create<IntakeStore>()(
  persist(
    (set, get) => ({
      ...initialIntake,
      currentStep: 1,
      hasHydrated: false,

      setField: (path, value) => {
        set((state) => setByPath(state, path, value));
      },

      setMany: (updates) => {
        set((state) => {
          let next: any = state;
          for (const u of updates) next = setByPath(next, u.path, u.value);
          return next;
        });
      },

      setStep: (n) => set({ currentStep: Math.max(1, Math.min(20, n)) }),

      nextStep: () =>
        set((s) => ({ currentStep: Math.min(20, s.currentStep + 1) })),

      prevStep: () =>
        set((s) => ({ currentStep: Math.max(1, s.currentStep - 1) })),

      resetForm: () =>
        set({
          ...initialIntake,
          currentStep: 1,
          hasHydrated: true,
        }),

      _markHydrated: () => set({ hasHydrated: true }),

      loadFromUrlParams: () => {
        if (typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        if (params.toString().length === 0) return;

        const first = params.get("first_name") ?? "";
        const last = params.get("last_name") ?? "";
        const fullFromParts = [first, last].filter(Boolean).join(" ").trim();
        const phoneRaw = params.get("phone") ?? "";
        const email = params.get("email") ?? "";
        const dobRaw = params.get("dob") ?? "";
        const contactId = params.get("contact_id");

        const current = get();
        let next: Partial<IntakeState> & { about_you: IntakeState["about_you"] } = {
          about_you: { ...current.about_you },
        };

        if (fullFromParts) next.about_you.full_legal_name = fullFromParts;
        if (phoneRaw) next.about_you.phone = formatPhoneRaw(phoneRaw);
        if (email) next.about_you.email = email;
        if (dobRaw) next.about_you.dob = formatDobInput(dobRaw);
        if (contactId) next.contact_id = contactId;

        set((state) => ({ ...state, ...next }));

        // If all four are now present, skip About You (step 2) → start at step 3
        const a = get().about_you;
        const allFour =
          a.full_legal_name.trim() &&
          a.phone.trim() &&
          a.email.trim() &&
          a.dob.trim();
        if (allFour && get().currentStep < 3) {
          set({ currentStep: 3 });
        }
      },
    }),
    {
      name: "mwc_intake_v1",
      storage: createJSONStorage(() => localStorage),
      // Persist everything EXCEPT currentStep and hasHydrated
      partialize: (state) => {
        const { currentStep, hasHydrated, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        state?._markHydrated();
      },
    }
  )
);

/** Check if the persisted store has any meaningful data (used by resume prompt). */
export const hasResumableData = (state: IntakeState): boolean => {
  const a = state.about_you;
  return Boolean(a.full_legal_name.trim() || a.email.trim() || a.phone.trim());
};

/** Heuristic: estimate the last logically-completed step from the data. */
export const estimateResumeStep = (state: IntakeState): number => {
  let step = 1;
  const a = state.about_you;
  if (a.full_legal_name && a.phone && a.email && a.dob) step = 3;
  if (state.address.street && state.address.city) step = 4;
  if (state.occupation) step = 5;
  if (state.emergency_contact.name) step = 6;
  if (state.primary_care_provider.provider_name || state.primary_care_provider.none) step = 7;
  if (state.medical_history.diagnoses.length > 0) step = 8;
  if (state.medical_history.diagnosis_details) step = 9;
  if (state.medications) step = 10;
  if (state.allergies) step = 11;
  if (state.lifestyle.tobacco && state.lifestyle.alcohol) step = 12;
  if (state.hormone_therapy.used_before !== null) step = 13;
  if (state.symptoms.physical.length > 0) step = 14;
  if (state.symptoms.psychological.length > 0) step = 15;
  if (state.symptoms.sexual.length > 0) step = 16;
  if (state.visit.primary_reason) step = 17;
  if (state.visit.symptom_duration) step = 18;
  if (state.referral_source) step = 19;
  return Math.min(step, 19);
};
