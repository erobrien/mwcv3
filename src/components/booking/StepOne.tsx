import { useState } from "react";
import { Shield, MapPin, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { TCPAConsent } from "@/components/ui/TCPAConsent";

interface StepOneProps {
  onNext: (data: { firstName: string; phone: string; email: string }) => void;
}

const trustBadges = [
  { icon: Shield, label: "LegitScript Certified" },
  { icon: MapPin, label: "3 Virginia Centers" },
  { icon: Calendar, label: "Since 2015" },
  { icon: CheckCircle, label: "FDA-Approved Therapies" },
];

const StepOne = ({ onNext }: StepOneProps) => {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "First name is required";
    if (!/^\d{10,}$/.test(phone.replace(/\D/g, ""))) e.phone = "Enter a valid 10-digit phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onNext({ firstName: firstName.trim(), phone, email: email.trim() });
  };

  const inputStyle: React.CSSProperties = {
    height: 52,
    borderRadius: 10,
    backgroundColor: "#fff",
    border: "1px solid #D1D5DB",
    color: "#1A1A2E",
    padding: "0 16px",
    fontSize: 16,
    width: "100%",
    outline: "none",
  };

  return (
    <div className="flex flex-col items-center px-5 py-4 md:min-h-[calc(100vh-88px)] md:justify-center md:py-8" style={{ backgroundColor: "#EBEAE8" }}>
      <h1
        className="mx-auto max-w-xl text-center uppercase"
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
          lineHeight: 1.05,
          color: "#000033",
          letterSpacing: "-0.02em",
          transform: "skewX(-3deg)",
          marginBottom: 8,
        }}
      >
        Free Consultation Is Waiting
      </h1>

      <p className="mx-auto mb-3 max-w-md text-center" style={{ color: "#555555", fontSize: 15, lineHeight: 1.5 }}>
        60-minute visit. Licensed physician. No obligation.
      </p>

      <div
        className="mx-auto w-full max-w-[480px] rounded-2xl bg-white p-6 md:p-8"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase" style={{ color: "#555555", letterSpacing: "0.08em" }}>First Name</label>
            <input
              style={inputStyle}
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.15)"; e.currentTarget.style.borderColor = "#E8670A"; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
            />
            {errors.firstName && <p className="mt-1 text-xs" style={{ color: "#DC2626" }}>{errors.firstName}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase" style={{ color: "#555555", letterSpacing: "0.08em" }}>Phone Number</label>
            <input
              style={inputStyle}
              type="tel"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.15)"; e.currentTarget.style.borderColor = "#E8670A"; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
            />
            {errors.phone && <p className="mt-1 text-xs" style={{ color: "#DC2626" }}>{errors.phone}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase" style={{ color: "#555555", letterSpacing: "0.08em" }}>Email Address</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.15)"; e.currentTarget.style.borderColor = "#E8670A"; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
            />
            {errors.email && <p className="mt-1 text-xs" style={{ color: "#DC2626" }}>{errors.email}</p>}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 flex w-full items-center justify-center gap-2 font-bold transition-all hover:shadow-lg"
          style={{
            height: 56,
            borderRadius: 9999,
            backgroundColor: "#E8670A",
            color: "#fff",
            fontSize: 16,
            cursor: "pointer",
            border: "none",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.backgroundColor = "#D45A06"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = "#E8670A"; }}
        >
          See Available Times <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-1" style={{ color: "#888888", fontSize: 10, letterSpacing: "0.06em" }}>
              <b.icon className="h-3 w-3" />
              <span className="uppercase">{b.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-3">
          <TCPAConsent consent={consent} onChange={setConsent} variant="light" id="step1-consent" />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
