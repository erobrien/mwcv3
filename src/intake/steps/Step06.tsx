import { useState } from "react";
import { StepCard, PrimaryCTA, SecondaryLink, TextField, CardRadio, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps, YesNoUrgent } from "@/types/intake";

const OPTIONS: { value: NonNullable<YesNoUrgent>; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "urgent_only", label: "Only if urgent" },
];

const Step06 = ({ onNext }: StepProps) => {
  const pcp = useIntakeStore((s) => s.primary_care_provider);
  const setField = useIntakeStore((s) => s.setField);
  const setMany = useIntakeStore((s) => s.setMany);
  const { errors } = useStepValidation(6);
  const { shouldShow, markBlur, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const update = (path: string, v: unknown) => { setField(path, v); setSavedTrigger((n) => n + 1); };

  const handleNoPCP = () => {
    setMany([
      { path: "primary_care_provider.none", value: true },
      { path: "primary_care_provider.provider_name", value: "" },
      { path: "primary_care_provider.clinic_name", value: "" },
      { path: "primary_care_provider.may_contact", value: null },
    ]);
    onNext();
  };

  const handleContinue = () => {
    revealAll();
    if (pcp.none || Object.keys(errors).length === 0) onNext();
  };

  return (
    <StepCard h1="YOUR PRIMARY CARE PROVIDER">
      <h2 className="intake-h2 mb-5">We'll keep them in the loop only if you tell us to</h2>
      <div className="space-y-4">
        <TextField label="PROVIDER NAME" value={pcp.provider_name}
          onChange={(e) => { update("primary_care_provider.provider_name", e.target.value); if (pcp.none) update("primary_care_provider.none", false); }}
          onBlur={() => markBlur("primary_care_provider.provider_name")}
          error={errors["primary_care_provider.provider_name"]} showError={shouldShow("primary_care_provider.provider_name")} />
        <TextField label="CLINIC NAME" value={pcp.clinic_name}
          onChange={(e) => { update("primary_care_provider.clinic_name", e.target.value); if (pcp.none) update("primary_care_provider.none", false); }}
          onBlur={() => markBlur("primary_care_provider.clinic_name")}
          error={errors["primary_care_provider.clinic_name"]} showError={shouldShow("primary_care_provider.clinic_name")} />

        <div>
          <p className="intake-label mb-2">MAY WE CONTACT THEM ABOUT YOUR CARE?</p>
          <div className="space-y-2.5" role="radiogroup">
            {OPTIONS.map((opt) => (
              <CardRadio key={opt.value} label={opt.label}
                selected={pcp.may_contact === opt.value}
                onSelect={() => { update("primary_care_provider.may_contact", opt.value); if (pcp.none) update("primary_care_provider.none", false); }} />
            ))}
          </div>
          {shouldShow("primary_care_provider.may_contact") && errors["primary_care_provider.may_contact"] && (
            <p aria-live="polite" style={{ marginTop: 6, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "var(--error-red)" }}>
              {errors["primary_care_provider.may_contact"]}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue}>Continue</PrimaryCTA>
        <SecondaryLink onClick={handleNoPCP}>I don't have a primary care provider</SecondaryLink>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step06;
