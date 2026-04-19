import { ReactNode } from "react";
import StickyHeader from "./StickyHeader";
import ProgressBar from "./ProgressBar";

interface AppShellProps {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  phaseIndex?: number;
  showProgress?: boolean;
}

const AppShell = ({
  children,
  currentStep = 0,
  totalSteps = 20,
  phaseIndex = 0,
  showProgress = true,
}: AppShellProps) => {
  return (
    <div className="intake-root flex min-h-screen flex-col">
      <StickyHeader />
      {showProgress && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          phaseIndex={phaseIndex}
        />
      )}
      <main
        className="mx-auto w-full flex-1"
        style={{ maxWidth: 560, padding: "8px 20px 24px" }}
      >
        {children}
      </main>
      <footer
        className="intake-safe-bottom mx-auto w-full text-center"
        style={{
          maxWidth: 560,
          padding: "16px 20px 20px",
          color: "var(--text-muted)",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 11,
          letterSpacing: "0.06em",
        }}
      >
        © {new Date().getFullYear()} Men's Wellness Centers · HIPAA-Secure
      </footer>
    </div>
  );
};

export default AppShell;
