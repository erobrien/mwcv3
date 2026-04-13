const steps = ["You", "Your Visit", "Your Time", "Confirmed"];

interface V2ProgressBarProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const V2ProgressBar = ({ currentStep, onStepClick }: V2ProgressBarProps) => {
  const dotColor = (i: number) => (i + 1 <= currentStep ? "#E8670A" : "#9CA3AF");
  const lineColor = (i: number) => (i + 1 < currentStep ? "#E8670A" : "rgba(255,255,255,0.15)");
  const labelColor = (i: number) => (i + 1 <= currentStep ? "#FFFFFF" : "#9CA3AF");

  return (
    <div className="mx-auto flex w-full max-w-sm items-center justify-between py-5 md:py-6">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center" style={{ flex: i < steps.length - 1 ? 1 : 0 }}>
          <button
            type="button"
            className="flex flex-col items-center gap-1.5"
            onClick={() => i + 1 < currentStep && onStepClick?.(i + 1)}
            disabled={i + 1 >= currentStep}
            style={{ cursor: i + 1 < currentStep ? "pointer" : "default", background: "none", border: "none", padding: 0 }}
            aria-label={`Step ${i + 1}: ${label}`}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i + 1 === currentStep ? 14 : 10,
                height: i + 1 === currentStep ? 14 : 10,
                backgroundColor: dotColor(i),
                boxShadow: i + 1 === currentStep ? "0 0 0 4px rgba(232,103,10,0.25)" : "none",
              }}
            />
            <span
              className="block text-center uppercase"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 10,
                letterSpacing: "0.08em",
                color: labelColor(i),
                fontWeight: 600,
              }}
            >
              {label}
            </span>
          </button>
          {i < steps.length - 1 && (
            <div
              className="mx-1 h-0.5 flex-1 rounded-full transition-colors duration-300"
              style={{ backgroundColor: lineColor(i) }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default V2ProgressBar;
