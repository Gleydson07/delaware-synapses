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

    router.push({
      pathname: `/epic-details/${routeParams}`
      },
      undefined, { shallow: true }
    );
  };

  const handleNavigateToEpic = (epic: EpicProps) => {
    const routeParams = cryptography.encrypt({
      uuid: projectUuid,
      phaseId: epic.phaseId,
      epicId: epic.epicId,
    });

    router.push({
      pathname: `/epic-details/${routeParams}`
      },
      undefined, { shallow: true }
    );
  };

  const handleGoToBack = () => {
    router.push("/home");
  };

  const renderGroupedProgressBars = (epics: any) => {
    const itemsPerColumn = Math.ceil(epics.length/3);
    const totalItems = epics.length;
    const numberOfColumns = Math.ceil(totalItems / itemsPerColumn);
    const groupedProgressBars: any[] = [];

    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      const startIndex = columnIndex * itemsPerColumn;
      const endIndex = Math.min(startIndex + itemsPerColumn, totalItems);

      const columnItems = epics.slice(startIndex, endIndex).map((epic:any, index: number) => (
        <ProgressBar
          key={startIndex + index}
          step={epic.step}
          name={epic.name}
          phase={getNamePhases(epic.phaseId)}
          plannedDate={epic.plannedDate}
          completeWork={epic.completeWork}
          totalWork={epic.totalWork}
          percentComplete={epic.percentComplete}
          tooltip={epic.name}
          onClick={() => handleNavigateToEpic(epic)}
        />
      ));

      groupedProgressBars.push(columnItems);
    }

    return groupedProgressBars.map((column: any, index: any) => (
      <div key={index} style={{ flex: 1 }}>
        {column.map((progressBar: any, idx: any) => (
          <React.Fragment key={idx}>{progressBar}</React.Fragment>
        ))}
      </div>
    ));
  };

  return {
    isLoading,
    phases,
    handleGoToBack,
    handleNavigateToPhase,
    progressBarGroups: renderGroupedProgressBars(epics),
  }
}