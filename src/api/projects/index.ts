import { httpMethods } from "../clients/config";
import { fetchAPISysnapses } from "../clients/sysnapsesService";
import { HttpMethodsProps } from "../clients/types";

export async function getProjects() {
  try {
    const data = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      "/api/v1/projects",
    );

    return data;
  } catch (error) {
    console.error('Error fetching Projects data:', error);
  }
};
