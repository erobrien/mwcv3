import { useState } from "react";
import { Shield, MapPin, Calendar, CheckCircle, ArrowRight, Star } from "lucide-react";

interface V2StepOneProps {
  onNext: (data: { firstName: string; phone: string; location: string }) => void;
  initialData?: { firstName?: string; phone?: string; location?: string };
}

const locations = [
  { value: "richmond", label: "Richmond, VA" },
  { value: "newport-news", label: "Newport News, VA" },
  { value: "virginia-beach", label: "Virginia Beach, VA" },
];

const trustBadges = [
  { icon: Shield, label: "LegitScript Certified" },
  { icon: MapPin, label: "3 Virginia Centers" },
  { icon: Calendar, label: "Since 2015" },
  { icon: CheckCircle, label: "FDA-Approved Therapies" },
];

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

const inputStyle: React.CSSProperties = {
  height: 52,
  borderRadius: 10,
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  padding: "14px 16px",
  fontSize: 16,
  width: "100%",
  outline: "none",
  fontFamily: font,
  fontWeight: 400,
};

const V2StepOne = ({ onNext, initialData }: V2StepOneProps) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [consent, setConsent] = useState(false);

  const isValid = firstName.trim() && phone.trim() && location;

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

      {/* Form card */}
      <div
        className="w-full max-w-[480px] rounded-2xl p-6 md:p-8"
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#9CA3AF", letterSpacing: "0.08em" }}>
              First Name
            </label>
            <input
              style={inputStyle}
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,103,10,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.15)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
              aria-label="First name"
            />
          </div>
          <div>
            <label className="mb-2 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#9CA3AF", letterSpacing: "0.08em" }}>
              Phone Number
            </label>
            <input
              style={inputStyle}
              type="tel"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(232,103,10,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.15)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
              aria-label="Phone number"
            />
          </div>
          <div>
            <label className="mb-2 block uppercase" style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#9CA3AF", letterSpacing: "0.08em" }}>
              Your Location
            </label>
            <div className="space-y-2">
              {locations.map((loc) => (
                <button
                  key={loc.value}
                  type="button"
                  onClick={() => setLocation(loc.value)}
                  className="flex w-full items-center gap-3 rounded-xl px-4 transition-all"
                  style={{
                    minHeight: 48,
                    fontFamily: font,
                    fontWeight: 500,
                    fontSize: 15,
                    color: "#fff",
                    backgroundColor: location === loc.value ? "rgba(232,103,10,0.08)" : "rgba(255,255,255,0.05)",
                    border: location === loc.value ? "2px solid #E8670A" : "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                  }}
                  aria-label={`Select ${loc.label}`}
                >
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: location === loc.value ? "#E8670A" : "#9CA3AF" }} />
                  {loc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => isValid && onNext({ firstName: firstName.trim(), phone, location })}
          disabled={!isValid}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl uppercase transition-all"
          style={{
            height: 56,
            backgroundColor: "#E8670A",
            color: "#fff",
            fontFamily: font,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.1em",
            cursor: isValid ? "pointer" : "default",
            opacity: isValid ? 1 : 0.4,
            border: "none",
          }}
          onMouseEnter={(e) => { if (isValid) { e.currentTarget.style.boxShadow = "0 4px 20px rgba(232,103,10,0.3)"; } }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          aria-label="See available times"
        >
          See Available Times <ArrowRight className="h-4 w-4" />
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

        {/* TCPA Consent */}
        <div className="mt-4 flex items-start gap-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded"
            style={{ accentColor: "#E8670A" }}
            aria-label="SMS consent"
            id="v2-sms-consent"
          />
          <label htmlFor="v2-sms-consent" style={{ fontFamily: font, fontSize: 11, color: "#9CA3AF", lineHeight: 1.5 }}>
            I consent to receive appointment and marketing texts from Men's Wellness Centers. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help. Consent is not required to receive services.{" "}
            <a href="/privacy-policy" style={{ color: "#E8670A", textDecoration: "underline" }}>Privacy Policy</a> ·{" "}
            <a href="/terms-of-service" style={{ color: "#E8670A", textDecoration: "underline" }}>Terms</a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default V2StepOne;
