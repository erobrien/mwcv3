import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppShell, BackButton } from "./components";
import ResumeToast from "./components/ResumeToast";
import {
  estimateResumeStep,
  hasResumableData,
  useIntakeStore,
} from "@/store/intakeStore";
import { TOTAL_STEPS, phaseForStep, type StepProps } from "@/types/intake";

// Lazy-load each step so the entry chunk stays small
const stepModules: Record<number, () => Promise<{ default: React.FC<StepProps> }>> = {
  1: () => import("./steps/Step01"),
  2: () => import("./steps/Step02"),
  3: () => import("./steps/Step03"),
  4: () => import("./steps/Step04"),
  5: () => import("./steps/Step05"),
  6: () => import("./steps/Step06"),
  7: () => import("./steps/Step07"),
  8: () => import("./steps/Step08"),
  9: () => import("./steps/Step09"),
  10: () => import("./steps/Step10"),
  11: () => import("./steps/Step11"),
  12: () => import("./steps/Step12"),
  13: () => import("./steps/Step13"),
  14: () => import("./steps/Step14"),
  15: () => import("./steps/Step15"),
  16: () => import("./steps/Step16"),
  17: () => import("./steps/Step17"),
  18: () => import("./steps/Step18"),
  19: () => import("./steps/Step19"),
  20: () => import("./steps/Step20"),
};

const StepLoader = ({ step }: { step: number }) => {
  const Comp = useMemo(() => lazy(stepModules[step]), [step]);
  const next = useIntakeStore((s) => s.nextStep);
  const prev = useIntakeStore((s) => s.prevStep);
  return (
    <Suspense fallback={<div style={{ minHeight: 240 }} />}>
      <Comp onNext={next} onBack={prev} />
    </Suspense>
  );
};

const IntakeFlow = () => {
  const currentStep = useIntakeStore((s) => s.currentStep);
  const hasHydrated = useIntakeStore((s) => s.hasHydrated);
  const loadFromUrlParams = useIntakeStore((s) => s.loadFromUrlParams);
  const resetForm = useIntakeStore((s) => s.resetForm);
  const setStep = useIntakeStore((s) => s.setStep);
  const prevStep = useIntakeStore((s) => s.prevStep);

  const directionRef = useRef<1 | -1>(1);
  const lastStepRef = useRef(currentStep);
  const urlLoadedRef = useRef(false);

  const [showResume, setShowResume] = useState(false);
  const [resumeChecked, setResumeChecked] = useState(false);

  // Run URL pre-fill once after hydration
  useEffect(() => {
    if (!hasHydrated || urlLoadedRef.current) return;
    urlLoadedRef.current = true;

    const beforeName = useIntakeStore.getState().about_you.full_legal_name;
    loadFromUrlParams();

    // Decide resume prompt: only show on step 1, only if there is meaningful data
    // and the URL params didn't already advance us past About You.
    const after = useIntakeStore.getState();
    const hasUrl = typeof window !== "undefined" && window.location.search.length > 0;

    if (
      after.currentStep === 1 &&
      hasResumableData(after) &&
      !hasUrl &&
      // Avoid showing it the very first time someone just typed something — there's
      // only meaningful resume value if the persisted store had data BEFORE this load
      beforeName
    ) {
      setShowResume(true);
    }
    setResumeChecked(true);
  }, [hasHydrated, loadFromUrlParams]);

  // Track direction for transitions + scroll to top + analytics
  useEffect(() => {
    directionRef.current = currentStep >= lastStepRef.current ? 1 : -1;
    lastStepRef.current = currentStep;
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    // Fire dataLayer step-view event (no-op when GTM not loaded)
    void import("@/lib/intakeAnalytics").then((m) => m.trackStepView(currentStep));
  }, [currentStep]);

  const phaseIndex = phaseForStep(currentStep);
  const showBack = currentStep > 1 && currentStep !== 20;

  const dir = directionRef.current;
  const variants = {
    initial: { opacity: 0, x: dir === 1 ? 24 : -24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: dir === 1 ? -24 : 24 },
  };

  const handleResume = () => {
    const s = useIntakeStore.getState();
    setStep(estimateResumeStep(s));
    setShowResume(false);
  };

  const handleStartOver = () => {
    resetForm();
    setShowResume(false);
  };

  if (!hasHydrated || !resumeChecked) {
    return (
      <AppShell currentStep={1} totalSteps={TOTAL_STEPS} phaseIndex={0} showProgress>
        <div style={{ minHeight: 240 }} />
      </AppShell>
    );
  }

  return (
    <AppShell currentStep={currentStep} totalSteps={TOTAL_STEPS} phaseIndex={phaseIndex}>
      {showBack && (
        <div className="mb-1">
          <BackButton onClick={prevStep} />
        </div>
      )}

      {showResume && currentStep === 1 && (
        <ResumeToast onResume={handleResume} onStartOver={handleStartOver} />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <StepLoader step={currentStep} />
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
};

export default IntakeFlow;
