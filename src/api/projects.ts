import { HttpMethodsProps, httpMethods } from "../utils/config";
import { fetchAPISysnapses } from "./clients/sysnapsesService";

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
