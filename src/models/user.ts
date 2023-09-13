import { Dispatch, ReactNode, SetStateAction } from "react";

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
export interface User {
  id?: string;
  name?: string;
  profile_image: string;
  email: string;
  is_verified: number;
  status: number;
}

export interface UserContextDataType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export interface UserContextProps {
  children: ReactNode;
}