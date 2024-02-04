import { DetailsLegendContainer } from "./styles";
import iconPhase from "@/assets/icons/label-project-phase.svg";
import iconEpic from "@/assets/icons/label-epic.svg";
import iconFeature from "@/assets/icons/label-feature.svg";
import iconUser from "@/assets/icons/label-user-story.svg";
import Image from "next/image";
import Status from "../Status";

const legendPhase = [
  {
    icon: iconPhase,
    name: "Project Phase",
  },
  {
    icon: iconEpic,
    name: "Epic",
  },
  {
    icon: iconFeature,
    name: "Feature",
  },
  {
    icon: iconUser,
    name: "User Story",
  },
];

const legendStatus: { status: 1 | 2 | 3 | 4; name: string }[] = [
  {
    status: 1,
    name: "Not started",
  },
  {
    status: 2,
    name: "In progress",
  },
  {
    status: 3,
    name: "Failed",
  },
  {
    status: 4,
    name: "Done",
  },
];

export default function Legend() {
  return (
    <DetailsLegendContainer>
      <ul className="details-legend-list">
        {legendPhase.map((phase) => (
          <li key={phase.name}>
            <figure>
              <Image src={phase.icon} alt="icon da fase do projeto" />
            </figure>
            <span>{phase.name}</span>
          </li>
        ))}
      </ul>

      <ul className="details-legend-list">
        {legendStatus.map((status) => (
          <li key={status.name}>
            <Status status={status.status} />
            <span>{status.name}</span>
          </li>
        ))}
      </ul>
    </DetailsLegendContainer>
  )
}