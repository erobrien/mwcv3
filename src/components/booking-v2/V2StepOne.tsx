import { useState } from "react";
import { Shield, MapPin, Calendar, CheckCircle, ArrowRight, Star } from "lucide-react";

interface V2StepOneProps {
  onNext: (data: { firstName: string; phone: string; location: string; smsConsent: boolean }) => void;
  initialData?: { firstName?: string; phone?: string; location?: string; smsConsent?: boolean };
}

const font = "'Montserrat', sans-serif";
const headingFont = "'Bebas Neue', sans-serif";

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

const V2StepOne = ({ onNext, initialData }: V2StepOneProps) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [consent, setConsent] = useState(initialData?.smsConsent ?? false);

  const isValid = firstName.trim() && phone.trim() && location && consent;

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(232,103,10,0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.12)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div className="flex flex-col items-center px-5 py-8 md:py-12">
      <h1
        className="text-center uppercase"
        style={{
          fontFamily: headingFont,
          fontSize: "clamp(28px, 6vw, 40px)",
          color: "#fff",
          letterSpacing: "0.05em",
          lineHeight: 1.05,
          marginBottom: 8,
        }}
      >
        My Consultation Is Waiting
      </h1>

      <p
        className="mb-3 text-center"
        style={{ fontFamily: font, fontWeight: 400, fontSize: 15, color: "#B8B6B2", lineHeight: 1.5 }}
      >
        Licensed physician. No obligation. No pressure.
      </p>

      {/* Trust line */}
      <div
        className="mb-6 flex items-center justify-center gap-2"
        style={{ fontFamily: font, fontSize: 13, fontWeight: 500 }}
      >
        <Star className="h-4 w-4" style={{ color: "#E8670A" }} fill="#E8670A" />
        <span style={{ color: "#fff" }}>4.9 Google Reviews · 10,000+ Men Treated</span>
      </div>

      {/* Form card — glassmorphism */}
      <div
        className="w-full max-w-[480px] rounded-2xl p-6 md:p-8"
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2
          className="mb-6 text-center uppercase"
          style={{ fontFamily: headingFont, fontSize: 26, color: "#fff", letterSpacing: "0.04em" }}
        >
          Book My Consultation
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label
              className="mb-1.5 block uppercase"
              style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#AEB5BF", letterSpacing: "0.08em" }}
            >
              Full Name
            </label>
            <input
              style={glassInput}
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={focusStyle}
              onBlur={blurStyle}
              aria-label="Full name"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              className="mb-1.5 block uppercase"
              style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#AEB5BF", letterSpacing: "0.08em" }}
            >
              Phone Number
            </label>
            <input
              style={glassInput}
              type="tel"
              placeholder="(555) 555-5555"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onFocus={focusStyle}
              onBlur={blurStyle}
              aria-label="Phone number"
            />
          </div>

          {/* Location Cards */}
          <div>
            <label
              className="mb-2 block uppercase"
              style={{ fontFamily: font, fontWeight: 600, fontSize: 12, color: "#AEB5BF", letterSpacing: "0.08em" }}
            >
              Select Location
            </label>
            <div className="space-y-2">
              {locations.map((loc) => {
                const selected = location === loc.value;
                return (
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
                      backgroundColor: selected ? "rgba(232,103,10,0.08)" : "rgba(255,255,255,0.05)",
                      border: selected ? "2px solid #E8670A" : "1px solid rgba(255,255,255,0.1)",
                      cursor: "pointer",
                    }}
                    aria-label={loc.label}
                  >
                    <MapPin className="h-4 w-4 shrink-0" style={{ color: selected ? "#E8670A" : "#AEB5BF" }} />
                    {loc.label}
                  </button>
                );
              })}
            </div>
          </div>
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
          <label
            htmlFor="v2-sms-consent"
            style={{ fontFamily: font, fontSize: 13, color: "#B8B6B2", lineHeight: 1.6 }}
          >
            I consent to receive appointment and marketing texts from Men's Wellness Centers. Msg frequency
            varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help. Consent is not
            required to receive services.
          </label>
        </div>

        {/* Privacy / Terms links */}
        <div
          className="mt-3 flex items-center justify-center gap-2"
          style={{ fontFamily: font, fontSize: 13 }}
        >
          <a href="/privacy-policy" style={{ color: "#B8B6B2", textDecoration: "underline" }}>
            Privacy Policy
          </a>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <a href="/terms-of-service" style={{ color: "#B8B6B2", textDecoration: "underline" }}>
            Terms of Services
          </a>
        </div>

        {/* CTA */}
        <button
          onClick={() =>
            isValid && onNext({ firstName: firstName.trim(), phone, location, smsConsent: consent })
          }
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
          aria-label="Schedule my consultation"
        >
          Schedule My Consultation <ArrowRight className="h-4 w-4" />
        </button>

        {/* Trust badges */}
        <div className="mt-5 grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-4">
          {trustBadges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-1.5"
              style={{ fontFamily: font, fontSize: 11, color: "#AEB5BF" }}
            >
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
