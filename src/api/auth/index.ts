import { storageKeys } from "@/api/clients/config";

// AUTH LOGIN
export async function loginRedirect() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const response_type = process.env.NEXT_PUBLIC_RESPONSE_TYPE;
  const response_mode = process.env.NEXT_PUBLIC_RESPONSE_MODE;
  const scope = process.env.NEXT_PUBLIC_SCOPE;
  const state = process.env.NEXT_PUBLIC_STATE;
  const code_challenge_method = process.env.NEXT_PUBLIC_CODE_CHALLENGE_METHOD;
  const code_challenge = process.env.NEXT_PUBLIC_CODE_CHALLENGE;
  const baseURL = process.env.NEXT_PUBLIC_NEXT_BASE_URL;

  return `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=${response_type}&redirect_uri=${baseURL}&response_mode=${response_mode}&scope=${scope}&state=${state}&code_challenge_method=${code_challenge_method}&code_challenge=${code_challenge}`;
};

// AUTH LOGOUT
export async function signOut() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const baseURL = process.env.NEXT_PUBLIC_NEXT_BASE_URL!;

  localStorage.removeItem(storageKeys.accessToken);
  return `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?client_id=${clientId}&post_logout_redirect_uri=${baseURL}`;
};

// AUTH GET TOKEN
export async function signIn(code: string): Promise<string | undefined> {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const scope = process.env.NEXT_PUBLIC_SCOPE;
  const codeVerifier = process.env.NEXT_PUBLIC_CODE_CHALLENGE;
  const redirect_uri = process.env.NEXT_PUBLIC_NEXT_BASE_URL!;

  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  try {
    const headerParams = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': redirect_uri
    });

    const bodyParams = new URLSearchParams({
      'client_id': clientId || '',
      'scope': scope || '',
      'code': code,
      'redirect_uri': redirect_uri,
      'grant_type': 'authorization_code',
      'code_verifier': codeVerifier || '',
    });

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: headerParams,
      body: bodyParams,
    });

    let accessToken: string | undefined;
    if (response.ok) {
      const data = await response.json();
      accessToken = data.access_token;

      localStorage.setItem(storageKeys.accessToken, accessToken!);
    }

    return accessToken;
  } catch (error: any) {
    console.error('Error exchanging code for token:', error);
  }
};
