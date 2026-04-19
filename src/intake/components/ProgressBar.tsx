interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  /** 0 = none, 1 = About You, 2 = Health History, 3 = Symptoms, 4 = Consent */
  phaseIndex: number;
}

const PHASES = ["ABOUT YOU", "HEALTH HISTORY", "SYMPTOMS", "CONSENT"];

const ProgressBar = ({ currentStep, totalSteps, phaseIndex }: ProgressBarProps) => {
  // Each segment fills proportionally. Overall progress = currentStep / totalSteps.
  // We distribute that across 4 segments.
  const overall = totalSteps > 0 ? Math.min(1, Math.max(0, currentStep / totalSteps)) : 0;
  const segments = 4;

  const fills = Array.from({ length: segments }, (_, i) => {
    const segStart = i / segments;
    const segEnd = (i + 1) / segments;
    if (overall >= segEnd) return 1;
    if (overall <= segStart) return 0;
    return (overall - segStart) / (segEnd - segStart);
  });

  return (
    <div
      className="mx-auto w-full"
      style={{ maxWidth: 560, padding: "12px 20px 8px" }}
    >
      <div className="flex" style={{ gap: 4 }}>
        {fills.map((fill, i) => (
          <div
            key={i}
            className="relative flex-1 overflow-hidden"
            style={{
              height: 4,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${fill * 100}%`,
                backgroundColor: "var(--accent-orange)",
                transition: "width 300ms ease-out",
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="mt-2 grid"
        style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}
      >
        {PHASES.map((label, i) => {
          const active = i + 1 === phaseIndex;
          return (
            <div
              key={label}
              className="text-center"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: active ? "var(--accent-orange)" : "var(--text-muted)",
                transition: "color 200ms ease-out",
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
