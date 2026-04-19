import { useEffect } from "react";
import "../intake/styles.css";
import { AppShell, StepCard } from "../intake/components";

const IntakeThanksPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppShell currentStep={20} totalSteps={20} phaseIndex={4}>
      <StepCard h1="YOU'RE ALL SET" subtitle="Layer 4 will replace this with the real success page.">
        <p className="intake-body-card">Thanks — your intake has been received.</p>
      </StepCard>
    </AppShell>
  );
};

export default IntakeThanksPage;
