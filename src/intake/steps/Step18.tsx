import { useEffect, useRef, useState } from "react";
import { StepCard, CardRadio, SecondaryLink, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import type { StepProps } from "@/types/intake";

const SOURCES = [
  "Social Media",
  "Norfolk / Virginia Beach TV",
  "Richmond TV",
  "Print or local ad",
  "Friend or provider referral",
  "Returning patient",
  "Something else",
];

const Step18 = ({ onNext }: StepProps) => {
  const value = useIntakeStore((s) => s.referral_source);
  const setField = useIntakeStore((s) => s.setField);
  const [savedTrigger, setSavedTrigger] = useState(0);
  const advanceTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  const select = (v: string) => {
    setField("referral_source", v);
    setSavedTrigger((n) => n + 1);
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => onNext(), 300);
  };

  return (
    <StepCard h1="HOW DID YOU HEAR ABOUT US?">
      <h2 className="intake-h2 mb-5">Just so we can say thanks</h2>
      <div className="space-y-2.5" role="radiogroup">
        {SOURCES.map((s) => (
          <CardRadio key={s} label={s} selected={value === s} onSelect={() => select(s)} />
        ))}
      </div>
      <div className="mt-4">
        <SecondaryLink onClick={onNext}>Skip</SecondaryLink>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step18;
