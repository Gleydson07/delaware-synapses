import { HttpMethodsProps, httpMethods } from "../utils/config";
import { fetchAPISysnapses } from "./clients/sysnapsesService";

export async function copilotSendMenssage(body: any): Promise<any> {
  try {
    const data = await fetchAPISysnapses(
      httpMethods.POST as HttpMethodsProps,
      "/api/v1/questions",
      body,
      true
    );

    return data;
  } catch (error) {
    console.error('Error fetching Projects data:', error);
  }
};


