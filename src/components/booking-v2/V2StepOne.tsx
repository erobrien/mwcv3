import { useState } from "react";
import { Shield, MapPin, Calendar, CheckCircle, ArrowRight, Star } from "lucide-react";

interface V2StepOneProps {
  onNext: (data: { firstName: string; phone: string; email: string; location: string }) => void;
  initialData?: { firstName?: string; phone?: string; email?: string; location?: string };
}

const trustBadges = [
  { icon: Shield, label: "LegitScript Certified" },
  { icon: MapPin, label: "3 Virginia Centers" },
  { icon: Calendar, label: "Since 2015" },
  { icon: CheckCircle, label: "FDA-Approved Therapies" },
];

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const inputStyle: React.CSSProperties = {
  height: 56,
  borderRadius: 12,
  backgroundColor: "#F5F0EB",
  border: "1px solid #E5E0DA",
  color: "#1A1A2E",
  padding: "0 18px",
  fontSize: 16,
  width: "100%",
  outline: "none",
  fontFamily: font,
  fontWeight: 400,
};

const V2StepOne = ({ onNext, initialData }: V2StepOneProps) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [consent, setConsent] = useState(false);

  const isValid = true;

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#E8670A";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.12)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#E5E0DA";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div className="flex flex-col items-center px-5 py-8 md:py-12">
      <h1
        className="text-center uppercase"
        style={{
          fontFamily: headingFont,
          fontWeight: 400,
          fontSize: "clamp(28px, 6vw, 40px)",
          color: "#fff",
          letterSpacing: "0.05em",
          lineHeight: 1.05,
          marginBottom: 8,
        }}
      >
        Your Consultation Is Waiting
      </h1>

      <p className="mb-3 text-center" style={{ fontFamily: font, fontWeight: 400, fontSize: 15, color: "#B0ADA8", lineHeight: 1.5 }}>
        Licensed physician. No obligation. No pressure.
      </p>

      {/* Trust line */}
      <div className="mb-6 flex items-center justify-center gap-2" style={{ fontFamily: font, fontSize: 13, fontWeight: 500 }}>
        <Star className="h-4 w-4" style={{ color: "#E8670A" }} fill="#E8670A" />
        <span style={{ color: "#fff" }}>4.9 Google Reviews · 10,000+ Men Treated</span>
      </div>

      {/* Form card — white surface */}
      <div
        className="w-full max-w-[480px] rounded-2xl p-6 md:p-8"
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
        }}
      >
        {/* Card heading */}
        <h2
          className="mb-6 text-center uppercase"
          style={{ fontFamily: headingFont, fontSize: 26, color: "#1A1A2E", letterSpacing: "0.04em" }}
        >
          Book My Consultation
        </h2>

        <div className="space-y-4">
          <input
            style={inputStyle}
            placeholder="Full Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={focusStyle}
            onBlur={blurStyle}
            aria-label="Full name"
          />
          <input
            style={inputStyle}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={focusStyle}
            onBlur={blurStyle}
            aria-label="Email address"
          />
          <input
            style={inputStyle}
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={focusStyle}
            onBlur={blurStyle}
            aria-label="Phone number"
          />
          <select
            style={{
              ...inputStyle,
              appearance: "none",
              color: location ? "#1A1A2E" : "#888888",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 18px center",
            }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={focusStyle as any}
            onBlur={blurStyle as any}
            aria-label="Select location"
          >
            <option value="" disabled>Location</option>
            <option value="richmond">Richmond, VA</option>
            <option value="newport-news">Newport News, VA</option>
            <option value="virginia-beach">Virginia Beach, VA</option>
          </select>
        </div>

        {/* TCPA Consent */}
        <div className="mt-5 flex items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded"
            style={{ accentColor: "#E8670A" }}
            aria-label="SMS consent"
            id="v2-sms-consent"
          />
          <label htmlFor="v2-sms-consent" style={{ fontFamily: font, fontSize: 13, color: "#555555", lineHeight: 1.6 }}>
            I consent to receive appointment and marketing texts from Men's Wellness Centers. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help. Consent is not required to receive services.
          </label>
        </div>

        {/* Privacy / Terms links */}
        <div className="mt-3 flex items-center justify-center gap-2" style={{ fontFamily: font, fontSize: 13 }}>
          <a href="/privacy-policy" style={{ color: "#555555", textDecoration: "underline" }}>Privacy Policy</a>
          <span style={{ color: "#D1D5DB" }}>|</span>
          <a href="/terms-of-service" style={{ color: "#555555", textDecoration: "underline" }}>Terms of Services</a>
        </div>

        {/* CTA */}
        <button
          onClick={() => isValid && onNext({ firstName: firstName.trim(), phone, email: email.trim(), location })}
          disabled={!isValid}
          className="mt-6 flex w-full items-center justify-center gap-2 uppercase transition-all"
          style={{
            height: 56,
            borderRadius: 9999,
            backgroundColor: "#E8670A",
            color: "#fff",
            fontFamily: font,
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: "0.08em",
            cursor: isValid ? "pointer" : "default",
            opacity: isValid ? 1 : 0.4,
            border: "none",
          }}
          onMouseEnter={(e) => { if (isValid) e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,103,10,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          aria-label="Schedule my consultation"
        >
          Schedule My Consultation
        </button>

        {/* Trust badges */}
        <div className="mt-5 grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-4">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5" style={{ fontFamily: font, fontSize: 11, color: "#9CA3AF" }}>
              <b.icon className="h-3.5 w-3.5" />
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default V2StepOne;
