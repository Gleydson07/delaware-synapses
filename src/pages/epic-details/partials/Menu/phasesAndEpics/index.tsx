import ProgressBar from "@/components/ProgressBar";
import Wrapper from "@/components/Wrapper";
import CardProgress from "@/components/CardProgress";
import { DropDownCards } from "../DropdownCard";
import UsePhasesAndEpics from "./usePhasesAndEpics";
import { useState } from "react";
interface MenuProps {
  token: string;
  phases: any;
  epics: any;
  onChangeEpic: (epic: any) => void;
}

export default function PhaseAndEpics({ token, phases, epics, onChangeEpic }: MenuProps) {
  const [isOpenPhase, setIsOpenPhase] = useState<boolean>(false);
  const [isOpenEpic, setIsOpenEpic] = useState<boolean>(false);

  const {
    currentEpic,
    epicFindRelatePhase,
    currentPhase,
    handleSwitchEpic,
    phaseTitle,
    handleSwitchPhase,
    hasEpicsDifferentOfCurrent,
  } = UsePhasesAndEpics(token, phases, epics, onChangeEpic);

  const handleClickSwithPhase = (phase: any) => {
    handleSwitchPhase(phase);
    setIsOpenPhase(false);
  }

  const handleClickSwithEpic = (epic: any) => {
    handleSwitchEpic(epic);
    setIsOpenEpic(false);
  }

  return (
    <div className="header-wrapper main">
      <Wrapper>
        <div className="phases-container">
          <div className="phases-container-item">
            <DropDownCards
              isDropDown={phases.length > 1}
              projectName={currentPhase.name}
              title={currentPhase.name}
              isOpen={isOpenPhase}
              onClick={() => setIsOpenPhase(prev => !prev)}
            >
              {phases.map((phase: any) => {
                if (phase.name !== currentPhase.name) {
                  return (
                    <CardProgress
                      onClick={() => handleClickSwithPhase(phase)}
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
              completeWork={currentPhase.completeWork}
              percentComplete={currentPhase.percentComplete}
              name={currentPhase.name}
              totalWork={currentPhase.totalWork}
            />
          </div>

          <div className="phases-container-item">
            <DropDownCards
              isDropDown={hasEpicsDifferentOfCurrent}
              projectName={phaseTitle}
              title={"Epic"}
              isOpen={isOpenEpic}
              onClick={() => setIsOpenEpic(prev => !prev)}
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
                    onClick={() => handleClickSwithEpic(epic)}
                  />
                );
              })}
            </DropDownCards>

            <ProgressBar
              step={currentEpic.step}
              name={currentEpic.name}
              phase={phaseTitle}
              plannedDate={currentEpic.plannedDate}
              completeWork={currentEpic.completeWork}
              totalWork={currentEpic.totalWork}
              percentComplete={currentEpic.percentComplete}
              tooltip={currentEpic.name}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
