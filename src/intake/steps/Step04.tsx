import { useState } from "react";
import { StepCard, PrimaryCTA, TextField, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const Step04 = ({ onNext }: StepProps) => {
  const occupation = useIntakeStore((s) => s.occupation);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(4);
  const { shouldShow, markBlur, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  return (
    <StepCard h1="YOUR WORK">
      <h2 className="intake-h2 mb-2">What do you do for a living?</h2>
      <p className="mb-5" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}>
        This helps your provider understand physical demands and schedule constraints.
      </p>
      <TextField label="OCCUPATION" autoComplete="organization-title" value={occupation}
        onChange={(e) => { setField("occupation", e.target.value); setSavedTrigger((n) => n + 1); }}
        onBlur={() => markBlur("occupation")}
        error={errors["occupation"]} showError={shouldShow("occupation")} required />
      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue}>Continue</PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step04;
