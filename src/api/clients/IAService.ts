import { storageKeys } from "../../utils/config";

export const fetchAPIIA = async (
  method: "POST",
  path: string,
  body?: any,
) => {
  try {
    const token = localStorage.getItem(storageKeys.accessToken);
    const baseURL = process.env.NEXT_PUBLIC_IA_BASE_URL || '';
    const url = new URL(path, baseURL);

    const requestOptions: any = {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`,
      },
    };

    const response = await fetch(url, requestOptions);

    if ([401, 500].includes(response.status)) {
      localStorage.removeItem(storageKeys.accessToken);
      window.location.href = "/login";
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}