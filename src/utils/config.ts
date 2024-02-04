type StorageKeysProps = {
  accessToken: string;
  microsoftCode: string;
  projectTitle: string;
}

export type HttpMethodsProps = 'GET' | 'POST';

export const storageKeys: StorageKeysProps = {
  accessToken: "access_token",
  microsoftCode: "auth_code",
  projectTitle: "project_title",
}

export const httpMethods = {
  GET: 'GET',
  POST: 'POST',
}