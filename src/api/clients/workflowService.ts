import { HttpMethodsProps } from "@/utils/config";

export const fetchAPIWorflow = async (method: HttpMethodsProps, path: string, body?: any) => {
  const apiKey = process.env.NEXT_PUBLIC_WORKFLOW_API_KEY || '';
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL_WORKFLOW || '';
  const url = new URL(path, baseURL);

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}