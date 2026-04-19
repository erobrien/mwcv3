export const TRTResults = () => {
  return (
    <section id="results" className="py-14 md:py-20" style={{ background: "#F5F0EB" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left — Stats */}
        <div>
          <p
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(22px, 3vw, 28px)",
              color: "#000033",
              fontWeight: 700,
            }}
          >
            WITHIN YOUR FIRST 2 MONTHS
          </p>

          <div className="mt-8 space-y-8">
            <div>
              <span
                className="font-bold"
                style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(48px, 6vw, 64px)", color: "#000033", fontWeight: 700 }}
              >
                2-5X
              </span>
              <svg width="48" height="48" className="ml-3 inline-block align-middle" viewBox="0 0 48 48">
                <path d="M24 40 V12 M12 22 L24 8 L36 22" fill="none" stroke="#000033" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm mt-1" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
                increase in your total testosterone*
              </p>
            </div>

            <div>
              <span
                className="font-bold"
                style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(48px, 6vw, 64px)", color: "#000033", fontWeight: 700 }}
              >
                84%
              </span>
              <p className="text-sm mt-1" style={{ color: "#4A4A4A", fontFamily: "Inter, sans-serif" }}>
                reported significant improvement in symptoms*
              </p>
            </div>
          </div>

          <p className="text-xs mt-6" style={{ color: "#888888", fontFamily: "Inter, sans-serif" }}>
            *Based on published clinical TRT data
          </p>
        </div>

        {/* Right — Testimonial */}
        <div>
          <div className="rounded-2xl p-8" style={{ background: "#000033" }}>
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "#D4A017", fontSize: "18px" }}>★</span>
              ))}
            </div>
            <p
              className="text-base italic leading-relaxed"
              style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}
            >
              "I was tired all the time, gaining weight, zero motivation. Two months in and my wife says I'm a different man. On-site labs, face-to-face with my doctor every visit. The real deal."
            </p>
            <p className="mt-4 font-bold text-sm" style={{ color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
              Marty H.
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "Inter, sans-serif" }}>
              Verified Member · Richmond, VA
            </p>
          </div>
          <a
            href="#results"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold underline transition-colors duration-200"
            style={{
              color: "#000033",
              textDecorationColor: "rgba(0,0,51,0.30)",
              fontFamily: "Inter, sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecorationColor = "#000033"; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecorationColor = "rgba(0,0,51,0.30)"; }}
          >
            Read 200+ reviews
          </a>
        </div>
      </div>
    </section>
  );
};
