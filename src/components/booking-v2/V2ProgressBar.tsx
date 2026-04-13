const phaseLabels = ["YOU", "YOUR VISIT", "YOUR TIME", "CONFIRMED"];

interface V2ProgressBarProps {
  currentStep: number; // 1-7
}

/**
 * Maps internal step (1-7) to phase index (0-3) and fill fraction within that phase.
 * Phase 0: Step 1 (YOU)
 * Phase 1: Steps 2-4 (YOUR VISIT)
 * Phase 2: Steps 5-6 (YOUR TIME)
 * Phase 3: Step 7 (CONFIRMED)
 */
const getPhaseInfo = (step: number) => {
  if (step <= 1) return { phase: 0, fill: 1 };
  if (step <= 4) return { phase: 1, fill: (step - 1) / 3 };
  if (step <= 6) return { phase: 2, fill: (step - 4) / 2 };
  return { phase: 3, fill: 1 };
};

const V2ProgressBar = ({ currentStep }: V2ProgressBarProps) => {
  const { phase, fill } = getPhaseInfo(currentStep);
  const font = "'Montserrat', sans-serif";

  return (
    <div className="w-full px-4 pt-3 pb-1">
      {/* Segmented bar */}
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative h-1 flex-1 overflow-hidden"
            style={{
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute inset-y-0 left-0"
              style={{
                width:
                  i < phase
                    ? "100%"
                    : i === phase
                    ? `${fill * 100}%`
                    : "0%",
                backgroundColor: "#E8670A",
                borderRadius: 2,
                transition: "width 300ms ease-out",
              }}
            />
          </div>
        ))}
      </div>

      {/* Phase label */}
      <p
        className="mt-2 text-center uppercase"
        style={{
          fontFamily: font,
          fontWeight: 600,
          fontSize: 11,
          color: "#9CA3AF",
          letterSpacing: "0.1em",
        }}
      >
        {phaseLabels[phase]}
      </p>
    </div>
  );
};

export default V2ProgressBar;
