import { HttpMethodsProps, httpMethods } from "../utils/config";
import { fetchAPIWorflow } from "./clients/workflowService";

export async function runWorkFlow(body: any) {
  try {
    const data = await fetchAPIWorflow(
      httpMethods.POST as HttpMethodsProps,
      "/api/v1/start",
      body,
    );

    return data;
  } catch (error) {
    console.error('Error fetching Projects data:', error);
  }
};
