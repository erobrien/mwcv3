import { useState } from "react";
import { StepCard, PrimaryCTA, TextField, SavedIndicator } from "@/intake/components";
import { useIntakeStore } from "@/store/intakeStore";
import { useStepValidation } from "@/hooks/useStepValidation";
import { useShowErrors } from "@/intake/hooks/useShowErrors";
import { US_STATES } from "@/intake/data/usStates";
import type { StepProps } from "@/types/intake";

const Step03 = ({ onNext }: StepProps) => {
  const addr = useIntakeStore((s) => s.address);
  const setField = useIntakeStore((s) => s.setField);
  const { errors } = useStepValidation(3);
  const { shouldShow, markBlur, revealAll } = useShowErrors();
  const [savedTrigger, setSavedTrigger] = useState(0);

  const update = (path: string, value: string) => {
    setField(path, value);
    setSavedTrigger((n) => n + 1);
  };

  const handleContinue = () => {
    revealAll();
    if (Object.keys(errors).length === 0) onNext();
  };

  const stateError = shouldShow("address.state") && errors["address.state"];

  return (
    <StepCard h1="WHERE DO YOU LIVE?">
      <h2 className="intake-h2 mb-5">Your address</h2>
      <div className="space-y-4">
        <TextField label="STREET ADDRESS" autoComplete="street-address" value={addr.street}
          onChange={(e) => update("address.street", e.target.value)}
          onBlur={() => markBlur("address.street")}
          error={errors["address.street"]} showError={shouldShow("address.street")} required />
        <TextField label="CITY" autoComplete="address-level2" value={addr.city}
          onChange={(e) => update("address.city", e.target.value)}
          onBlur={() => markBlur("address.city")}
          error={errors["address.city"]} showError={shouldShow("address.city")} required />

        <div className="w-full">
          <label htmlFor="addr-state" className="intake-label mb-2 block">STATE</label>
          <select id="addr-state" value={addr.state}
            onChange={(e) => update("address.state", e.target.value)}
            onBlur={() => markBlur("address.state")}
            className={`intake-input ${stateError ? "intake-input--error" : ""}`}
            autoComplete="address-level1"
            style={{
              appearance: "none", WebkitAppearance: "none",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: 40,
            }}>
            <option value="">Select state…</option>
            {US_STATES.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
          </select>
          {stateError && (
            <p aria-live="polite" style={{ marginTop: 6, fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "var(--error-red)" }}>
              {errors["address.state"]}
            </p>
          )}
        </div>

        <TextField label="ZIP CODE" autoComplete="postal-code" inputMode="numeric"
          value={addr.postal_code}
          onChange={(e) => update("address.postal_code", e.target.value)}
          onBlur={() => markBlur("address.postal_code")}
          error={errors["address.postal_code"]} showError={shouldShow("address.postal_code")}
          maxLength={10} required />
      </div>

      <div className="mt-6">
        <PrimaryCTA sticky onClick={handleContinue}>Continue</PrimaryCTA>
      </div>
      <SavedIndicator trigger={savedTrigger} />
    </StepCard>
  );
};

export default Step03;
