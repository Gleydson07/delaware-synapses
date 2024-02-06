import { cryptography } from "@/utils/cryptography";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UsePhasesAndEpics(token: any, phases: any, epics: any, onChangeEpic: any) {
  const router = useRouter();

  const decript = cryptography.decrypt(token);
  const findPhase = phases.find((phase: any) => phase.phaseId === decript.phaseId);

  let epicFilter: any;
  if (decript.epicId) {
    epicFilter = epics.find((epic: any) => epic.epicId === decript.epicId);
  } else if (findPhase?.phaseId) {
    epicFilter = epics.find((epic: any) => epic.phaseId === findPhase.phaseId);
  }

  const epicFindRelatePhase = epics.filter((epic: any) => epic.phaseId === findPhase?.phaseId);

  const handleSwitchPhase = (phase: any) => {
    const newHash = cryptography.encrypt({
      uuid: decript.uuid,
      phaseId: phase.phaseId,
      epicId: 0,
    });

    router.push(`${newHash}`);
  }

  const handleSwitchEpic = (epic: any) => {
    const newHash = cryptography.encrypt({
      uuid: decript.uuid,
      phaseId: epic.phaseId,
      epicId: epic.epicId,
    });

    router.push(`${newHash}`);
  }

  useEffect(() => {
    onChangeEpic(epicFilter);
  }, [epicFilter]);

  return {
    findPhase,
    epicFindRelatePhase,
    phaseTitle: findPhase.title,
    handleSwitchPhase,
    handleSwitchEpic,
    epicFilter,
  }
}