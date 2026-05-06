const stats = [
  { value: "10,000+", label: "Men Treated Since 2015" },
  { value: "10+", label: "Years of Experience" },
  { value: "Same-Day", label: "Appointments Available" },
];

export const TRTTrustBar = () => (
  <section style={{ background: "#000033", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
    <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 text-center">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-2">
          <div
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, sans-serif",
              color: "#FFFFFF",
              fontSize: 56,
              lineHeight: 1,
              letterSpacing: "-0.01em",
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
  </section>
);
