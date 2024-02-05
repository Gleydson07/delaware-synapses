//_Copilot/ClosedCopilot/OpenedCopilot.jsx
import Image from "next/image";
import iconMind from "@/assets/icons/mind.svg"
import iconArrowUp from "@/assets/icons/arrow-up.svg"
import { CopilotContainer } from "./styles";

interface CloseCopilotProps {
  openCopilot: () => void
}

export default function ClosedCopilot({ openCopilot }: CloseCopilotProps) {
  return (
    <CopilotContainer onClick={openCopilot}>
      <Image
        src={iconMind}
        width={35}
        height={35}
        alt="Synapses logo"
      />
      <p>Mind</p>
      <Image
        className="mx-auto my-auto mb-[7px]"
        src={iconArrowUp}
        width={22}
        height={22}
        alt="Synapses logo"
      />
    </CopilotContainer>
  );
}
