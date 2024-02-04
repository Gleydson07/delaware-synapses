import { HttpMethodsProps, storageKeys } from "../../utils/config";

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

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`,
      },
    });

    if ([401, 500].includes(response.status)) {
      localStorage.removeItem(storageKeys.accessToken);
      window.location.href = "/login";
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}