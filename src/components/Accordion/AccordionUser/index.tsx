import { useState } from "react";
import { useRouter } from "next/router";
import { cryptography } from "@/utils/cryptography";
import Image from "next/image";

import iconBox from "@/assets/icons/project-box.svg";
import Tooltip from "@/components/Tooltip";
import iconRunBtn from "@/assets/icons/run-btn.svg";
import Status from "@/components/Status";
import AccordionTask from "../AccordionItem";

interface TasksProps {
  name: "string";
  isAutomated: boolean;
  status: {
    id: 1 | 2 | 3 | 4;
    name: string;
  };
  taskId: number;
  userStoryId: number;
  almId: string;
  pbiStatusId: number;
  automationId: number;
  title: string;
  step: number;
  responsibleName: string;
  plannedDate: string;
  executionDate: string;
  documentationUrl: string;
  evidenceUrl: string;
  createAt: string;
  createdBy: string | null;
  updateAt: string | null;
  updatedBy: string | null;
}

interface AccordionProps {
  title: string;
  content: TasksProps[];
}

interface AccordionUserProps {
  itemTasks: AccordionProps;
  featureId: number;
  userId: number;
  hasWorkFlow: boolean;
  status: number;
  handleClick: () => void;
}

export default function AccordionUser({ itemTasks, hasWorkFlow, featureId, userId, handleClick, status }: AccordionUserProps) {
  const router = useRouter();
  const decript = cryptography.decrypt(router.query.slug as string);
  const [isOpen, setIsOpen] = useState<boolean>(decript.userId === userId);

  const handleIsOpenUser = () => {
    const newHash = cryptography.encrypt({
      ...decript,
      taskId: 0,
      userId: !isOpen ? userId : decript.userId,
      featureId: !isOpen ? featureId : decript.featureId,
    });
    setIsOpen((prevIsOpen: boolean) => !prevIsOpen);
    router.push(`${newHash}`);
  };

  return (
    <li className={isOpen ? "isActive" : ""}>
      <div className="accordion-header">
        <div
          className="accordion-header-title"
          onClick={() => handleIsOpenUser()}
        >
          <figure>
            <Image src={iconBox} alt="icone de uma caixa" />
          </figure>

          <Tooltip text={itemTasks.title}>
            <h3>{itemTasks.title}</h3>
          </Tooltip>
        </div>

        <div className="accordion-header-actions">
          {hasWorkFlow && (
            <button onClick={handleClick} className="btn-run">
              <Image src={iconRunBtn} alt="icone de play" />
            </button>
          )}
          <Status status={status as 1 | 2 | 3 | 4} />
        </div>
      </div>

      <div className="acordion-content">
        <ul className="accordion-items">
          {itemTasks.content.map((task: any, i: number) => (
            <AccordionTask key={i} task={task} />
          ))}
        </ul>
      </div>
    </li>
  )
}