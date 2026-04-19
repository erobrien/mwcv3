import { useEffect, useState } from "react";
import { StepCard, PrimaryCTA, CardCheckbox, TextField, SavedIndicator } from "@/intake/components";
import ConsentDrawer from "@/intake/components/ConsentDrawer";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import type { StepProps } from "@/types/intake";

interface ConsentItem {
  key: keyof ReturnType<typeof useIntakeStore.getState>["consents"];
  short: string;
  drawerTitle: string;
  drawerBody: string;
}

const ITEMS: ConsentItem[] = [
  {
    key: "info_accurate",
    short: "I confirm the information I provided is accurate to the best of my knowledge.",
    drawerTitle: "Accuracy of Information",
    drawerBody:
      "By checking this box, I confirm that the information I have provided in this intake is true, complete, and accurate to the best of my knowledge. I understand that providing incomplete or inaccurate information may affect the quality and safety of my care, and that I am responsible for updating my provider promptly if any of this information changes.",
  },
  {
    key: "authorize_treatment",
    short:
      "I authorize MWC's licensed medical providers to evaluate, diagnose, and treat me — including labs when medically appropriate.",
    drawerTitle: "Authorization for Treatment",
    drawerBody:
      "I voluntarily authorize the licensed medical providers and clinical staff of Men's Wellness Centers (MWC) to perform the evaluations, examinations, diagnostic tests (including blood work and laboratory studies), and treatments they determine to be medically appropriate for my care. I understand that no guarantees have been made about the outcome of any treatment or examination. I am free to refuse any test or treatment, and I may withdraw my consent at any time.",
  },
  {
    key: "telemedicine",
    short:
      "I understand my care may be provided in person and, when clinically appropriate, via telemedicine.",
    drawerTitle: "Consent to Telemedicine",
    drawerBody:
      "I understand that some portions of my care may be provided in person at an MWC center and other portions may be provided via telemedicine (live video, audio, or secure messaging) when my provider determines it is clinically appropriate. Telemedicine services have benefits and limitations; I have the right to refuse telemedicine and request an in-person visit at any time. All telemedicine encounters are subject to the same confidentiality protections as in-person visits.",
  },
  {
    key: "privacy_practices",
    short: "I acknowledge I've received MWC's Notice of Privacy Practices.",
    drawerTitle: "Notice of Privacy Practices",
    drawerBody:
      "I acknowledge that I have been provided with, or had the opportunity to review, MWC's Notice of Privacy Practices, which describes how my protected health information (PHI) may be used and disclosed and how I may access this information. A copy of the full notice is available at any MWC center and on the MWC website.",
  },
];

const Step19 = ({ onNext }: StepProps) => {
  const consents = useIntakeStore((s) => s.consents);
  const sig = useIntakeStore((s) => s.signature);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(19);
  const { shouldShow, markBlur, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);
  const [drawer, setDrawer] = useState<ConsentItem | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Pick up a submission error left by Step20 when it bounces us back here
  useEffect(() => {
    const w = window as unknown as { __intakeSubmitError?: string };
    if (w.__intakeSubmitError) {
      setSubmitError(w.__intakeSubmitError);
      w.__intakeSubmitError = undefined;
      setSubmitting(false);
    }
    const handler = () => {
      const ww = window as unknown as { __intakeSubmitError?: string };
      if (ww.__intakeSubmitError) {
        setSubmitError(ww.__intakeSubmitError);
        ww.__intakeSubmitError = undefined;
        setSubmitting(false);
      }
    };
    window.addEventListener("intake:submit-error", handler);
    return () => window.removeEventListener("intake:submit-error", handler);
  }, []);

  const handleContinue = () => {
    if (submitting) return;
    revealAll();
    setSubmitError(null);
    if (Object.keys(errors).length === 0) {
      setSubmitting(true); // prevent double-submit until route changes
      onNext();
    }
  };

  return (
    <StepCard h1="ALMOST DONE">
      {submitError && (
        <div
          role="alert"
          className="mb-4"
          style={{
            background: "rgba(220,38,38,0.10)",
            border: "1px solid rgba(220,38,38,0.35)",
            borderRadius: 10,
            padding: "12px 14px",
            color: "var(--text-primary)",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 13,
            lineHeight: 1.45,
          }}
        >
          <strong style={{ color: "var(--error-red)", fontWeight: 700 }}>
            Something went wrong sending your intake.
          </strong>{" "}
          Please try again in a moment, or call us at{" "}
          <a
            href="tel:+17579379990"
            style={{ color: "var(--accent-orange)", textDecoration: "underline" }}
          >
            (757) 937-9990
          </a>
          .
        </div>
      )}

      <h2 className="intake-h2 mb-5">A few quick confirmations</h2>

      <div className="space-y-3">
        {ITEMS.map((item) => {
          const checked = consents[item.key];
          const errKey = `consents.${item.key}`;
          const showErr = shouldShow(errKey) && errors[errKey];
          return (
            <div key={item.key}>
              <div className="flex items-stretch gap-2">
                <div className="flex-1">
                  <CardCheckbox
                    label={item.short}
                    checked={checked}
                    onToggle={() => {
                      setField(`consents.${item.key}`, !checked);
                      setSavedTrigger((n) => n + 1);
                    }}
                  />
                </div>
              </div>
              <div className="mt-1 text-right">
                <button
                  type="button"
                  onClick={() => setDrawer(item)}
                  className="intake-secondary-link"
                  style={{ fontSize: 12 }}
                >
                  Read full text
                </button>
              </div>
              {showErr && (
                <p
                  aria-live="polite"
                  style={{
                    marginTop: 4,
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 12,
                    color: "var(--error-red)",
                  }}
                >
                  {errors[errKey]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <TextField
          label="TYPE YOUR FULL LEGAL NAME AS YOUR ELECTRONIC SIGNATURE"
          autoComplete="name"
          value={sig.typed_name}
          onChange={(e) => {
            setField("signature.typed_name", e.target.value);
            setSavedTrigger((n) => n + 1);
          }}
          onBlur={() => markBlur("signature.typed_name")}
          error={errors["signature.typed_name"]}
          showError={shouldShow("signature.typed_name")}
          required
          maxLength={120}
        />
      </div>

      <p
        className="mt-3"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
        }}
      >
        Today's date and time will be recorded automatically.
      </p>

      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue} disabled={submitting}>
          {submitting ? "Submitting…" : "Submit My Intake"}
        </PrimaryCTA>
      </div>

      <ConsentDrawer
        open={!!drawer}
        title={drawer?.drawerTitle ?? ""}
        body={drawer?.drawerBody ?? ""}
        onClose={() => setDrawer(null)}
      />

      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step19;
