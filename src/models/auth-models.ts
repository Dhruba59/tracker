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

export interface RequestResetPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface EmailVerificationPayload {
  token: string;
}

export interface RequestConfig {
  headers?: any;
  params?: any;
  data?: any;
  timeout?: number;
  responseType?: ResponseType;
  onUploadProgress?: (progressEvent: any) => void;
}

export interface Response {
  status: number;
  data: any;
}