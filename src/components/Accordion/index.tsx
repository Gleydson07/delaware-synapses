import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { AccordionContainer } from "./styles";
import Status from "../Status";

import iconBox from "@/assets/icons/project-box.svg"
import iconUsefullDoc from "@/assets/icons/useful-doc.svg"
import iconRunBtn from "@/assets/icons/run-btn.svg"
import { useRouter } from "next/router";
import { cryptography } from "@/utils/cryptography";
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
interface AccordionProps {
  title: string,
  content: ContentProps[],
}
interface AccordionListProps {
  items: AccordionProps[];
  featureId: number,
  userId: number,
  hasWorkFlow: boolean,
  status: number,
  handleClick: () => void,
}

export default function Accordion({ items, userId, featureId, hasWorkFlow, status, handleClick }: AccordionListProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleIsOpenUser = (index: number) => {
    const decript = cryptography.decrypt(router.query.slug as string);
    const isOpen = activeIndex !== null ? index === activeIndex : true;
    const newHash = cryptography.encrypt({
      ...decript,
      featureId: isOpen ? featureId : 0,
      userId: isOpen ? userId : 0,
    });

    setActiveIndex(index === activeIndex ? null : index);
    router.push(`${newHash}`);
  };

  const handleIsOpenTask = (event: React.MouseEvent, index: number, task: any) => {
    // const decript = cryptography.decrypt(router.query.slug as string);
    // const isOpen = activeIndex !== null ? index === activeIndex : true && task.taskId !== task.taskId;
    // const newHash = cryptography.encrypt({
    //   ...decript,
    //   taskId: isOpen ? task.taskId : 0,
    // });

    setActiveItem(index === activeItem ? null : index);
    // router.push(`${newHash}`);
  };

  return (
    <AccordionContainer>
      <ul className="accordion-list">
        {items.map((item, index) => (
          <li key={index} className={index === activeIndex ? "isActive" : ''} >
            <div className="accordion-header">
              <div className="accordion-header-title" onClick={() => handleIsOpenUser(index)}>
                <figure><Image src={iconBox} alt="icone de uma caixa" /></figure>

                <h3>{item.title}</h3>
              </div>

              <div className="accordion-header-actions">
                {hasWorkFlow && <button onClick={handleClick} className="btn-run"><Image src={iconRunBtn} alt="icone de play" /></button>}
                <Status status={status as 1 | 2 | 3 | 4} />
              </div>

            </div>

            <div className="acordion-content">
              <ul className="accordion-items">
                {item.content.map((task, i) => (
                  <li key={i} className={i === activeItem ? "isActive" : ''} onClick={(event) => handleIsOpenTask(event, i, task)}>
                    <div className="accordion-item-header">
                      <span>{task.title}</span>
                      <Status status={task.status.id} />
                    </div>

                    <div className="accordion-item-doc">
                      <p>Responsible: <strong>{task.responsibleName}</strong></p>
                      <p>Planned Date: <strong>{task.plannedDate}</strong></p>
                      <p>Execultion Date: <strong>{task.executionDate}</strong></p>

                      <Link href={task.documentationUrl ? task.documentationUrl : ""} target="_blank">
                        <Image src={iconUsefullDoc} alt="icone de uma livro" />
                        UseFul Document
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </AccordionContainer>
  )
}