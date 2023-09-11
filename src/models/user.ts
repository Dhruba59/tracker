export interface ChangePasswordPayload {
  previousPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UpdateUserProfilePayload {
  name?: string;
  email?: string;
  profile_image?: any;
}