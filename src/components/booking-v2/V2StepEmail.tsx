import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface V2StepEmailProps {
  initialValue?: string;
  onNext: (email: string) => void;
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const glassInput: React.CSSProperties = {
  height: 56,
  borderRadius: 10,
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  padding: "0 18px",
  fontSize: 16,
  width: "100%",
  outline: "none",
  fontFamily: font,
  fontWeight: 400,
};

const V2StepEmail = ({ initialValue, onNext }: V2StepEmailProps) => {
  const [email, setEmail] = useState(initialValue || "");

  const isValid = email.trim().length > 0 && email.includes("@") && email.includes(".");

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-5">
      <h1
        className="mb-2 text-center uppercase"
        style={{
          fontFamily: headingFont,
          fontSize: "clamp(22px, 5vw, 34px)",
          color: "#fff",
          letterSpacing: "0.05em",
          lineHeight: 1.1,
        }}
      >
        Where Should We Email Your Consultation Details?
      </h1>
      <p
        className="mb-8 text-center"
        style={{ fontFamily: font, fontWeight: 400, fontSize: 14, color: "#B0ADA8" }}
      >
        We'll send a confirmation and appointment details.
      </p>

      <div className="w-full max-w-[480px]">
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <label
            className="mb-2 block uppercase"
            style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#9CA3AF", letterSpacing: "0.08em" }}
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={glassInput}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(232,103,10,0.5)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.boxShadow = "none";
            }}
            aria-label="Email address"
          />

          <button
            onClick={() => isValid && onNext(email.trim())}
            disabled={!isValid}
            className="mt-6 flex w-full items-center justify-center gap-2 uppercase transition-all"
            style={{
              height: 56,
              borderRadius: 12,
              backgroundColor: "#E8670A",
              color: "#fff",
              fontFamily: font,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.1em",
              cursor: isValid ? "pointer" : "default",
              opacity: isValid ? 1 : 0.4,
              border: "none",
              padding: "16px 24px",
            }}
            onMouseEnter={(e) => {
              if (isValid) e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,103,10,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
            aria-label="Pick my time"
          >
            Pick My Time <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default V2StepEmail;
