import imgManifesto from "@/assets/lp/man-athletic-smiling.jpeg";

export const TRTManifesto = () => {
  const stats = [
    { num: "10,000+", label: "MEN TREATED" },
    { num: "Since 2015", label: "SERVING VIRGINIA" },
    { num: "4.9★", label: "AVERAGE RATING" },
  ];

  return (
    <section className="py-10 md:py-16" style={{ background: "#000033" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left: image (first on both mobile & desktop) */}
        <div className="order-1">
          <img
            src={imgManifesto}
            alt="Confident man after testosterone therapy"
            className="rounded-2xl object-cover w-full aspect-[4/3] md:aspect-auto md:h-[400px]"
            loading="lazy"
          />
        </div>

        {/* Right: copy */}
        <div className="order-2">
          <h2
            className="font-bold uppercase"
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#FFFFFF",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            TESTOSTERONE CARE<br />
            WAS BROKEN.<br />
            <span>WE FIXED IT.</span>
          </h2>

          <p
            className="text-base mt-4 leading-[1.7]"
            style={{ color: "rgba(255,255,255,0.70)", fontFamily: "Inter, sans-serif" }}
          >
            Most men get a lab slip and a 10-minute video call. We do it differently. On-site bloodwork, a face-to-face consultation, and a personalized TRT protocol — all in one visit. Same provider, every follow-up. No app. No mail-order doctor.
          </p>

          <div className="flex gap-8 mt-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span
                  className="font-bold"
                  style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(24px, 3vw, 32px)", color: "#FFFFFF", fontWeight: 700 }}
                >
                  {s.num}
                </span>
                <span
                  className="text-xs uppercase mt-1"
                  style={{ color: "rgba(255,255,255,0.50)", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
