import imgManifesto from "@/assets/lp/trt-provider-patient.jpg";

export const TRTManifesto = () => {
  const stats = [
    { num: "10,000+", label: "Men Treated" },
    { num: "Since 2015", label: "Serving Virginia" },
    { num: "4.9★", label: "Average Rating" },
  ];

  return (
    <section className="py-16 md:py-24" style={{ background: "#000033" }}>
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left: image */}
        <div className="order-1">
          <img
            src={imgManifesto}
            alt="Licensed Virginia provider speaking face-to-face with a male patient during a TRT consultation"
            className="rounded-2xl object-cover w-full aspect-[4/3] md:aspect-auto md:h-[420px]"
            loading="lazy"
            width={1024}
            height={1024}
          />
        </div>

        {/* Right: copy */}
        <div className="order-2">
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
            Testosterone Care Was Broken. We Fixed It.
          </h2>

          <p
            className="text-base mt-5 leading-[1.7]"
            style={{ color: "rgba(255,255,255,0.80)", fontFamily: "Inter, sans-serif" }}
          >
            Most men get a lab slip and a 10-minute video call. We do it differently. On-site labs, a face-to-face consultation, and a personalized TRT protocol — all in one visit. Same provider, every follow-up. No app. No mail-order doctor.
          </p>

          <div className="flex flex-wrap gap-8 mt-8">
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
                  style={{ color: "rgba(255,255,255,0.60)", letterSpacing: "0.12em", fontFamily: "Inter, sans-serif", fontWeight: 600 }}
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
