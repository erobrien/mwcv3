const stats = [
  { value: "10,000+", label: "Men Treated Since 2015" },
  { value: "3", label: "Virginia Centers" },
  { value: "4.9★", label: "Google Rating, 200+ Reviews" },
];

export const TRTTrustBar = () => (
  <section style={{ background: "#FFFFFF" }}>
    <div
      className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6"
      style={{ paddingTop: "clamp(64px, 10vw, 120px)", paddingBottom: "clamp(64px, 10vw, 120px)" }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-2"
          style={{
            background: "#FFFFFF",
            borderLeft: "4px solid #E8670A",
            padding: "24px 28px",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(13,8,7,0.04)",
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#122256",
              fontSize: "clamp(40px, 5vw, 56px)",
              lineHeight: 1,
              letterSpacing: "0.02em",
              fontWeight: 400,
            }}
          >
            {s.value}
          </div>
          <div
            className="uppercase"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#6B7F94",
              fontSize: 13,
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </section>
);
