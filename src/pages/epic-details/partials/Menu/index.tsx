import Wrapper from "@/components/Wrapper";
import { MenuDetailsContainer } from "./styles";
import Legend from "@/components/legend";
import Card from "@/components/Card";
import iconPast from "@/assets/icons/cc-project.svg";
import { DropDownCards } from "../DropdownCard";
import ProgressBar from "@/components/ProgressBar";
import { cryptography } from "@/utils/cryptography";
import CardProgress from "@/components/CardProgress";
import { useEffect, useState } from "react";
import Feature from "../Feature";
import { useRouter } from "next/router";

interface MenuProps {
  token: string,
  phases: any,
  epics: any
}

export default function Menu({ token, phases, epics }: MenuProps) {
  const router = useRouter();
  const decript = cryptography.decrypt(token);

  const phaseFindName = phases.find((phase: any) => phase.phaseId === decript.phaseId);

  const [phaseName, setPhaseName] = useState<string>(phaseFindName.name);

  const phaseFilter = phases.find((phase: any) => phase.title === phaseName);
  let epicFilter: any;

  if (decript.epicId) {
    epicFilter = epics.find((epic: any) => epic.epicId === decript.epicId);
  } else if (phaseFilter?.phaseId) {
    epicFilter = epics.find((epic: any) => epic.phaseId === phaseFilter.phaseId);
  }

  const [currentEpic, setcurrentEpic] = useState<any>(epicFilter);

  const phaseTitle = phaseFilter.title
  const epicFindrelatePhase = epics.filter((epic: any) => epic.phaseId === phaseFilter?.phaseId);

  const handleSwitchPhase = (phase: any) => {
    const newHash = cryptography.encrypt({
      uuid: decript.uuid,
      phaseId: phase.phaseId,
      epicId: 0,
    });

    setPhaseName(phase.title);
    router.push(`${newHash}`);
  }

  const handleSwitchEpic = (epic: any) => {
    const newHash = cryptography.encrypt({
      uuid: decript.uuid,
      phaseId: epic.phaseId,
      epicId: epic.epicId,
    });

    setPhaseName("prepare");
    router.push(`${newHash}`);
  }

  const renderPhaseView = () => {
    if (phaseFilter) {
      return (
        <>
          <DropDownCards
            isDropDown={phases.length > 1}
            projectName={phaseName}
            title={phaseName}
          >
            {renderPhaseDropdown()}
          </DropDownCards>

          <CardProgress
            completeWork={phaseFilter.completeWork}
            percentComplete={phaseFilter.percentComplete}
            name={phaseFilter.name}
            totalWork={phaseFilter.totalWork}
          />
        </>
      )
    }
    return null;
  };

  const renderPhaseDropdown = () => {
    return phases.map((phase: any) => {
      if (phase.name !== phaseName) {
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
  }, [phaseName]);

  return (
    <>
      <MenuDetailsContainer>
        <div className="header-wrapper">
          <Wrapper>
            <Card
              // link={`/control-center/${decript.uuid}`}
              onClick={() => router.push(`/control-center/${decript.uuid}`)}
              title="Control Center"
              text="Back to Dashboard"
              icon={iconPast}
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