const stats = [
  { value: "10,000+", label: "Men Treated Since 2015" },
  { value: "10+", label: "Years of Experience" },
  { value: "Same-Day", label: "Appointments Available" },
  { value: "4.9★", label: "Google Rating" },
];

export const TRTTrustBar = () => (
  <section style={{ background: "#000033", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
    <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-24">
      {/* Subtitle above stats */}
      <div
        className="text-center mb-10 uppercase tracking-[0.18em] font-semibold"
        style={{
          fontFamily: "Inter, sans-serif",
          color: "rgba(255,255,255,0.45)",
          fontSize: 11,
        }}
      >
        Trusted by Virginia men since 2015
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 text-center">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <div
              className="font-bold uppercase pb-1"
              style={{
                fontFamily: "Oswald, sans-serif",
                color: "#FFFFFF",
                fontSize: "clamp(36px, 4.5vw, 52px)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                borderBottom: "3px solid #E8670A",
                paddingBottom: "6px",
              }}
            >
              {s.value}
            </div>
            <div
              className="uppercase"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "rgba(255,255,255,0.70)",
                fontSize: 12,
                letterSpacing: "0.12em",
                fontWeight: 600,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
