import { httpMethods } from "./clients/config";
import { fetchAPISysnapses } from "./clients/sysnapsesService";
import { HttpMethodsProps } from "./clients/types";

export type PhaseProps = {
  almId: string;
  phaseId: number;
  projectId: number;
  pbiStatusId: number;
  completeWork: number;
  totalWork: number;
  percentComplete: number;
  step: number;
  name: string
  title: string;
  createAt: Date;
  createdBy?: string;
  updateAt?: Date;
  updatedBy?: string
  plannedDate?: Date;
}

export const findPhasesByProjectId = async (projectUuid: string): Promise<PhaseProps[] | [] | undefined> => {
  try {
    if (!projectUuid) {
      throw new Error('Field Project UUID is missing.');
    }

    const response = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/phases`,
      { projectUuid: projectUuid }
    );

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error('Error fetching Phases data:', error);
  }
};
