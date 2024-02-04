import Card from "@/components/Card";
import Wrapper from "@/components/Wrapper";
import iconPast from "@/assets/icons/cc-project.svg";
import CardProgress from "@/components/CardProgress";
import { EpicContainer, PhaseContainer } from "./styles";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/PageError";
import { useControlCenter } from "./useControlCenter";

export default function ControlCenter() {
  const { isLoading, phases, handleGoToBack, handleNavigateToPhase, progressBarGroups } = useControlCenter()

  if (isLoading) return <Loading />;

  if (!phases || (!phases.length && !isLoading))
    return (
      <Wrapper>
        <ErrorPage />
      </Wrapper>
    );

  return (
    <>
      <Wrapper>
        <Card
          onClick={handleGoToBack}
          title="Projects"
          text="From clients list"
          icon={iconPast}
        />
      </Wrapper>

      <Wrapper title="PHASES">
        <PhaseContainer>
          {phases &&
            phases.map((phase) => (
              <CardProgress
                key={phase.phaseId}
                onClick={() => handleNavigateToPhase(phase)}
                completeWork={phase.completeWork}
                percentComplete={phase.percentComplete}
                title={phase.title}
                name={phase.name}
                totalWork={phase.totalWork}
              />
            ))}
        </PhaseContainer>
      </Wrapper>

      <Wrapper title="EPICS">
        <EpicContainer>
          {progressBarGroups.map((group: any, index: any) => (
            <div className="epic-column" key={index}>
              {group}
            </div>
          ))}
        </EpicContainer>
      </Wrapper>
    </>
  );
}
