import { useState } from "react";
import { StepCard, PrimaryCTA, TextArea, QuickButton, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps } from "@/types/intake";

const Step10 = ({ onNext }: StepProps) => {
  const value = useIntakeStore((s) => s.allergies);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);

  return (
    <StepCard h1="ALLERGIES">
      <h2 className="intake-h2 mb-2">Any known allergies?</h2>
      <p className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}>
        Medications, foods, latex, environmental.
      </p>
      <TextArea label="ALLERGIES" value={value}
        placeholder="e.g. Penicillin (rash), shellfish"
        onChange={(e) => { setField("allergies", e.target.value); setSavedTrigger((n) => n + 1); }}
        maxLength={1000} />
      <div className="mt-3">
        <QuickButton onClick={() => { setField("allergies", "None known"); setSavedTrigger((n) => n + 1); }}>
          No known allergies
        </QuickButton>
      </div>
      <div className="mt-6">
        <PrimaryCTA sticky onClick={onNext}>Continue</PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step10;
