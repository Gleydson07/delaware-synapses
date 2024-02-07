import { cryptography } from "@/utils/cryptography";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UsePhasesAndEpics(token: any, phases: any, epics: any, onChangeEpic: any) {
  const router = useRouter();

  const decrypted = cryptography.decrypt(token);
  const currentPhase = phases.find((phase: any) => phase.phaseId === decrypted.phaseId);

  let currentEpic: any;
  if (decrypted.epicId) {
    currentEpic = epics.find((epic: any) => epic.epicId === decrypted.epicId);
  } else if (currentPhase?.phaseId) {
    currentEpic = epics.find((epic: any) => epic.phaseId === currentPhase.phaseId);
  }

  const epicFindRelatePhase = epics.filter((epic: any) => epic.phaseId === currentPhase?.phaseId && epic.epicId !== currentEpic?.epicId);
  const hasEpicsDifferentOfCurrent = !!epicFindRelatePhase.length;

  const handleSwitchPhase = (phase: any) => {
    const newHash = cryptography.encrypt({
      uuid: decrypted.uuid,
      phaseId: phase.phaseId,
      epicId: 0,
    });

    router.push(`${newHash}`);
  }

  const handleSwitchEpic = (epic: any) => {
    const newHash = cryptography.encrypt({
      uuid: decrypted.uuid,
      phaseId: epic.phaseId,
      epicId: epic.epicId,
    });

    router.push(`${newHash}`);
  }

  useEffect(() => {
    onChangeEpic(currentEpic);
  }, [currentEpic]);

  return {
    currentPhase,
    epicFindRelatePhase,
    phaseTitle: currentPhase.title,
    handleSwitchPhase,
    handleSwitchEpic,
    currentEpic,
    hasEpicsDifferentOfCurrent,
  }
}