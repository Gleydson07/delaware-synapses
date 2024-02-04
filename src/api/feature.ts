import { httpMethods } from "./clients/config";
import { fetchAPISysnapses } from "./clients/sysnapsesService";
import { HttpMethodsProps } from "./clients/types";

type StatusProps = {
  id: number;
  name: string;
}

export type FeatureProps = {
  featureId: number;
  almId: string;
  epicId: number;
  pbiStatusId: number;
  completeWork: number;
  totalWork: number;
  percentComplete: number;
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

export const findFeaturesByFaseIdAndProjectId = async (epicId: number, projectUuid: string): Promise<FeatureProps[] | [] | undefined> => {
  try {
    if (!projectUuid) {
      throw new Error('Field Project UUID is missing.');
    }

    if (!epicId) {
      throw new Error('Field EpicId is missing.');
    }

    const response = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/features/${epicId}`,
      { projectUuid: projectUuid }
    );

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error fetching Features data:", error);
  }
};
