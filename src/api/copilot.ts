import { httpMethods } from "../utils/config";
import { fetchAPIIA } from "./clients/IAService";

export async function copilotSendMenssage(body: any): Promise<any> {
  try {
    const data = await fetchAPIIA(
      httpMethods.POST as "POST",
      "/api/v1/questions",
      body,
    );

    return data;
  } catch (error) {
    console.error('Error fetching IA data:', error);
  }
};


