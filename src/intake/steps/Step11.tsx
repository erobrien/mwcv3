import { useState } from "react";
import { StepCard, PrimaryCTA, CardRadio, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps, TobaccoUse, AlcoholUse } from "@/types/intake";

const TOBACCO: { value: NonNullable<TobaccoUse>; label: string }[] = [
  { value: "yes", label: "Yes" }, { value: "no", label: "No" }, { value: "former", label: "Former user" },
];
const ALCOHOL: { value: NonNullable<AlcoholUse>; label: string }[] = [
  { value: "yes", label: "Yes" }, { value: "no", label: "No" }, { value: "occasionally", label: "Occasionally" },
];

const Step11 = ({ onNext }: StepProps) => {
  const lifestyle = useIntakeStore((s) => s.lifestyle);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(11);
  const { revealAll, shouldShow } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  const tobaccoErr = shouldShow("lifestyle.tobacco") && errors["lifestyle.tobacco"];
  const alcoholErr = shouldShow("lifestyle.alcohol") && errors["lifestyle.alcohol"];

  return (
    <StepCard h1="LIFESTYLE">
      <h2 className="intake-h2 mb-5">A couple quick questions</h2>

      <div>
        <p className="intake-label mb-2">DO YOU SMOKE OR USE TOBACCO?</p>
        <div className="space-y-2.5" role="radiogroup">
          {TOBACCO.map((opt) => (
            <CardRadio key={opt.value} label={opt.label} selected={lifestyle.tobacco === opt.value}
              onSelect={() => { setField("lifestyle.tobacco", opt.value); setSavedTrigger((n) => n + 1); }} />
          ))}
        </div>
        {tobaccoErr && (
          <p aria-live="polite" style={{ marginTop: 6, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "var(--error-red)" }}>
            {errors["lifestyle.tobacco"]}
          </p>
        )}
      </div>

      <div className="my-6" style={{ height: 1, background: "var(--divider)" }} aria-hidden />

      <div>
        <p className="intake-label mb-2">DO YOU DRINK ALCOHOL?</p>
        <div className="space-y-2.5" role="radiogroup">
          {ALCOHOL.map((opt) => (
            <CardRadio key={opt.value} label={opt.label} selected={lifestyle.alcohol === opt.value}
              onSelect={() => { setField("lifestyle.alcohol", opt.value); setSavedTrigger((n) => n + 1); }} />
          ))}
        </div>
        {alcoholErr && (
          <p aria-live="polite" style={{ marginTop: 6, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "var(--error-red)" }}>
            {errors["lifestyle.alcohol"]}
          </p>
        )}
      </div>

      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue}>Continue</PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step11;
