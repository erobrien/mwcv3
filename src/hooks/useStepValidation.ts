import { useCallback, useState } from "react";

export interface StepValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  markTouched: (field: string) => void;
  touched: Set<string>;
}

/**
 * Validation hook stub. Layer 3 will add per-step rules.
 * For now, every step is considered valid.
 */
export const useStepValidation = (_stepNumber: number): StepValidationResult => {
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => {
      if (prev.has(field)) return prev;
      const next = new Set(prev);
      next.add(field);
      return next;
    });
  }, []);

  return {
    isValid: true,
    errors: {},
    markTouched,
    touched,
  };
};
