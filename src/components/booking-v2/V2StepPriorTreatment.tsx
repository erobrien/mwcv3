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

  return (
    <div className="flex flex-col items-center px-5 pt-6 md:pt-10">
      <div
        className="w-full max-w-[480px] p-6 md:p-8"
        style={{ backgroundColor: "#FFFFFF", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
      >
        <h1
          className="mb-2 text-center uppercase"
          style={{ fontFamily: headingFont, fontSize: "clamp(24px, 5.5vw, 36px)", color: "#0B1029", letterSpacing: "0.05em", lineHeight: 1.1 }}
        >
          Have You Tried Other Treatments?
        </h1>
        <p className="mb-6 text-center" style={{ fontFamily: font, fontWeight: 400, fontSize: 14, color: "#6B7280" }}>
          Either way, we'll build a plan that works for you.
        </p>

        <div className="flex gap-4">
          {[false, true].map((val) => {
            const isSelected = selected === val;
            return (
              <button
                key={String(val)}
                type="button"
                onClick={() => handleSelect(val)}
                className="flex-1 transition-all"
                style={{
                  minWidth: 140,
                  height: 56,
                  fontFamily: font, fontWeight: 600, fontSize: 15,
                  color: isSelected ? "#fff" : "#0B1029",
                  backgroundColor: isSelected ? "#E8670A" : "#F5F3F0",
                  border: isSelected ? "2px solid #E8670A" : "1px solid #D1CCC5",
                  borderRadius: 12,
                  cursor: "pointer",
                }}
                aria-label={val ? "Yes" : "No"}
              >
                {val ? "Yes" : "No"}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default V2StepPriorTreatment;
