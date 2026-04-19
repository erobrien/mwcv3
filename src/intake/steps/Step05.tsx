import { useState } from "react";
import { StepCard, PrimaryCTA, TextField, PhoneField, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const Step05 = ({ onNext }: StepProps) => {
  const ec = useIntakeStore((s) => s.emergency_contact);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(5);
  const { shouldShow, markBlur, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const update = (path: string, v: string) => { setField(path, v); setSavedTrigger((n) => n + 1); };

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  return (
    <StepCard h1="EMERGENCY CONTACT">
      <h2 className="intake-h2 mb-5">Who should we call if we can't reach you?</h2>
      <div className="space-y-4">
        <TextField label="CONTACT NAME" autoComplete="name" value={ec.name}
          onChange={(e) => update("emergency_contact.name", e.target.value)}
          onBlur={() => markBlur("emergency_contact.name")}
          error={errors["emergency_contact.name"]} showError={shouldShow("emergency_contact.name")} required />
        <TextField label="RELATIONSHIP" list="rel-suggest" value={ec.relationship}
          onChange={(e) => update("emergency_contact.relationship", e.target.value)}
          onBlur={() => markBlur("emergency_contact.relationship")}
          error={errors["emergency_contact.relationship"]} showError={shouldShow("emergency_contact.relationship")}
          required placeholder="Spouse, son, friend…" />
        <datalist id="rel-suggest">
          {["Spouse", "Partner", "Son", "Daughter", "Sibling", "Parent", "Friend"].map((r) => (
            <option key={r} value={r} />
          ))}
        </datalist>
        <PhoneField value={ec.phone} onChange={(v) => update("emergency_contact.phone", v)}
          error={errors["emergency_contact.phone"]} showError={shouldShow("emergency_contact.phone")} required />
      </div>
      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue}>Continue</PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step05;
