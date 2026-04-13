import { TRTv2LeadForm } from "./TRTv2LeadForm";

export const TRTv2FinalCTA = () => (
  <section style={{ background: "#EBEAE8", textAlign: "center", padding: "clamp(48px, 8vw, 96px) 0" }} id="book">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-[640px] mx-auto mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#000033" }}>
          Ready to Feel Like Yourself Again?
        </h2>
      </div>
      <TRTv2LeadForm heading="Get Started — It's Free" formId="bottom" />
    </div>
  </section>
);
