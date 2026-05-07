const stats = [
  { value: "10,000+", label: "Men Treated Since 2015" },
  { value: "3", label: "Virginia Clinics" },
  { value: "4.9★", label: "Google Rating, 200+ Reviews" },
];

export const TRTTrustBar = () => (
  <section style={{ background: "#000033", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
    <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-2">
          <div
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, sans-serif",
              color: "#FFFFFF",
              fontSize: "clamp(36px, 5vw, 56px)",
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
              color: "rgba(255,255,255,0.65)",
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
