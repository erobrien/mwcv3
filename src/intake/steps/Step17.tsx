import { useEffect, useRef, useState } from "react";
import { StepCard, CardRadio, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps } from "@/types/intake";

const DURATIONS = ["Less than 3 months", "3–6 months", "6–12 months", "More than 1 year"];

const Step17 = ({ onNext }: StepProps) => {
  const value = useIntakeStore((s) => s.visit.symptom_duration);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);
  const advanceTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  const select = (v: string) => {
    setField("visit.symptom_duration", v);
    setSavedTrigger((n) => n + 1);
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => onNext(), 300);
  };

  return (
    <StepCard h1="YOUR VISIT">
      <h2 className="intake-h2 mb-5">How long have these symptoms been present?</h2>
      <div className="space-y-2.5" role="radiogroup">
        {DURATIONS.map((d) => (
          <CardRadio key={d} label={d} selected={value === d} onSelect={() => select(d)} />
        ))}
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step17;
