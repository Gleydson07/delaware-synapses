import { useState } from "react";
import Status from "../Status";
import { AccordionContainer } from "./styles";
import Image from "next/image";
import iconBox from "@/assets/icons/project-box.svg";
import iconRunBtn from "@/assets/icons/run-btn.svg";
import { useRouter } from "next/router";
import { cryptography } from "@/utils/cryptography";
import AccordionTask from "./AccordionItem";
import Tooltip from "../Tooltip";
interface ContentProps {
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
  content: ContentProps[];
}
interface AccordionListProps {
  itemsTasks: AccordionProps[];
  featureId: number;
  userId: number;
  hasWorkFlow: boolean;
  status: number;
  handleClick: () => void;
}

export default function Accordion({
  itemsTasks,
  userId,
  featureId,
  hasWorkFlow,
  status,
  handleClick,
}: AccordionListProps) {
  const router = useRouter();
  const decript = cryptography.decrypt(router.query.slug as string);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleIsOpenUser = (index: number) => {
    const isOpen = activeIndex !== null ? index === activeIndex : true;
    const newHash = cryptography.encrypt({
      ...decript,
      taskId: 0,
      featureId: isOpen ? featureId : 0,
      userId: isOpen ? userId : 0,
    });
    setActiveIndex(index === activeIndex ? null : index);
    router.push(`${newHash}`);
  };

  const isActiveUser = (index: number) => {
    return (index === activeIndex || decript.userId === userId)
  }

  return (
    <AccordionContainer>
      <ul className="accordion-list">
        {itemsTasks.map((item, index) => (
          <li key={index} className={isActiveUser(index) ? "isActive" : ""}>
            <div className="accordion-header">
              <div
                className="accordion-header-title"
                onClick={() => handleIsOpenUser(index)}
              >
                <figure>
                  <Image src={iconBox} alt="icone de uma caixa" />
                </figure>

                <Tooltip text={item.title}>
                  <h3>{item.title}</h3>
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
                {item.content.map((task, i) => (
                  <AccordionTask key={i} title={item.title} task={task} />
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </AccordionContainer>
  );
}
