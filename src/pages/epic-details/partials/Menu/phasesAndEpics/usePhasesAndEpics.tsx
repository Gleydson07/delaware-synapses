import { cryptography } from "@/utils/cryptography";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UsePhasesandEpics(token: any, phases: any, epics: any) {
  const router = useRouter()
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

  useEffect(() => {
    setcurrentEpic(epicFilter)
  }, [epicFilter]);

  return {
    findPhase,
    epicFindrelatePhase,
    phaseTitle,
    handleSwitchPhase,
    handleSwitchEpic,
    epicFilter,
    currentEpic
  }
}