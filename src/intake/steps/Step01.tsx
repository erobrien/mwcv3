import PlaceholderStep from "./_PlaceholderStep";
import type { StepProps } from "@/types/intake";

const Step01 = (props: StepProps) => (
  <PlaceholderStep stepNumber={1} title={"Welcome"} {...props} />
);

export default Step01;
