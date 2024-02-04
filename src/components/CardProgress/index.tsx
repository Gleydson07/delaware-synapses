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

const iconColor = (color: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="68px"
    height="68px"
    viewBox="0 0 68 68"
    version="1.1"
  >
    <g id="surface1">
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        d="M 0 34 C 0 15.222656 15.222656 0 34 0 C 52.777344 0 68 15.222656 68 34 C 68 52.777344 52.777344 68 34 68 C 15.222656 68 0 52.777344 0 34 Z M 0 34 "
      />
      <path
        fill={color}
        fillRule="nonzero"
        d="M 15.421875 15.019531 L 23.15625 15.019531 L 23.15625 22.75 L 15.421875 22.75 Z M 15.421875 15.019531 "
      />
      <path
        fill={color}
        fillRule="nonzero"
        d="M 39.855469 44.574219 C 39.472656 44.203125 38.859375 44.210938 38.488281 44.59375 C 38.125 44.972656 38.125 45.566406 38.488281 45.941406 L 39.601562 47.054688 L 34.203125 47.054688 L 34.203125 17.78125 L 25.363281 17.78125 L 25.363281 19.988281 L 31.992188 19.988281 L 31.992188 49.261719 L 39.605469 49.261719 L 38.488281 50.375 C 38.117188 50.757812 38.125 51.371094 38.511719 51.742188 C 38.886719 52.105469 39.480469 52.105469 39.855469 51.742188 L 42.757812 48.84375 C 43.132812 48.464844 43.132812 47.851562 42.757812 47.472656 Z M 39.855469 44.574219 "
      />
      <path
        fill={color}
        fillRule="nonzero"
        d="M 52.980469 48.15625 C 52.980469 50.597656 51.003906 52.578125 48.5625 52.578125 C 46.121094 52.578125 44.144531 50.597656 44.144531 48.15625 C 44.144531 45.71875 46.121094 43.738281 48.5625 43.738281 C 51.003906 43.738281 52.980469 45.71875 52.980469 48.15625 Z M 52.980469 48.15625 "
      />
    </g>
  </svg>
);

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
          {icon ? icon : iconColor(typeColor.secundary)}
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
