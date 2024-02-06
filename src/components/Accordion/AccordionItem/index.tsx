import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Status from "../../Status";
import { cryptography } from "@/utils/cryptography";
import Image from "next/image";
import iconUsefullDoc from "@/assets/icons/useful-doc.svg"
import Tooltip from "@/components/Tooltip";
interface ContentProps {
  name: "string",
  isAutomated: boolean,
  status: {
    id: 1 | 2 | 3 | 4
    name: string
  },
  taskId: number,
  userStoryId: number,
  almId: string,
  pbiStatusId: number,
  automationId: number,
  title: string,
  step: number,
  responsibleName: string,
  plannedDate: string,
  executionDate: string,
  documentationUrl: string,
  evidenceUrl: string,
  createAt: string,
  createdBy: string | null,
  updateAt: string | null,
  updatedBy: string | null
}

interface AccordionTaskProps {
  title: string,
  task: ContentProps,
}

export default function AccordionTask({ title, task }: AccordionTaskProps) {
  const router = useRouter();
  const decript = cryptography.decrypt(router.query.slug as string);
  const [isOpen, setIsOpen] = useState<boolean>(decript.taskId === task.taskId);


  const handleIsOpenTask = (task: any) => {
    const newHash = cryptography.encrypt({
      ...decript,
      taskId: !isOpen ? task.taskId : decript.taskId,
    });

    setIsOpen((prevIsOpen: boolean) => !prevIsOpen);

    router.push(`${newHash}`);
  };


  return (
    <li className={isOpen ? "isActive" : ''} onClick={() => handleIsOpenTask(task)}>
      <div className="accordion-item-header">
        <span>{task.title}</span>
        <Status status={task.status.id} />
      </div>

      <div className="accordion-item-doc">
        <p>Responsible: <strong>{task.responsibleName}</strong></p>
        <p>Planned Date: <strong>{task.plannedDate}</strong></p>
        <p>Execultion Date: <strong>{task.executionDate}</strong></p>

        {task.documentationUrl ?
          <Link href={task.documentationUrl} target="_blank">
            <Image src={iconUsefullDoc} alt="icone de uma livro" />
            UseFul Document
          </Link> : ""
        }
      </div>
    </li>
  );
}