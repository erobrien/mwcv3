import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

interface SurveyCardProps {
  step: number;        // 1-indexed current step
  total: number;       // total number of steps
  title: string;
  subtitle: string;
  children: ReactNode;
  prevLabel?: string;
  onPrev: () => void;
}

/**
 * AMD-friendly survey card.
 *
 * Key changes from prior version:
 *   - Auto-advance is the contract (options call onClick → onSelect → navigate).
 *     There is NO orange NEXT button. The orange bar at the bottom was being
 *     mistaken for a primary CTA over the options themselves.
 *   - Back is a quiet ghost link, not a competing primary action.
 *   - Progress bar shows completed steps as orange and the CURRENT step as a
 *     half-filled orange-on-slate so it's obvious you're not done yet.
 *   - Title uses Inter at 32–40px sentence case (no Oswald display face).
 *   - Borders thickened to 3px slate so the card outline is visible to AMD users.
 */
const SurveyCard = ({
  step, total, title, subtitle, children,
  prevLabel = "Back", onPrev,
}: SurveyCardProps) => {
  return (
    <div className="px-4 md:px-6 py-8 md:py-12 flex justify-center" style={{ paddingBottom: 48 }}>
      <div
        className="w-full"
        style={{
          maxWidth: 680,
          background: "#FFFFFF",
          border: "3px solid #5A6478",
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="p-6 md:p-10">
          {/* Step indicator */}
          <div
            className="mb-3 text-center"
            style={{
              fontSize: 16,
              color: "#3A4258",
              letterSpacing: "0.04em",
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
            }}
          >
            Step {step} of {total}
          </div>

          {/* Progress bar — completed steps full orange, current step half-filled */}
          <div className="flex gap-2 mb-8" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step}>
            {Array.from({ length: total }).map((_, i) => {
              const isComplete = i < step - 1;
              const isCurrent = i === step - 1;
              return (
                <div
                  key={i}
                  className="flex-1 relative overflow-hidden"
                  style={{
                    height: 8,
                    borderRadius: 4,
                    background: "#E5E7EB",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: isComplete ? "100%" : isCurrent ? "50%" : "0%",
                      background: "#E8670A",
                      borderRadius: 4,
                      transition: "width 240ms ease",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Title — Inter sentence case, AMD-readable */}
          <h1
            className="text-center"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 36px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "#0B1029",
              textTransform: "none",
              textWrap: "balance",
              marginBottom: 12,
            } as React.CSSProperties}
          >
            {title}
          </h1>
          <p
            className="text-center"
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#3A4258",
              lineHeight: 1.4,
              marginBottom: 28,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {subtitle}
          </p>

          {/* Options */}
          <div className="space-y-3">{children}</div>

          {/* Helper text — tells the user how the page works */}
          <p
            className="text-center mt-6"
            style={{
              fontSize: 16,
              color: "#5A6478",
              fontFamily: "Inter, sans-serif",
              fontStyle: "italic",
            }}
          >
            Tap an option to continue.
          </p>

          {/* Back link — quiet, never competes with the options */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-2 focus:outline-none focus-visible:underline"
              style={{
                background: "transparent",
                border: 0,
                color: "#5A6478",
                fontFamily: "Inter, sans-serif",
                fontSize: 18,
                fontWeight: 600,
                padding: "12px 16px",
                cursor: "pointer",
                minHeight: 44,
              }}
            >
              <ArrowLeft size={20} />
              <span>{prevLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
