import { EpicProps, findEpicsByFaseIdAndProjectId } from "@/api/epic";
import { PhaseProps, findPhasesByProjectId } from "@/api/phases";
import ProgressBar from "@/components/ProgressBar";
import { cryptography } from "@/utils/cryptography";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const useControlCenter = () => {
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
    const routeParams = cryptography.encrypt({
      uuid: projectUuid,
      phaseId: phase.phaseId,
      epicId: 0,
    });
    router.push(`/epic-details/${routeParams}`);
  };

  const handleNavigateToEpic = (epic: EpicProps) => {
    const routeParams = cryptography.encrypt({
      uuid: projectUuid,
      phaseId: epic.phaseId,
      epicId: epic.epicId,
    });
    router.push(`/epic-details/${routeParams}`);
  };

  const handleGoToBack = () => {
    router.push("/home");
  };

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

  return {
    isLoading,
    phases,
    handleGoToBack,
    handleNavigateToPhase,
    progressBarGroups
  }
}