import { httpMethods } from "./clients/config";
import { fetchAPISysnapses } from "./clients/sysnapsesService";
import { HttpMethodsProps } from "./clients/types";
import { fetchAPIWorflow } from "./clients/workflowService";

type StatusProps = {
  id: number;
  name: string;
}

export type TaskProps = {
  taskId: number;
  userStoryId: number;
  almId: string;
  automationId: number;
  documentationUrl?: string;
  evidenceUrl?: string;
  executionDate?: Date;
  isAutomated: boolean;
  responsibleName: string;
  pbiStatusId: number;
  step: number;
  name: string
  title: string;
  status: StatusProps;
  createAt: Date;
  createdBy?: string;
  updateAt?: Date;
  updatedBy?: string
  plannedDate?: Date;
}

export const findTasksByStoryIdAndProjectId = async (storyId: number, projectUuid: string): Promise<TaskProps[] | [] | undefined> => {
  try {
    if (!projectUuid) {
      throw new Error('Field Project UUID is missing.');
    }

    if (!storyId) {
      throw new Error('Field StoryId is missing.');
    }

    const response = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/tasks/${storyId}`,
      { projectUuid: projectUuid }
    );

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error fetching Tasks data:", error);
  }
};

export const runWorkflow = async (payload: any) => {
  try {
    await fetchAPIWorflow(
      httpMethods.POST as HttpMethodsProps,
      `/api/v1/workflow/run`,
      payload
    );

  } catch (error) {
    console.error("Error on run workflow:", error);
  }
};