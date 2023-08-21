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