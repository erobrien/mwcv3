import { useState } from "react";
import { Lock } from "lucide-react";

export const TRTHeroForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (v: string) => v.replace(/\D/g, "").length >= 10;
  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim() || !validateEmail(email)) errs.email = "Valid email required";
    if (!phone.trim() || !validatePhone(phone)) errs.phone = "Valid phone required";
    if (!location) errs.location = "Please select a location";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const params = new URLSearchParams({
      name, email, phone, location, source: "landing-page-hero", service: "trt",
    });
    const urls: Record<string, string> = {
      richmond: "https://menswellnesscenters.com/thank-you-richmond/",
      "newport-news": "https://menswellnesscenters.com/thank-you-newport-news/",
      "virginia-beach": "https://menswellnesscenters.com/thank-you-virginia-beach/",
    };
    window.location.href = `${urls[location]}?${params.toString()}`;
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 48,
    background: "#FFFFFF",
    border: "1.5px solid #D5D2CC",
    borderRadius: 8,
    padding: "0 14px",
    fontSize: 16,
    color: "#000033",
    outline: "none",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "#FFFFFF",
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
      }}
    >
      <h2
        className="font-bold uppercase text-center"
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: 24,
          color: "#000033",
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        Book My Free Consult
      </h2>
      <p
        className="text-center mt-1 mb-4 text-sm"
        style={{ color: "#666", fontFamily: "Inter, sans-serif" }}
      >
        Same or next day. Takes 30 seconds.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} autoComplete="name" />
          {errors.name && <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.name}</p>}
        </div>
        <div>
          <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} autoComplete="tel" />
          {errors.phone && <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.phone}</p>}
        </div>
        <div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} autoComplete="email" />
          {errors.email && <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.email}</p>}
        </div>
        <div>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              ...inputStyle,
              color: location ? "#000033" : "#999",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: 40,
            }}
          >
            <option value="" disabled>Select Location</option>
            <option value="richmond">Richmond / Glen Allen</option>
            <option value="newport-news">Newport News</option>
            <option value="virginia-beach">Virginia Beach</option>
          </select>
          {errors.location && <p className="text-xs mt-1" style={{ color: "#CC4444" }}>{errors.location}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-full uppercase font-bold cursor-pointer transition-colors duration-200"
          style={{
            height: 52,
            background: "#E8670A",
            color: "#FFFFFF",
            fontSize: 14,
            border: "none",
            letterSpacing: "0.08em",
            fontFamily: "Inter, sans-serif",
            marginTop: 6,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
        >
          Book My Free Consult
        </button>
      </form>

      <p className="text-center text-xs mt-3 inline-flex items-center justify-center gap-1.5 w-full" style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>
        <Lock size={12} /> HIPAA secure. No spam, ever.
      </p>
    </div>
  );
};
