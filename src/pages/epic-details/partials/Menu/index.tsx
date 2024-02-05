import { MenuDetailsContainer } from "./styles";
import BtnBack from "./btnBack";
import PhaseAndEpics from "./phasesAndEpics";
import LegendContent from "./legend";
interface MenuProps {
  token: string,
  phases: any,
  epics: any
}

export default function Menu({ token, phases, epics }: MenuProps) {
  return (
    <>
      <MenuDetailsContainer>
        <BtnBack token={token} />
        <PhaseAndEpics token={token} phases={phases} epics={epics} />
        <LegendContent />
      </MenuDetailsContainer>

      {/* <Feature currentEpic={currentEpic} token={token} /> */}
    </>
  )
}