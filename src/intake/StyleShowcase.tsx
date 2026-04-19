import { useState } from "react";
import { Pill, Heart } from "lucide-react";
import {
  AppShell,
  BackButton,
  StepCard,
  PrimaryCTA,
  SecondaryLink,
  TextField,
  TextArea,
  PhoneField,
  EmailField,
  MaskedDOBField,
  CardRadio,
  CardCheckbox,
  ChipRow,
  QuickButton,
  SavedIndicator,
} from "./components";
import { validateDOB } from "./components/fields/MaskedDOBField";

const StyleShowcase = () => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [radio, setRadio] = useState<string | null>(null);
  const [checks, setChecks] = useState<string[]>([]);
  const [chip, setChip] = useState<"yes" | "no" | null>(null);

  const toggleCheck = (v: string) =>
    setChecks((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  const dobError = validateDOB(dob);

  return (
    <AppShell currentStep={2} totalSteps={20} phaseIndex={1}>
      <div className="mb-3">
        <BackButton onClick={() => alert("Back")} />
      </div>

      <StepCard
        h1="DESIGN SYSTEM SHOWCASE"
        subtitle="Layer 1 — every component rendered once for visual QA."
      >
        <h2 className="intake-h2 mb-2">Inputs</h2>
        <p className="intake-body-card mb-4">
          16px font size to prevent iOS zoom, focused state shows the orange glow.
        </p>

        <div className="space-y-4">
          <TextField
            label="FULL LEGAL NAME"
            placeholder="John Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <PhoneField value={phone} onChange={setPhone} />
          <EmailField value={email} onChange={setEmail} />
          <MaskedDOBField value={dob} onChange={setDob} error={dobError} />
          <TextArea
            label="NOTES"
            placeholder="Anything else your provider should know…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <QuickButton onClick={() => setNotes("None")}>Nothing to add</QuickButton>
            <QuickButton onClick={() => setNotes("No known allergies")}>
              No known allergies
            </QuickButton>
          </div>
        </div>

        <div
          className="my-6"
          style={{ height: 1, background: "var(--divider)" }}
          aria-hidden
        />

        <h2 className="intake-h2 mb-3">Selectable cards</h2>
        <div className="space-y-2.5">
          {["Yes", "No", "Only if urgent"].map((opt) => (
            <CardRadio
              key={opt}
              label={opt}
              selected={radio === opt}
              onSelect={() => setRadio(opt)}
            />
          ))}
        </div>

        <div className="mt-4 space-y-2.5">
          {[
            { label: "High blood pressure", icon: Heart },
            { label: "Currently using Viagra or Cialis", icon: Pill },
            { label: "None of the above" },
          ].map((opt) => (
            <CardCheckbox
              key={opt.label}
              label={opt.label}
              checked={checks.includes(opt.label)}
              onToggle={() => toggleCheck(opt.label)}
              icon={opt.icon}
            />
          ))}
        </div>

        <div
          className="my-6"
          style={{ height: 1, background: "var(--divider)" }}
          aria-hidden
        />

        <h2 className="intake-h2 mb-3">Chip Yes / No</h2>
        <ChipRow value={chip} onChange={setChip} />

        <div className="mt-8">
          <PrimaryCTA sticky onClick={() => alert("Continue")}>
            Continue
          </PrimaryCTA>
          <SecondaryLink onClick={() => alert("Skip")}>
            I don't have a primary care provider
          </SecondaryLink>
        </div>

        <SavedIndicator trigger={`${name}|${notes}|${phone}|${email}|${dob}|${radio}|${checks.join(",")}|${chip}`} />
      </StepCard>

      <p
        className="mt-6 text-center"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
        }}
      >
        LAYER 1 — STYLE SHOWCASE
      </p>
    </AppShell>
  );
};

export default StyleShowcase;
