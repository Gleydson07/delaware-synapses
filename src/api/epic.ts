import { HttpMethodsProps, httpMethods } from "../utils/config";
import { fetchAPISysnapses } from "./clients/sysnapsesService";

type StatusProps = {
  id: number;
  name: string;
}

export type EpicProps = {
  almId: string;
  epicId: number;
  pbiStatusId: number;
  phaseId: number;
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
  plannedDate?: string;
}

export const findEpicsByFaseIdAndProjectId = async (phaseId: number, projectUuid: string): Promise<EpicProps[] | [] | undefined> => {
  try {
    if (!phaseId) {
      throw new Error('Project UUID is missing.');
    }

    if (!projectUuid) {
      throw new Error('Project UUID is missing.');
    }

    const response: EpicProps[] = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/epics/${phaseId}`,
      { projectUuid: projectUuid }
    );

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error(`Error fetching Epics data: ${error}`);
  }
};
