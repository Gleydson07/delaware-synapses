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
  isFeatureCard?: boolean,
  onClick?: () => void;
}

//@isFeature serve somente para mudar o estilo do card
export default function CardProgress({
  percentComplete,
  title,
  workTitle,
  name,
  totalWork,
  completeWork,
  icon,
  onClick,
  isFeatureCard = false,
}: CardProgressProps) {
  const typeColor =
    typeof name === "string" ? onGetColorPhase(name) : onGetColorPhaseStatus(name);

  return (
    <CardProgressContainer
      $percentComplete={percentComplete}
      $primaryColor={typeColor.primary}
      $secondaryColor={typeColor.secondary}
      $isFeatureCard={isFeatureCard}
    >
      {title && <h2 className="card-progress-title">{title}</h2>}

      <div className="card-progress" onClick={onClick}>
        <figure className="card-progress-icon">
          {icon ? icon : iconPhase(typeColor.secondary)}
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
