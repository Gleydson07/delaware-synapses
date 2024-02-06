import { AccordionContainer } from "./styles";
import AccordionUser from "./AccordionUser";
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
  return (
    <AccordionContainer>
      <ul className="accordion-list">
        {itemsTasks.map((itemTask, index) => (
          <AccordionUser
            key={index}
            featureId={featureId}
            handleClick={handleClick}
            hasWorkFlow={hasWorkFlow}
            itemTasks={itemTask}
            status={status}
            userId={userId}
          />
        ))}
      </ul>
    </AccordionContainer>
  );
}
