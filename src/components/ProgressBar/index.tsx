import Image from "next/image";
import iconCrow from "@/assets/icons/crown.svg"

import { ProgressBarContainer } from "./styles";
import { useRouter } from "next/navigation";

interface ProgressBarProps {
  step: number,
  name: string,
  phase: string,
  plannedDate: string | undefined,
  completeWork: number,
  totalWork: number,
  percentComplete: number,
  title?: string,
  tooltip?: string,
  onClick?: () => void
}

const onGetColorPhase = (phase: string) => {
  const colorMap: Record<string, { bg: string; color: string }> = {
    prepare: { bg: "#a5b3c5", color: "#69809f" },
    explore: { bg: "#f4b183", color: "#ed7d31" },
    realize: { bg: "#a9d18e", color: "#70AD47" },
    deploy: { bg: "#f66", color: "#FF0000" },
    run: { bg: "#ab74d5", color: "#7030A0" },
  };

  return colorMap[phase.toLocaleLowerCase()] || { bg: "", color: "" };
};

export default function ProgressBar({
  step,
  name,
  phase,
  plannedDate,
  totalWork,
  completeWork,
  percentComplete,
  title,
  tooltip = "",
  onClick,
}: ProgressBarProps) {

  return (
    <ProgressBarContainer
      $percentComplete={percentComplete}
      $bgColor={onGetColorPhase(phase).bg}
      $color={onGetColorPhase(phase).color}
      $tooltip={tooltip}
      onClick={onClick}
    >

      {title && <h2 className="progress-bar-title">{title}</h2>}

      <div className="progress-bar-wrapper">
        <div className="progress-bar-step">
          <span>{step}</span>
        </div>

        <div className="progress-bar-content">
          <div className="progress-bar">
            <div className="progress-bar-name">
              <figure>
                <Image src={iconCrow} alt="icone de uma coroa" />
              </figure>
              <span>{name}</span>
            </div>

            {plannedDate && <time>{plannedDate}</time>}

          </div>

          <div className="progress-bar-work">
            <span>{completeWork} of {totalWork}</span>
            <span>{percentComplete}%</span>
          </div>
        </div>
      </div>

    </ProgressBarContainer>
  )
}