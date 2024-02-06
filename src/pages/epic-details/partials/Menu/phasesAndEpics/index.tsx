import ProgressBar from "@/components/ProgressBar";
import Wrapper from "@/components/Wrapper";
import CardProgress from "@/components/CardProgress";
import { DropDownCards } from "../DropdownCard";
import Feature from "../../Feature";
import UsePhasesAndEpics from "./usePhasesAndEpics";

interface MenuProps {
  token: string;
  phases: any;
  epics: any;
  onChangeEpic: (epic: any) => void;
}

export default function PhaseAndEpics({ token, phases, epics, onChangeEpic }: MenuProps) {
  const {
    epicFilter,
    epicFindRelatePhase,
    findPhase,
    handleSwitchEpic,
    phaseTitle,
    handleSwitchPhase,
  } = UsePhasesAndEpics(token, phases, epics, onChangeEpic);

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
                isDropDown={epicFindRelatePhase.length > 1}
                projectName={phaseTitle}
                title={"Epic"}
              >
                {epicFindRelatePhase.map((epic: any) => {
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

      {/* <div className="header-wrapper">
        {currentEpic && <Feature currentEpic={currentEpic} token={token} />}
      </div> */}

    </div>
  );
}
