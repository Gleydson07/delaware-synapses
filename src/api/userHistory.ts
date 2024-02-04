import { httpMethods } from "./clients/config";
import { fetchAPISysnapses } from "./clients/sysnapsesService";
import { HttpMethodsProps } from "./clients/types";

type StatusProps = {
  id: number;
  name: string;
}

export type UserStoriesProps = {
  almId: string;
  userStoryId: number;
  hasWorkflow: boolean;
  workflowId: number;
  projectId: number;
  project?: string;
  featureId: number;
  pbiStatusId: number;
  completeWork: number;
  totalWork: number;
  percentComplete: number;
  step: number;
  name: string;
  title: string;
  status: StatusProps;
  createAt: Date;
  createdBy?: string;
  updateAt?: Date;
  updatedBy?: string;
  plannedDate?: Date;
}

export const fetchUserStoriesData = async (featureId: number, projectUuid: string): Promise<UserStoriesProps[] | [] | undefined> => {
  try {
    if (!featureId) {
      throw new Error('Field FeatureId is missing.');
    }

    if (!projectUuid) {
      throw new Error('Field Project UUID is missing.');
    }

    const response = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/user-stories/${featureId}`,
      { projectUuid: projectUuid }
    );

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error fetching User Stories data:", error);
  }
};
