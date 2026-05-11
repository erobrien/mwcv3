import { ReactNode } from "react";

interface SurveyCardProps {
  step: number;
  total: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  prevLabel?: string;
  nextLabel: string;
  onPrev: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
}

const SurveyCard = ({
  step, total, title, subtitle, children,
  prevLabel = "PREV", nextLabel, onPrev, onNext, nextDisabled,
}: SurveyCardProps) => {
  return (
    <div className="px-4 md:px-6 py-10 md:py-16 flex justify-center" style={{ paddingBottom: 120 }}>
      <div
        className="w-full"
        style={{
          maxWidth: 640,
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div className="p-6 md:p-10">
          <div
            className="mb-3 text-center uppercase"
            style={{ fontSize: 14, color: "#8A95AD", letterSpacing: "0.1em", fontWeight: 600 }}
          >
            STEP {step} OF {total}
          </div>
          <div className="flex gap-1 mb-7">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className="flex-1" style={{ height: 4, borderRadius: 2, background: i < step ? "#E8670A" : "#E5E7EB" }} />
            ))}
          </div>
          <h1
            className="text-center uppercase"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 5vw, 40px)",
              lineHeight: 1.05,
              letterSpacing: "0.02em",
              color: "#0B1029",
              textWrap: "balance",
            } as React.CSSProperties}
          >
            {title}
          </h1>
          <p className="mt-3 mb-8 text-center" style={{ fontSize: 16, color: "#5A6478", lineHeight: 1.5 }}>
            {subtitle}
          </p>
          <div className="space-y-4">{children}</div>
        </div>

        {/* Desktop nav inside card */}
        <div
          className="hidden md:flex items-center justify-between"
          style={{ background: "#E8670A", padding: "16px 24px" }}
        >
          <button
            type="button"
            onClick={onPrev}
            className="text-white uppercase focus:outline-none focus-visible:underline"
            style={{ fontSize: 14, letterSpacing: "0.05em", fontWeight: 600, padding: "8px 4px", cursor: "pointer", background: "transparent", border: 0 }}
          >
            ← {prevLabel}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="text-white uppercase focus:outline-none focus-visible:underline"
            style={{
              fontSize: 16, letterSpacing: "0.05em", fontWeight: 700,
              opacity: nextDisabled ? 0.4 : 1, cursor: nextDisabled ? "not-allowed" : "pointer",
              padding: "8px 4px", background: "transparent", border: 0,
            }}
          >
            {nextLabel} →
          </button>
        </div>
      </div>

      {/* Mobile sticky nav */}
      <div
        className="md:hidden fixed inset-x-0 bottom-0 flex items-center justify-between z-40"
        style={{ background: "#E8670A", padding: "14px 20px", paddingBottom: "max(14px, env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={onPrev}
          className="text-white uppercase"
          style={{ fontSize: 14, letterSpacing: "0.05em", fontWeight: 600, padding: "12px 4px", background: "transparent", border: 0, minHeight: 56 }}
        >
          ← {prevLabel}
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="text-white uppercase"
          style={{
            fontSize: 16, letterSpacing: "0.05em", fontWeight: 700,
            opacity: nextDisabled ? 0.4 : 1, cursor: nextDisabled ? "not-allowed" : "pointer",
            padding: "12px 4px", background: "transparent", border: 0, minHeight: 56,
          }}
        >
          {nextLabel} →
        </button>
      </div>
    </div>
  );
};

export default SurveyCard;
