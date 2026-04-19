import { useState } from "react";
import { StepCard, PrimaryCTA, TextArea, QuickButton, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps } from "@/types/intake";

const Step08 = ({ onNext }: StepProps) => {
  const value = useIntakeStore((s) => s.medical_history.diagnosis_details);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);

  return (
    <StepCard h1="ANYTHING TO ADD?">
      <h2 className="intake-h2 mb-2">Details your provider should know</h2>
      <p className="mb-4" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "var(--text-body)" }}>
        Optional. Approximate dates, current status, anything else useful.
      </p>
      <TextArea label="DETAILS" value={value}
        placeholder="e.g. High blood pressure diagnosed 2018, well-controlled on lisinopril."
        onChange={(e) => { setField("medical_history.diagnosis_details", e.target.value); setSavedTrigger((n) => n + 1); }}
        maxLength={2000} />
      <div className="mt-3">
        <QuickButton onClick={() => { setField("medical_history.diagnosis_details", "None"); setSavedTrigger((n) => n + 1); }}>
          Nothing to add
        </QuickButton>
      </div>
      <div className="mt-6">
        <PrimaryCTA sticky onClick={onNext}>Continue</PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step08;
