import { Star, ShieldCheck } from "lucide-react";

const stats = [
  { value: "2–5×", label: "Increase in total testosterone within first 2 months" },
  { value: "84%", label: "Of patients report meaningful symptom improvement" },
];

const testimonials = [
  {
    quote:
      "Six months on TRT and I finally feel like myself again. Energy is up, mood is stable, and I'm sleeping through the night for the first time in years.",
    name: "Mark B.",
    city: "Richmond, VA",
  },
  {
    quote:
      "The nursing staff here is top-notch. They walk you through everything, answer every question, and actually follow up after your visits. Never experienced that anywhere else.",
    name: "Howard B.",
    city: "Virginia Beach, VA",
  },
  {
    quote:
      "From the front desk to the physician, every person I've dealt with has been professional and genuinely helpful. You can tell they care about results, not just billing.",
    name: "Douglas H.",
    city: "Newport News, VA",
  },
  {
    quote:
      "Got my labs back in two days and started treatment the same week. No runaround, no waiting months. The team moves fast and knows what they're doing.",
    name: "James R.",
    city: "Richmond, VA",
  },
  {
    quote:
      "I feel stronger and more focused than I have in years. My wife says I'm a different person. Should've done this years ago.",
    name: "Steve P.",
    city: "Chesapeake, VA",
  },
  {
    quote:
      "I was hesitant about hormone therapy but the doctor laid everything out honestly. No pressure, just facts. Three months in and I wish I'd started sooner.",
    name: "David K.",
    city: "Norfolk, VA",
  },
];

export const TRTResults = () => (
  <section id="results" style={{ background: "#F5F0EB" }}>
    <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-24">
      <h2
        className="font-bold uppercase text-center"
        style={{ fontFamily: "Oswald, sans-serif", color: "#000033", fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "0.02em" }}
      >
        Real Members. Real Experiences.
      </h2>


      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-2xl p-6 flex flex-col" style={{ background: "#FFFFFF", border: "1px solid #E5E5EA" }}>
            <div className="flex items-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="#FFC107" stroke="#FFC107" />)}
            </div>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "#1a1a2e", fontFamily: "Inter, sans-serif" }}>
              "{t.quote}"
            </p>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "#E5E5EA" }}>
              <div className="text-sm font-semibold" style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}>{t.name}</div>
              <div className="text-xs" style={{ color: "#7a7a8e", fontFamily: "Inter, sans-serif" }}>{t.city}</div>
              <div
                className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase font-semibold px-2 py-0.5 rounded"
                style={{ background: "#E8F5E9", color: "#1B5E20", letterSpacing: "0.08em" }}
              >
                <ShieldCheck className="h-3 w-3" /> Verified Patient Review
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://www.google.com/search?q=Men%27s+Wellness+Centers+Virginia+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold underline underline-offset-4"
          style={{ color: "#000033", fontFamily: "Inter, sans-serif" }}
        >
          Read all 200+ reviews on Google →
        </a>
      </div>
    </div>
  </section>
);
