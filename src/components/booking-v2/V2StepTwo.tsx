import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface V2StepTwoProps {
  onNext: (data: { primaryConcern: string; duration: string; priorTreatment: boolean; email: string }) => void;
  initialData?: { primaryConcern?: string; duration?: string; priorTreatment?: boolean; email?: string };
}

const concerns = [
  { value: "energy", label: "Low energy / fatigue" },
  { value: "sex-drive", label: "Low sex drive / ED" },
  { value: "weight", label: "Weight gain / difficulty losing weight" },
  { value: "other", label: "Other" },
];

const durations = [
  { value: "<6mo", label: "Less than 6 months" },
  { value: "6-12mo", label: "6–12 months" },
  { value: "1-2yr", label: "1–2 years" },
  { value: "2+yr", label: "More than 2 years" },
];

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const SectionReveal = ({ show, children, refProp }: { show: boolean; children: React.ReactNode; refProp?: React.RefObject<HTMLDivElement> }) => (
  <div
    ref={refProp as React.RefObject<HTMLDivElement>}
    style={{
      maxHeight: show ? 600 : 0,
      opacity: show ? 1 : 0,
      overflow: show ? "visible" : "hidden",
      transition: "max-height 0.3s ease, opacity 0.2s ease",
    }}
  >
    {children}
  </div>
);

const RadioDotLight = ({ selected }: { selected: boolean }) => (
  <div style={{
    width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
    border: selected ? "2px solid #E8670A" : "2px solid #D1D5DB",
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    {selected && <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#E8670A" }} />}
  </div>
);

const V2StepTwo = ({ onNext, initialData }: V2StepTwoProps) => {
  const [concern, setConcern] = useState(initialData?.primaryConcern || "");
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [prior, setPrior] = useState<boolean | null>(initialData?.priorTreatment ?? null);
  const [email, setEmail] = useState(initialData?.email || "");

  const q2Ref = useRef<HTMLDivElement>(null);
  const q3Ref = useRef<HTMLDivElement>(null);
  const q4Ref = useRef<HTMLDivElement>(null);

  const scrollIntoView = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  useEffect(() => { if (concern) scrollIntoView(q2Ref); }, [concern]);
  useEffect(() => { if (duration) scrollIntoView(q3Ref); }, [duration]);
  useEffect(() => { if (prior !== null) scrollIntoView(q4Ref); }, [prior]);

  const isValid = concern && duration && prior !== null && email.trim() && email.includes("@");

  const cardStyleLight = (selected: boolean): React.CSSProperties => ({
    minHeight: 56,
    fontFamily: font,
    fontWeight: 500,
    fontSize: 15,
    color: "#1A1A2E",
    backgroundColor: selected ? "rgba(232,103,10,0.08)" : "#F5F0EB",
    border: selected ? "2px solid #E8670A" : "1px solid #E5E0DA",
    cursor: "pointer",
    width: "100%",
    textAlign: "left" as const,
    borderRadius: 12,
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    transition: "all 0.15s ease",
  });


  return (
    <div className="flex flex-col items-center px-5 py-8 md:py-12">
      <h1
        className="text-center uppercase"
        style={{ fontFamily: headingFont, fontSize: "clamp(26px, 5.5vw, 38px)", color: "#fff", letterSpacing: "0.05em", lineHeight: 1.05, marginBottom: 8 }}
      >
        A Few Quick Questions
      </h1>
      <p className="mb-8 text-center" style={{ fontFamily: font, fontSize: 15, color: "#B0ADA8", lineHeight: 1.5 }}>
        So we can match you with the right physician. Takes about 30 seconds.
      </p>

      <div
        className="w-full max-w-[480px] rounded-2xl p-6 md:p-8"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 40px rgba(0,0,0,0.25)" }}
      >
        <div className="space-y-6">
          {/* Q1 */}
          <div>
            <label className="mb-3 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#6B7280", letterSpacing: "0.08em" }}>
              What brings you in?
            </label>
            <div className="space-y-2">
              {concerns.map((c) => (
                <button key={c.value} type="button" onClick={() => setConcern(c.value)} style={cardStyleLight(concern === c.value)} aria-label={c.label}>
                  <RadioDotLight selected={concern === c.value} /> {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Q2 */}
          <SectionReveal show={!!concern} refProp={q2Ref}>
            <div className="pt-2">
              <label className="mb-3 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#6B7280", letterSpacing: "0.08em" }}>
                How long has this been going on?
              </label>
              <div className="space-y-2">
                {durations.map((d) => (
                  <button key={d.value} type="button" onClick={() => setDuration(d.value)} style={cardStyleLight(duration === d.value)} aria-label={d.label}>
                    <RadioDotLight selected={duration === d.value} /> {d.label}
                  </button>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Q3 */}
          <SectionReveal show={!!duration} refProp={q3Ref}>
            <div className="pt-2">
              <label className="mb-3 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#6B7280", letterSpacing: "0.08em" }}>
                Have you tried other treatments?
              </label>
              <div className="flex gap-3">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => setPrior(val)}
                    className="flex-1 rounded-xl transition-all"
                    style={{
                      minWidth: 140,
                      height: 48,
                      fontFamily: font,
                      fontWeight: 600,
                      fontSize: 15,
                      color: "#1A1A2E",
                      backgroundColor: prior === val ? "rgba(232,103,10,0.08)" : "#F5F0EB",
                      border: prior === val ? "2px solid #E8670A" : "1px solid #E5E0DA",
                      cursor: "pointer",
                    }}
                    aria-label={val ? "Yes" : "No"}
                  >
                    {val ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Q4 */}
          <SectionReveal show={prior !== null} refProp={q4Ref}>
            <div className="pt-2">
              <label className="mb-2 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#6B7280", letterSpacing: "0.08em" }}>
                Where should we email your consultation details?
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  height: 56, borderRadius: 12, backgroundColor: "#F5F0EB",
                  border: "1px solid #E5E0DA", color: "#1A1A2E", padding: "0 18px",
                  fontSize: 16, width: "100%", outline: "none", fontFamily: font,
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#E8670A"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#E5E0DA"; e.currentTarget.style.boxShadow = "none"; }}
                aria-label="Email address"
              />
            </div>
          </SectionReveal>
        </div>

        {/* CTA */}
        <button
          onClick={() => isValid && onNext({ primaryConcern: concern, duration, priorTreatment: prior!, email: email.trim() })}
          disabled={!isValid}
          className="mt-6 flex w-full items-center justify-center gap-2 uppercase transition-all"
          style={{
            height: 56, borderRadius: 9999, backgroundColor: "#E8670A", color: "#fff",
            fontFamily: font, fontWeight: 700, fontSize: 15, letterSpacing: "0.08em",
            cursor: isValid ? "pointer" : "default", opacity: isValid ? 1 : 0.4, border: "none",
          }}
          onMouseEnter={(e) => { if (isValid) e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,103,10,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          aria-label="Pick your time"
        >
          Pick Your Time <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default V2StepTwo;
