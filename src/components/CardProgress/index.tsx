import { iconPhase } from "@/assets/iconsTSX/icons";
import { CardProgressContainer } from "./styles";
import { onGetColorPhase, onGetColorPhaseStatus } from "@/styles/color";
interface CardProgressProps {
  percentComplete: number;
  title?: string;
  workTitle?: string;
  name: string | number;
  totalWork: number;
  completeWork: number;
  icon?: any;
  isFeature?: boolean,
  onClick?: () => void;
}

export const asdasda = (phase: string) => {
  const colorMap: Record<string, { primary: string; secundary: string }> = {
    prepare: { primary: "#a5b3c5", secundary: "#69809f" },
    explore: { primary: "#f4b183", secundary: "#ed7d31" },
    realize: { primary: "#a9d18e", secundary: "#70AD47" },
    deploy: { primary: "#f66", secundary: "#FF0000" },
    run: { primary: "#ab74d5", secundary: "#7030A0" },
  };

  return colorMap[phase.toLocaleLowerCase()] || { primary: "", secundary: "" };
};

export default function CardProgress({
  percentComplete,
  title,
  workTitle,
  name,
  totalWork,
  completeWork,
  icon,
  onClick,
  isFeature = false,
}: CardProgressProps) {
  const typeColor =
    typeof name === "string" ? onGetColorPhase(name) : onGetColorPhaseStatus(name);

  return (
    <CardProgressContainer
      $percentComplete={percentComplete}
      $bgColor={typeof name === "string" ? typeColor.primary : typeColor.secundary}
      $color={typeColor.primary}
      $isFeature={isFeature}
    >
      {title && <h2 className="card-progress-title">{title}</h2>}

      <div className="card-progress" onClick={onClick}>
        <figure className="card-progress-icon">
          {icon ? icon : iconPhase(typeColor.secundary)}
        </figure>

        <div className="card-progress-wrapper">
          <span className="card-progress-percent-complete">
            {percentComplete}%
          </span>

          <div className="card-progress-content">
            <div className="card-progress-work">
              <span>{workTitle}</span>
              <span>
                {completeWork} of {totalWork}
              </span>
            </div>

            <div className="card-progress-bar"></div>
          </div>
        </div>
      </div>
    </CardProgressContainer>
  );
}
