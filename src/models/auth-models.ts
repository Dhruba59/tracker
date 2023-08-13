export interface Credentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface LogoutResponse {
  message: string;
}
