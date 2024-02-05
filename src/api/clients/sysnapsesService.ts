import { HttpMethodsProps, storageKeys } from "../../utils/config";

export const fetchAPISysnapses = async (
  method: HttpMethodsProps,
  path: string,
  options?: any,
  isBody = false
) => {
  try {
    const token = localStorage.getItem(storageKeys.accessToken);
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || '';
    const url = new URL(path, !isBody ? baseURL : "https://qas-synapses-ai-api.c-659151e.kyma.ondemand.com");

    if (options && !isBody) {
      Object.entries(options).forEach(([key, value]) => {
        url.searchParams.append(key, value as string);
      });
    }

    const requestOptions: any = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`,
      },
    };

    if (isBody) {
      requestOptions.body = JSON.stringify(options);
    }

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