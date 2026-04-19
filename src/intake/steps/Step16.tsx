import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepCard, PrimaryCTA, CardRadio, TextField, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const REASONS = [
  "Initial hormone evaluation",
  "Erectile dysfunction consultation",
  "Weight loss consultation",
  "Energy and wellness concerns",
  "Something else",
];

const Step16 = ({ onNext }: StepProps) => {
  const visit = useIntakeStore((s) => s.visit);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(16);
  const { revealAll, shouldShow, markBlur } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);
  const advanceTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  const select = (val: string) => {
    setField("visit.primary_reason", val);
    setSavedTrigger((n) => n + 1);
    if (val !== "Something else") {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
      advanceTimer.current = window.setTimeout(() => onNext(), 300);
    }
  };

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  const isOther = visit.primary_reason === "Something else";

  return (
    <StepCard h1="YOUR VISIT">
      <h2 className="intake-h2 mb-5">What's the main reason you booked today?</h2>
      <div className="space-y-2.5" role="radiogroup">
        {REASONS.map((r) => (
          <CardRadio key={r} label={r} selected={visit.primary_reason === r} onSelect={() => select(r)} />
        ))}
      </div>

      <AnimatePresence initial={false}>
        {isOther && (
          <motion.div key="other"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }} style={{ overflow: "hidden" }}>
            <div className="pt-5">
              <TextField label="TELL US BRIEFLY" value={visit.primary_reason_other}
                onChange={(e) => { setField("visit.primary_reason_other", e.target.value); setSavedTrigger((n) => n + 1); }}
                onBlur={() => markBlur("visit.primary_reason_other")}
                error={errors["visit.primary_reason_other"]} showError={shouldShow("visit.primary_reason_other")}
                maxLength={200} />
            </div>
            <div className="mt-6">
              <PrimaryCTA sticky onClick={handleContinue}>Continue</PrimaryCTA>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step16;
