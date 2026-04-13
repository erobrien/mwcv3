import { useState, useRef } from "react";
import V2Header from "@/components/booking-v2/V2Header";
import V2ProgressBar from "@/components/booking-v2/V2ProgressBar";
import V2StepOne from "@/components/booking-v2/V2StepOne";
import V2StepTwo from "@/components/booking-v2/V2StepTwo";
import V2StepThree from "@/components/booking-v2/V2StepThree";
import V2StepFour from "@/components/booking-v2/V2StepFour";
import { ArrowLeft } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

const locationLabels: Record<string, string> = {
  richmond: "Richmond, VA",
  "newport-news": "Newport News, VA",
  "virginia-beach": "Virginia Beach, VA",
};

interface FormData {
  firstName: string;
  phone: string;
  location: string;
  primaryConcern: string;
  duration: string;
  priorTreatment: boolean;
  email: string;
  selectedDate: string;
  selectedTime: string;
  smsConsent: boolean;
  smsReminder: boolean;
}

const BookingFunnelV2 = () => {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "", phone: "", location: "",
    primaryConcern: "", duration: "", priorTreatment: false,
    email: "", selectedDate: "", selectedTime: "",
    smsConsent: false, smsReminder: true,
  });
  const [transitioning, setTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const goTo = (next: Step) => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(next);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  const goBack = () => {
    if (step > 1) goTo((step - 1) as Step);
  };

  const font = "'Montserrat', sans-serif";

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#0B1029" }}>
      <V2Header />

      <main className="flex flex-1 flex-col">
        {/* Progress bar */}
        <div className="mx-auto w-full max-w-lg px-5">
          <V2ProgressBar currentStep={step} onStepClick={(s) => goTo(s as Step)} />
        </div>

        {/* Back button */}
        {step > 1 && step < 4 && (
          <div className="mx-auto w-full max-w-lg px-5">
            <button
              type="button"
              onClick={goBack}
              className="mb-2 flex items-center gap-1 transition-all"
              style={{ fontFamily: font, fontWeight: 500, fontSize: 14, color: "#B0ADA8", cursor: "pointer", background: "none", border: "none" }}
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </div>
        )}

        {/* Step content */}
        <div
          ref={contentRef}
          className="flex-1 transition-all duration-200 ease-out"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(8px)" : "translateY(0)",
          }}
        >
          {step === 1 && (
            <V2StepOne
              initialData={formData}
              onNext={(d) => { setFormData((p) => ({ ...p, ...d })); goTo(2); }}
            />
          )}
          {step === 2 && (
            <V2StepTwo
              initialData={formData}
              onNext={(d) => { setFormData((p) => ({ ...p, ...d })); goTo(3); }}
            />
          )}
          {step === 3 && (
            <V2StepThree
              firstName={formData.firstName}
              phone={formData.phone}
              email={formData.email}
              locationLabel={locationLabels[formData.location] || formData.location}
              onNext={(d) => { setFormData((p) => ({ ...p, ...d })); goTo(4); }}
            />
          )}
          {step === 4 && (
            <V2StepFour
              firstName={formData.firstName}
              phone={formData.phone}
              email={formData.email}
              location={formData.location}
              locationLabel={locationLabels[formData.location] || formData.location}
              selectedDate={formData.selectedDate}
              selectedTime={formData.selectedTime}
              primaryConcern={formData.primaryConcern}
              duration={formData.duration}
              priorTreatment={formData.priorTreatment}
              smsConsent={formData.smsConsent}
              smsReminder={formData.smsReminder}
            />
          )}
        </div>

        {/* Minimal footer */}
        <div className="py-6 text-center">
          <span style={{ fontFamily: font, fontSize: 13, color: "#9CA3AF" }}>
            Questions? Text or call{" "}
            <a href="tel:8663444955" style={{ color: "#9CA3AF", textDecoration: "underline" }}>
              866-344-4955
            </a>
          </span>
        </div>
      </main>
    </div>
  );
};

export default BookingFunnelV2;
