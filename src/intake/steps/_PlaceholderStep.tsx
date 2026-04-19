import { ReactNode } from "react";
import { StepCard, PrimaryCTA } from "@/intake/components";
import type { StepProps } from "@/types/intake";

interface PlaceholderProps extends StepProps {
  stepNumber: number;
  title?: string;
  children?: ReactNode;
}

const PlaceholderStep = ({ stepNumber, title, children, onNext }: PlaceholderProps) => (
  <StepCard
    h1={title ?? `Step ${stepNumber}`}
    subtitle="Layer 3 will replace this placeholder with real content."
  >
    <h2 className="intake-h2 mb-3">Step {stepNumber} placeholder</h2>
    <p className="intake-body-card mb-6">
      This is a navigation stub so you can walk the full 20-step flow.
    </p>
    {children}
    <div className="mt-2">
      <PrimaryCTA sticky onClick={onNext}>
        Continue
      </PrimaryCTA>
    </div>
  </StepCard>
);

export default PlaceholderStep;
