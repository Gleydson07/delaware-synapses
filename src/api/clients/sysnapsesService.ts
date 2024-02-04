import { storageKeys } from "./config";
import { HttpMethodsProps } from "./types";

export const fetchAPISysnapses = async (
  method: HttpMethodsProps,
  path: string,
  options?: any
) => {
  try {
    const token = localStorage.getItem(storageKeys.accessToken);
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';
    const url = new URL(path, baseURL);

    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        url.searchParams.append(key, value as string);
      });
    }

    // debugger
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}