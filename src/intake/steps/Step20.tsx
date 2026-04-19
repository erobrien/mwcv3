import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useIntakeStore } from "@/store/intakeStore";
import { submitIntake } from "@/lib/submitIntake";
import { trackSubmitted, trackSubmitError } from "@/lib/intakeAnalytics";
import type { StepProps } from "@/types/intake";

const Step20 = ({ onBack }: StepProps) => {
  const navigate = useNavigate();
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      const fullState = useIntakeStore.getState();
      // Strip the store-only fields out of the payload
      const {
        currentStep: _cs,
        hasHydrated: _hh,
        setField: _sf,
        setMany: _sm,
        setStep: _ss,
        nextStep: _ns,
        prevStep: _ps,
        resetForm,
        loadFromUrlParams: _lp,
        _markHydrated: _mh,
        ...payload
      } = fullState;

      const result = await submitIntake(payload);

      if (result.ok) {
        // Capture greeting/contact info BEFORE clearing the store
        const greet = {
          fullName: payload.about_you.full_legal_name,
          email: payload.about_you.email,
          phone: payload.about_you.phone,
        };

        trackSubmitted();
        // Clear persisted data + Zustand state
        try {
          localStorage.removeItem("mwc_intake_v1");
        } catch {
          /* ignore */
        }
        resetForm();

        navigate("/intake/thanks", { replace: true, state: greet });
      } else {
        trackSubmitError(result.error);
        // Bounce back to step 19 with an error flag the next render can read
        useIntakeStore.setState({ currentStep: 19 });
        if (typeof window !== "undefined") {
          (window as unknown as { __intakeSubmitError?: string }).__intakeSubmitError =
            result.error || "Submission failed";
          window.dispatchEvent(new CustomEvent("intake:submit-error"));
        }
        // Safety: also call onBack in case the store update didn't trigger a route change.
        onBack?.();
      }
    };

    void run();
  }, [navigate, onBack]);

  return (
    <div
      className="mx-auto flex flex-col items-center justify-center"
      style={{ maxWidth: 560, paddingTop: 80, paddingBottom: 80 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "4px solid rgba(232,103,10,0.18)",
          borderTopColor: "var(--accent-orange)",
        }}
        aria-hidden
      />
      <p
        className="mt-5 text-center"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 14,
          color: "var(--text-on-dark)",
          letterSpacing: "0.04em",
        }}
        role="status"
        aria-live="polite"
      >
        Submitting your intake…
      </p>
    </div>
  );
};

export default Step20;
