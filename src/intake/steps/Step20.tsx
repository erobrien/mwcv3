import { useEffect } from "react";
import { motion } from "framer-motion";
import type { StepProps } from "@/types/intake";

const Step20 = (_props: StepProps) => {
  // Layer 4 will hook the real submission here. For now, just show the spinner.
  useEffect(() => {
    // Placeholder — Layer 4 will call submitIntake() and route on result.
  }, []);

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
