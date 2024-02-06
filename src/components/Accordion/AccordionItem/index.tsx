import Image from "next/image";
import Link from "next/link";
import Status from "../../Status";
import iconBox from "@/assets/icons/project-box.svg"
import iconUsefullDoc from "@/assets/icons/useful-doc.svg"
import iconRunBtn from "@/assets/icons/run-btn.svg"
import { useState } from "react";

interface AccordionItemProps {
  item: {
    title: string,
    content: {
      title: string,
      responsibleName: string,
      plannedDate: string,
      executionDate: string,
      documentationUrl: string,
      status: {
        id: 1 | 2 | 3 | 4
      }
    }[]
  },
  index: number,
  onClick: (isOpen: boolean) => void
}

export default function AccordionItem({ item, index, onClick }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev: boolean) => !prev);
    onClick(isOpen);
  }

  return (
    <li key={index} className={isOpen ? "isActive" : ''} >
      <div className="accordion-header">
        <div className="accordion-header-title" onClick={() => handleClick()}>
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
  );
}