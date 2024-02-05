import Wrapper from "@/components/Wrapper";
import { MenuDetailsContainer } from "./styles";
import Legend from "@/components/legend";
import Card from "@/components/Card";
import { DropDownCards } from "../DropdownCard";
import ProgressBar from "@/components/ProgressBar";
import { cryptography } from "@/utils/cryptography";
import CardProgress from "@/components/CardProgress";
import { useEffect, useState } from "react";
import Feature from "../Feature";
import { useRouter } from "next/router";

import iconBackArrow from "@/assets/icons/back-arrow.svg";
interface MenuProps {
  token: string,
  phases: any,
  epics: any
}

export default function Menu({ token, phases, epics }: MenuProps) {
  const router = useRouter();
  const decript = cryptography.decrypt(token);

  const findPhase = phases.find((phase: any) => phase.phaseId === decript.phaseId);
  const phaseTitle = findPhase.title;

  const [phaseId, setPhaseId] = useState<string>(findPhase.phaseId);
  let epicFilter: any;

  if (decript.epicId) {
    epicFilter = epics.find((epic: any) => epic.epicId === decript.epicId);
  } else if (findPhase?.phaseId) {
    epicFilter = epics.find((epic: any) => epic.phaseId === findPhase.phaseId);
  }

  const [currentEpic, setcurrentEpic] = useState<any>(epicFilter);
  const epicFindrelatePhase = epics.filter((epic: any) => epic.phaseId === findPhase?.phaseId);

  const handleSwitchPhase = (phase: any) => {
    const newHash = cryptography.encrypt({
      uuid: decript.uuid,
      phaseId: phase.phaseId,
      epicId: 0,
    });

    setPhaseId(phase.phaseId);
    router.push(`${newHash}`);
  }

  const handleSwitchEpic = (epic: any) => {
    const newHash = cryptography.encrypt({
      uuid: decript.uuid,
      phaseId: epic.phaseId,
      epicId: epic.epicId,
    });

    setPhaseId(epic.epicId);
    router.push(`${newHash}`);
  }

  const renderPhaseView = () => {
    if (findPhase) {
      return (
        <>
          <DropDownCards
            isDropDown={phases.length > 1}
            projectName={findPhase.name}
            title={findPhase.name}
          >
            {renderPhaseDropdown()}
          </DropDownCards>

          <CardProgress
            completeWork={findPhase.completeWork}
            percentComplete={findPhase.percentComplete}
            name={findPhase.name}
            totalWork={findPhase.totalWork}
          />
        </>
      )
    }
    return null;
  };

  const renderPhaseDropdown = () => {
    return phases.map((phase: any) => {
      if (phase.name !== findPhase.name) {
        return (
          <CardProgress
            onClick={() => handleSwitchPhase(phase)}
            key={phase.phaseId}
            completeWork={phase.completeWork}
            percentComplete={phase.percentComplete}
            title={phase.title}
            name={phase.name}
            totalWork={phase.totalWork}
          />
        );
      }
      return null;
    });
  };

  const renderEpicView = () => {
    if (epicFilter) {
      return (
        <>
          <DropDownCards
            isDropDown={epicFindrelatePhase.length > 1}
            projectName={phaseTitle}
            title={"Epic"}
          >
            {renderEpicDropdown()}
          </DropDownCards>

          <ProgressBar
            step={epicFilter.step}
            name={epicFilter.name}
            phase={phaseTitle}
            plannedDate={epicFilter.plannedDate}
            completeWork={epicFilter.completeWork}
            totalWork={epicFilter.totalWork}
            percentComplete={epicFilter.percentComplete}
            tooltip={epicFilter.name}
          />
        </>
      )
    }
    return null;
  };

  const renderEpicDropdown = () => {
    return (
      epicFindrelatePhase.map((epic: any) => {
        return (
          <ProgressBar
            key={epic.epicId}
            step={epic.step}
            name={epic.name}
            phase={phaseTitle}
            plannedDate={epic.plannedDate}
            completeWork={epic.completeWork}
            totalWork={epic.totalWork}
            percentComplete={epic.percentComplete}
            onClick={() => handleSwitchEpic(epic)}
          />
        );
      })
    );
  };

  useEffect(() => {
    setcurrentEpic(epicFilter)
  }, [epicFilter]);

  return (
    <>
      <MenuDetailsContainer>
        <div className="header-wrapper">
          <Wrapper>
            <Card
              onClick={() => router.push(`/control-center/${decript.uuid}`)}
              title="Control Center"
              text="Back to Dashboard"
              icon={iconBackArrow}
            />
          </Wrapper>
        </div>
        <div className="header-wrapper main">
          <Wrapper>
            <div className="phases-container">
              <div className="phases-container-item">
                {renderPhaseView()}
              </div>

              <div className="phases-container-item">
                {renderEpicView()}
              </div>
            </div>
          </Wrapper>
        </div>
        <div className="header-wrapper">
          <Wrapper>
            <Legend />
          </Wrapper>
        </div>
      </MenuDetailsContainer>

      <Feature currentEpic={currentEpic} token={token} />
    </>
  )
}