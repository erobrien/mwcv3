import { useState } from "react";
import { Lock } from "lucide-react";

const ORANGE = "#E8670A";
const ORANGE_HOVER = "#D45A00";

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export const TRTHeroForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [tcpa, setTcpa] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const validatePhone = (v: string) => v.replace(/\D/g, "").length === 10;
  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!validatePhone(phone)) errs.phone = "Valid 10-digit phone required";
    if (!validateEmail(email)) errs.email = "Valid email is required";
    if (!location) errs.location = "Please select a location";
    if (!tcpa) errs.tcpa = "Consent required to continue";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const params = new URLSearchParams({
      name, phone, email, location, source: "landing-page-hero", service: "trt",
    });
    const urls: Record<string, string> = {
      richmond: "https://menswellnesscenters.com/thank-you-richmond/",
      "newport-news": "https://menswellnesscenters.com/thank-you-newport-news/",
      "virginia-beach": "https://menswellnesscenters.com/thank-you-virginia-beach/",
    };
    window.location.href = `${urls[location]}?${params.toString()}`;
  };

  const inputBase = (field: string): React.CSSProperties => ({
    width: "100%",
    height: 50,
    background: "rgba(13,8,7,0.55)",
    border: `1px solid ${focused === field ? ORANGE : "rgba(255,255,255,0.20)"}`,
    borderRadius: 4,
    padding: "0 16px",
    fontSize: 15,
    color: "#FFFFFF",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    transition: "border-color 150ms ease",
  });

  return (
    <div
      className="p-7 md:p-8 w-full"
      style={{
        background: "rgba(18,34,86,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        maxWidth: 420,
        boxShadow: "0 12px 32px rgba(13,8,7,0.45)",
      }}
    >
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 28,
          color: "#FFFFFF",
          fontWeight: 400,
          letterSpacing: "0.02em",
          lineHeight: 1.15,
          textTransform: "uppercase",
        }}
      >
        Book My Consult
      </h2>
      <p
        className="mt-1.5 mb-5"
        style={{ color: "rgba(255,255,255,0.70)", fontFamily: "Inter, sans-serif", fontSize: 14 }}
      >
        Same or next day. Takes 30 seconds.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label htmlFor="hf-name" className="sr-only">Full Name</label>
          <input
            id="hf-name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            style={inputBase("name")}
            autoComplete="name"
          />
          {errors.name && <p className="text-xs mt-1" style={{ color: "#FF8A8A" }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="hf-phone" className="sr-only">Phone Number</label>
          <input
            id="hf-phone"
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
            style={inputBase("phone")}
            autoComplete="tel"
            inputMode="tel"
          />
          {errors.phone && <p className="text-xs mt-1" style={{ color: "#FF8A8A" }}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="hf-email" className="sr-only">Email Address</label>
          <input
            id="hf-email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value.slice(0, 255))}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={inputBase("email")}
            autoComplete="email"
            inputMode="email"
          />
          {errors.email && <p className="text-xs mt-1" style={{ color: "#FF8A8A" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="hf-loc" className="sr-only">Preferred Location</label>
          <select
            id="hf-loc"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setFocused("location")}
            onBlur={() => setFocused(null)}
            style={{
              ...inputBase("location"),
              color: location ? "#FFFFFF" : "rgba(255,255,255,0.55)",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23FFFFFF' opacity='0.7' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: 40,
            }}
          >
            <option value="" disabled style={{ color: "#122256" }}>Preferred Location</option>
            <option value="virginia-beach" style={{ color: "#122256" }}>Virginia Beach</option>
            <option value="newport-news" style={{ color: "#122256" }}>Newport News</option>
            <option value="richmond" style={{ color: "#122256" }}>Richmond</option>
          </select>
          {errors.location && <p className="text-xs mt-1" style={{ color: "#FF8A8A" }}>{errors.location}</p>}
        </div>

        <button
          type="submit"
          className="w-full uppercase font-semibold cursor-pointer"
          style={{
            height: 56,
            background: ORANGE,
            color: "#FFFFFF",
            fontSize: 14,
            border: "none",
            borderRadius: 4,
            letterSpacing: "0.02em",
            fontFamily: "Inter, sans-serif",
            marginTop: 4,
            transition: "background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = ORANGE_HOVER;
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(232,103,10,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = ORANGE;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Book My Consult
        </button>

        <label className="flex items-start gap-2 mt-3 cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
          <input
            type="checkbox"
            checked={tcpa}
            onChange={(e) => setTcpa(e.target.checked)}
            className="mt-0.5 flex-shrink-0"
            style={{ accentColor: ORANGE }}
          />
          <span style={{ color: "rgba(255,255,255,0.60)", fontSize: 11, lineHeight: 1.4 }}>
            I agree to receive SMS/calls about my appointment. Reply STOP to opt out. Msg & data rates may apply.
          </span>
        </label>
        {errors.tcpa && <p className="text-xs" style={{ color: "#FF8A8A" }}>{errors.tcpa}</p>}
      </form>

      <p className="text-center mt-4 inline-flex items-center justify-center gap-1.5 w-full" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "Inter, sans-serif", fontSize: 12 }}>
        <Lock size={12} /> HIPAA secure. No spam, ever.
      </p>
    </div>
  );
};
