import ProgressBar from "@/components/ProgressBar";
import Wrapper from "@/components/Wrapper";
import CardProgress from "@/components/CardProgress";
import UsePhasesandEpics from "./usePhasesAndEpics";
import { DropDownCards } from "../DropdownCard";
import Feature from "../../Feature";

interface MenuProps {
  token: string;
  phases: any;
  epics: any;
}

export default function PhaseAndEpics({ token, phases, epics }: MenuProps) {
  const {
    epicFilter,
    epicFindrelatePhase,
    findPhase,
    handleSwitchEpic,
    phaseTitle,
    handleSwitchPhase,
    currentEpic
  } = UsePhasesandEpics(token, phases, epics);

  return (
    <div style={{ width: "1450px" }}>
      <div className="header-wrapper main">
        <Wrapper>
          <div className="phases-container">
            <div className="phases-container-item">
              <DropDownCards
                isDropDown={phases.length > 1}
                projectName={findPhase.name}
                title={findPhase.name}
              >
                {phases.map((phase: any) => {
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
                })}
              </DropDownCards>

              <CardProgress
                completeWork={findPhase.completeWork}
                percentComplete={findPhase.percentComplete}
                name={findPhase.name}
                totalWork={findPhase.totalWork}
              />
            </div>

            <div className="phases-container-item">
              <DropDownCards
                isDropDown={epicFindrelatePhase.length > 1}
                projectName={phaseTitle}
                title={"Epic"}
              >
                {epicFindrelatePhase.map((epic: any) => {
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
                })}
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
            </div>
          </div>
        </Wrapper>
      </div>

      <div className="header-wrapper">
        {currentEpic && <Feature currentEpic={currentEpic} token={token} />}
      </div>

    </div>
  );
}
