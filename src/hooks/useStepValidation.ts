import { useMemo } from "react";
import { useIntakeStore } from "@/store/intakeStore";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
const digits = (s: string) => s.replace(/\D/g, "");

const validateDob = (value: string): string => {
  if (!value) return "Date of birth is required";
  const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return "Use format MM/DD/YYYY";
  const month = +m[1];
  const day = +m[2];
  const year = +m[3];
  const now = new Date().getFullYear();
  if (month < 1 || month > 12) return "Invalid month";
  if (day < 1 || day > 31) return "Invalid day";
  if (year < 1920) return "Year must be 1920 or later";
  if (year > now - 18) return "You must be 18 or older";
  // Basic real-date check
  const test = new Date(year, month - 1, day);
  if (test.getFullYear() !== year || test.getMonth() !== month - 1 || test.getDate() !== day)
    return "Please enter a real date";
  return "";
};

export interface StepValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Per-step validation rules. Returns a frozen errors map and isValid.
 * Components decide WHEN to display errors via useShowErrors().
 */
export const useStepValidation = (stepNumber: number): StepValidationResult => {
  const state = useIntakeStore();

  return useMemo<StepValidationResult>(() => {
    const errors: Record<string, string> = {};
    const a = state.about_you;
    const addr = state.address;
    const ec = state.emergency_contact;
    const pcp = state.primary_care_provider;
    const sig = state.signature;
    const consents = state.consents;

    switch (stepNumber) {
      case 1:
        break;

      case 2: {
        if (!a.full_legal_name.trim()) errors["about_you.full_legal_name"] = "Required";
        if (digits(a.phone).length !== 10)
          errors["about_you.phone"] = "Enter a 10-digit phone number";
        if (!isEmail(a.email)) errors["about_you.email"] = "Enter a valid email";
        const dobErr = validateDob(a.dob);
        if (dobErr) errors["about_you.dob"] = dobErr;
        break;
      }

      case 3: {
        if (!addr.street.trim()) errors["address.street"] = "Required";
        if (!addr.city.trim()) errors["address.city"] = "Required";
        if (!addr.state.trim()) errors["address.state"] = "Required";
        if (!addr.postal_code.trim()) errors["address.postal_code"] = "Required";
        else if (!/^\d{5}(-\d{4})?$/.test(addr.postal_code.trim()))
          errors["address.postal_code"] = "Enter a valid ZIP";
        break;
      }

      case 4:
        if (!state.occupation.trim()) errors["occupation"] = "Required";
        break;

      case 5:
        if (!ec.name.trim()) errors["emergency_contact.name"] = "Required";
        if (!ec.relationship.trim()) errors["emergency_contact.relationship"] = "Required";
        if (digits(ec.phone).length !== 10)
          errors["emergency_contact.phone"] = "Enter a 10-digit phone number";
        break;

      case 6: {
        if (pcp.none) break;
        if (!pcp.provider_name.trim()) errors["primary_care_provider.provider_name"] = "Required";
        if (!pcp.clinic_name.trim()) errors["primary_care_provider.clinic_name"] = "Required";
        if (!pcp.may_contact) errors["primary_care_provider.may_contact"] = "Choose one";
        break;
      }

      case 7:
      case 8:
      case 9:
      case 10:
        // Always valid (zero selections allowed; quick-fill provides "None")
        break;

      case 11:
        if (!state.lifestyle.tobacco) errors["lifestyle.tobacco"] = "Choose one";
        if (!state.lifestyle.alcohol) errors["lifestyle.alcohol"] = "Choose one";
        break;

      case 12:
        if (state.hormone_therapy.used_before === null)
          errors["hormone_therapy.used_before"] = "Choose Yes or No";
        break;

      case 13:
      case 14:
      case 15:
        // Optional symptom checklists
        break;

      case 16: {
        if (!state.visit.primary_reason)
          errors["visit.primary_reason"] = "Choose one";
        else if (
          state.visit.primary_reason === "Something else" &&
          !state.visit.primary_reason_other.trim()
        )
          errors["visit.primary_reason_other"] = "Please describe briefly";
        break;
      }

      case 17:
        if (!state.visit.symptom_duration) errors["visit.symptom_duration"] = "Choose one";
        break;

      case 18:
        // Optional / skippable
        break;

      case 19: {
        if (!consents.info_accurate) errors["consents.info_accurate"] = "Required";
        if (!consents.authorize_treatment) errors["consents.authorize_treatment"] = "Required";
        if (!consents.telemedicine) errors["consents.telemedicine"] = "Required";
        if (!consents.privacy_practices) errors["consents.privacy_practices"] = "Required";

        const typed = sig.typed_name.trim().replace(/\s+/g, " ").toLowerCase();
        const expected = a.full_legal_name.trim().replace(/\s+/g, " ").toLowerCase();
        if (!typed) errors["signature.typed_name"] = "Required";
        else if (typed !== expected)
          errors["signature.typed_name"] =
            "Please type your name exactly as entered at the start.";
        break;
      }

      case 20:
        break;
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  }, [state, stepNumber]);
};
