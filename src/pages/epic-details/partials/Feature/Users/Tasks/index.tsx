import { findTasksByStoryIdAndProjectId } from "@/api/tasks";
import { runWorkFlow } from "@/api/workflow";
import Accordion from "@/components/Accordion";
import { useEffect, useState } from "react";

export default function Tasks({
  user,
  decrypted,
}: any) {
  const [tasks, setTasks] = useState<any>([]);

  const getTasksForAllUser = async () => {
    const responseTasks = await findTasksByStoryIdAndProjectId(
      user.userStoryId,
      decrypted.uuid
    );

    return responseTasks;
  };

  const fetchData = async () => {
    if (user.userStoryId) {
      const tasks = await getTasksForAllUser();
      setTasks(tasks);
    }
  };

  const handleStartWorkflow = async () => {
    const dataWork = {
      "userStoryId": 3, //user.userStoryId,
      "environmentId": 1
    };

    await runWorkFlow(dataWork);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Accordion
      itemsTasks={[{ title: user.title, content: tasks }]}
      featureId={user.featureId}
      userId={user.userStoryId}
      status={user.status.id}
      hasWorkFlow={user.hasWorkflow}
      handleClick={handleStartWorkflow}
    />
  );
}