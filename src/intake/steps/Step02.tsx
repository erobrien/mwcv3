import { useState } from "react";
import { StepCard, PrimaryCTA, TextField, PhoneField, EmailField, MaskedDOBField, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const Step02 = ({ onNext }: StepProps) => {
  const a = useIntakeStore((s) => s.about_you);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(2);
  const { shouldShow, markBlur, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const update = (path: string, value: string) => {
    setField(path, value);
    setSavedTrigger((n) => n + 1);
  };

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  return (
    <StepCard h1="ABOUT YOU">
      <h2 className="intake-h2 mb-5">Tell us who you are</h2>
      <div className="space-y-4">
        <TextField label="FULL LEGAL NAME" autoComplete="name" value={a.full_legal_name}
          onChange={(e) => update("about_you.full_legal_name", e.target.value)}
          onBlur={() => markBlur("about_you.full_legal_name")}
          error={errors["about_you.full_legal_name"]} showError={shouldShow("about_you.full_legal_name")} required />
        <PhoneField value={a.phone} onChange={(v) => update("about_you.phone", v)}
          error={errors["about_you.phone"]} showError={shouldShow("about_you.phone")} required />
        <EmailField value={a.email} onChange={(v) => update("about_you.email", v)}
          error={errors["about_you.email"]} showError={shouldShow("about_you.email")} required />
        <MaskedDOBField value={a.dob} onChange={(v) => update("about_you.dob", v)}
          error={errors["about_you.dob"]} showError={shouldShow("about_you.dob")} required />
      </div>
      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue}>Continue</PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step02;
