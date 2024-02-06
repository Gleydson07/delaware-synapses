import { MenuDetailsContainer } from "./styles";
import BtnBack from "./btnBack";
import PhaseAndEpics from "./phasesAndEpics";
import LegendContent from "./legend";
import { useState } from "react";
import Feature from "../Feature";
interface MenuProps {
  token: string,
  phases: any,
  epics: any
}

export default function Menu({ token, phases, epics }: MenuProps) {
  const [currentEpic, setCurrentEpic] = useState<any>();
  return (
    <>
      <MenuDetailsContainer>
        <BtnBack token={token} />
        <PhaseAndEpics
          token={token}
          phases={phases}
          epics={epics}
          onChangeEpic={(epic: any) => setCurrentEpic(epic)}
        />
        <LegendContent />
      </MenuDetailsContainer>

      <div>
        {currentEpic && <Feature currentEpic={currentEpic} token={token} />}
      </div>
    </>
  )
}