import { onGetColorPhaseStatus } from "@/styles/color";
import { StatusContainer } from "./styles";

type StatusType = 1 | 2 | 3 | 4

interface StatusProps {
  status: StatusType
}

export default function Status({ status }: StatusProps) {
  return (
    <StatusContainer $color={onGetColorPhaseStatus(status).secundary} $bgColor={onGetColorPhaseStatus(status).primary} />
  )
}