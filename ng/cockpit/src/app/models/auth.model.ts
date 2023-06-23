export interface Credential {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  error?: {
    error: string;
  };
}
