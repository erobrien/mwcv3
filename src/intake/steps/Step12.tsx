import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepCard, PrimaryCTA, ChipRow, TextArea, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

const Step12 = ({ onNext }: StepProps) => {
  const ht = useIntakeStore((s) => s.hormone_therapy);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(12);
  const { revealAll, shouldShow } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const chipValue: "yes" | "no" | null =
    ht.used_before === true ? "yes" : ht.used_before === false ? "no" : null;

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  const err = shouldShow("hormone_therapy.used_before") && errors["hormone_therapy.used_before"];

  return (
    <StepCard h1="HORMONE HISTORY">
      <h2 className="intake-h2 mb-5">Have you ever used testosterone or other hormone therapy?</h2>
      <ChipRow value={chipValue}
        onChange={(v) => { setField("hormone_therapy.used_before", v === "yes"); setSavedTrigger((n) => n + 1); }} />
      {err && (
        <p aria-live="polite" style={{ marginTop: 8, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "var(--error-red)" }}>
          {errors["hormone_therapy.used_before"]}
        </p>
      )}

      <AnimatePresence initial={false}>
        {ht.used_before === true && (
          <motion.div key="ht-details"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }} style={{ overflow: "hidden" }}>
            <div className="pt-5">
              <TextArea label="BRIEFLY DESCRIBE — WHEN, WHAT, AND WHY YOU STOPPED (OPTIONAL)"
                value={ht.details}
                onChange={(e) => { setField("hormone_therapy.details", e.target.value); setSavedTrigger((n) => n + 1); }}
                maxLength={1000} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue}>Continue</PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step12;
