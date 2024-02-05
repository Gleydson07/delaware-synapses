import Image from "next/image";
import iconCrow from "@/assets/icons/crown.svg"

import { ProgressBarContainer } from "./styles";
import { onGetColorPhase } from "@/styles/color";

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
      $bgColor={onGetColorPhase(phase).primary}
      $color={onGetColorPhase(phase).secundary}
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