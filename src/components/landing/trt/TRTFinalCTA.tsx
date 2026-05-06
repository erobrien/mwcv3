import { useState } from "react";

export const TRTFinalCTA = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (v: string) => v.replace(/\D/g, "").length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!validateEmail(email)) errs.email = "Please enter a valid email";
    if (!phone.trim()) errs.phone = "Phone is required";
    else if (!validatePhone(phone)) errs.phone = "Please enter a valid phone number";
    if (!location) errs.location = "Please select a location";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const params = new URLSearchParams({
      name, email, phone, location, source: "landing-page", service: "trt",
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
    border: "1px solid #D6DAE6",
    borderRadius: 8,
    padding: "0 16px",
    fontSize: 16,
    color: "#0E1230",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#E8670A";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,103,10,0.20)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#D6DAE6";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section id="final-cta" className="py-16 md:py-24" style={{ background: "#000033" }}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2
          className="font-bold"
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "clamp(28px, 3.6vw, 40px)",
            color: "#FFFFFF",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          Ready to Get Tested?
        </h2>
        <p className="text-base mt-3 max-w-[640px] mx-auto" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif" }}>
          Walk into any of our 3 Virginia centers for a same-day consultation. No commitment, no credit card.
        </p>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ color: "#D4A017", fontSize: "20px" }}>★</span>
          ))}
          <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.80)" }}>200+ Reviews</span>
        </div>

        {/* Form */}
        <div
          className="mx-auto mt-8 rounded-2xl p-8 mx-4 md:mx-auto"
          style={{
            background: "#FFFFFF",
            maxWidth: 480,
            boxShadow: "0 8px 40px rgba(0,0,0,0.30)",
          }}
        >
          <h3
            className="font-bold uppercase text-center mb-6"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(20px, 3vw, 24px)",
              color: "#000033",
              fontWeight: 700,
            }}
          >
            Book My Consultation
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <input
                type="text"
                placeholder="Full Name" aria-label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
                className="placeholder:text-[#8B92A8]"
                autoComplete="name"
              />
              {errors.name && <p className="text-xs mt-1 text-left" style={{ color: "#CC4444" }}>{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address" aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleFocus}
                onBlur={(e) => {
                  handleBlur(e);
                  if (email && !validateEmail(email)) setErrors((p) => ({ ...p, email: "Please enter a valid email" }));
                  else setErrors((p) => { const { email: _, ...rest } = p; return rest; });
                }}
                style={inputStyle}
                className="placeholder:text-[#8B92A8]"
                autoComplete="email"
              />
              {errors.email && <p className="text-xs mt-1 text-left" style={{ color: "#CC4444" }}>{errors.email}</p>}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number" aria-label="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={handleFocus}
                onBlur={(e) => {
                  handleBlur(e);
                  if (phone && !validatePhone(phone)) setErrors((p) => ({ ...p, phone: "Please enter a valid phone number" }));
                  else setErrors((p) => { const { phone: _, ...rest } = p; return rest; });
                }}
                style={inputStyle}
                className="placeholder:text-[#8B92A8]"
                autoComplete="tel"
              />
              {errors.phone && <p className="text-xs mt-1 text-left" style={{ color: "#CC4444" }}>{errors.phone}</p>}
            </div>

            <div>
              <select aria-label="Preferred clinic location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={handleFocus as any}
                onBlur={handleBlur as any}
                style={{
                  ...inputStyle,
                  color: location ? "#000033" : "#999999",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23999999' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: 40,
                }}
              >
                <option value="" disabled>Select Location</option>
                <option value="richmond">Richmond</option>
                <option value="newport-news">Newport News</option>
                <option value="virginia-beach">Virginia Beach</option>
              </select>
              {errors.location && <p className="text-xs mt-1 text-left" style={{ color: "#CC4444" }}>{errors.location}</p>}
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
                marginTop: 8,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#CF5B09"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#E8670A"; }}
            >
              Claim My Consultation
            </button>
          </form>

          <p className="text-center text-xs mt-4" style={{ color: "#999999", fontFamily: "Inter, sans-serif" }}>
            HIPAA Compliant · No Spam · Response Within 1 Hour
          </p>

          <p className="text-center text-sm mt-3">
            <a
              href="tel:8663444955"
              className="font-bold transition-colors duration-200"
              style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}
            >
              Or call: 866-344-4955
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
