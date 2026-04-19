import { useState } from "react";
import { StepCard, PrimaryCTA, TextArea, QuickButton, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps } from "@/types/intake";

const Step09 = ({ onNext }: StepProps) => {
  const value = useIntakeStore((s) => s.medications);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);

  return (
    <StepCard h1="MEDICATIONS">
      <h2 className="intake-h2 mb-2">What medications are you taking?</h2>
      <p className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}>
        Include name, dose, and how often. Include supplements if relevant.
      </p>
      <TextArea label="MEDICATIONS" value={value}
        placeholder={`e.g.\nLisinopril 10mg daily\nVitamin D 2000 IU daily`}
        onChange={(e) => { setField("medications", e.target.value); setSavedTrigger((n) => n + 1); }}
        maxLength={2000} />
      <div className="mt-3">
        <QuickButton onClick={() => { setField("medications", "None"); setSavedTrigger((n) => n + 1); }}>
          I don't take any medications
        </QuickButton>
      </div>
      <div className="mt-6">
        <PrimaryCTA sticky onClick={onNext}>Continue</PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step09;
