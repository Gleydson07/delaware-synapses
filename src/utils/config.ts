type StorageKeysProps = {
  accessToken: string;
  microsoftCode: string;
  projectName: string;
}

export type HttpMethodsProps = 'GET' | 'POST';

export const storageKeys: StorageKeysProps = {
  accessToken: "access_token",
  microsoftCode: "auth_code",
  projectName: "project_name",
}

export const httpMethods = {
  GET: 'GET',
  POST: 'POST',
}