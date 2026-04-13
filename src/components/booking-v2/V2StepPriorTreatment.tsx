import { useState } from "react";

interface V2StepPriorTreatmentProps {
  initialValue?: boolean | null;
  onNext: (prior: boolean) => void;
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const V2StepPriorTreatment = ({ initialValue, onNext }: V2StepPriorTreatmentProps) => {
  const [selected, setSelected] = useState<boolean | null>(initialValue ?? null);

  const handleSelect = (value: boolean) => {
    setSelected(value);
    setTimeout(() => onNext(value), 300);
  };

  const btnStyle = (isSelected: boolean): React.CSSProperties => ({
    minWidth: 140,
    height: 56,
    fontFamily: font,
    fontWeight: 600,
    fontSize: 15,
    color: isSelected ? "#fff" : "#fff",
    backgroundColor: isSelected ? "rgba(232,103,10,0.15)" : "rgba(255,255,255,0.05)",
    backdropFilter: "blur(16px)",
    border: isSelected ? "2px solid #E8670A" : "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    cursor: "pointer",
  });

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-5">
      <h1
        className="mb-2 text-center uppercase"
        style={{
          fontFamily: headingFont,
          fontSize: "clamp(24px, 5.5vw, 36px)",
          color: "#fff",
          letterSpacing: "0.05em",
          lineHeight: 1.1,
        }}
      >
        Have You Tried Other Treatments?
      </h1>
      <p
        className="mb-8 text-center"
        style={{ fontFamily: font, fontWeight: 400, fontSize: 14, color: "#B8B6B2" }}
      >
        Either way, we'll build a plan that works for you.
      </p>

      <div className="flex gap-4">
        {[false, true].map((val) => (
          <button
            key={String(val)}
            type="button"
            onClick={() => handleSelect(val)}
            className="transition-all"
            style={btnStyle(selected === val)}
            aria-label={val ? "Yes" : "No"}
          >
            {val ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default V2StepPriorTreatment;
