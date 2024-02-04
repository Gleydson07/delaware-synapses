import Card from "@/components/Card";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import iconPast from "@/assets/icons/cc-project.svg";
import CardProgress from "@/components/CardProgress";
import { EpicContainer, PhaseContainer } from "./styles";
import ProgressBar from "@/components/ProgressBar";
import { cryptography } from "@/utils/cryptography";
import { PhaseProps, findPhasesByProjectId } from "@/api/phases";
import { EpicProps, findEpicsByFaseIdAndProjectId } from "@/api/epic";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/PageError";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export default function ControlCenter() {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [phases, setPhases] = useState<PhaseProps[]>([]);
  const [epics, setEpics] = useState<EpicProps[]>([]);
  const projectUuid = params?.projectUuid as string;

  useEffect(() => {
    if (!!projectUuid && typeof projectUuid !== "string") {
      router.push("/home");
      return;
    }

    fetchData();
  }, [projectUuid]);


  const fetchData = async () => {
    setIsLoading(true);
    const responsePhases = await findPhasesByProjectId(projectUuid);

    if (responsePhases && responsePhases.length) {
      setPhases(responsePhases);

      const epicPromises = responsePhases.map(async (phase) => {
        const epics = await findEpicsByFaseIdAndProjectId(
          phase.phaseId,
          projectUuid
        );
        return epics;
      });

      const allEpicsNested = await Promise.all(epicPromises);
      const allEpics = allEpicsNested.flat();

      if (allEpics && allEpics.length) {
        setEpics(allEpics as EpicProps[]);
      }
    }

    setIsLoading(false);
  };

  const getNamePhases = (id: number) => {
    const phase = phases?.find((phase) => phase.phaseId === id);

    return phase ? phase.title : "prepare";
  };

  const handleNavigateToPhase = (phase: PhaseProps) => {
    const routeParams = cryptography.encript({ project: projectUuid, phaseId: phase.phaseId });
    router.push(`/epic-details/${routeParams}`);
  }

  const handleNavigateToEpic = (epic: EpicProps) => {
    const routeParams = cryptography.encript({ project: projectUuid, phaseId: epic.phaseId, epicId: epic.epicId });
    router.push(`/epic-details/${routeParams}`);
  }

  const renderGroupedProgressBars = (epics: any) => {
    const totalItems = epics.length;
    const groupedProgressBars: any = [[], [], []];

    for (let i = 0; i < totalItems; i++) {
      const columnIndex = i % 3;
      groupedProgressBars[columnIndex].push(
        <ProgressBar
          key={i}
          step={epics[i].step}
          name={epics[i].name}
          phase={getNamePhases(epics[i].phaseId)}
          plannedDate={epics[i].plannedDate}
          completeWork={epics[i].completeWork}
          totalWork={epics[i].totalWork}
          percentComplete={epics[i].percentComplete}
          tooltip={epics[i].name}
          onClick={() => handleNavigateToEpic(epics[i])}
        />
      );
    }

    return groupedProgressBars.map((column: any, index: any) => (
      <div key={index} style={{ flex: 1 }}>
        {column.map((progressBar: any, idx: any) => (
          <React.Fragment key={idx}>{progressBar}</React.Fragment>
        ))}
      </div>
    ));
  };

  const progressBarGroups = renderGroupedProgressBars(epics);

  if (isLoading) {
    return (
      <>
        <Header />
        <Loading/>
      </>
    )
  }

  if (!phases || !phases.length) {
    return (
      <>
        <Header />
        <Wrapper>
          <ErrorPage />
        </Wrapper>
      </>
    )
  }

  return (
    <>
      <Header title="Control Center" />
      <Wrapper>
        <Card
          link={"/home"}
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
