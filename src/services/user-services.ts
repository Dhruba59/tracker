import { API_END_POINTS } from '@constants/global-constants';
import { CreateWorkspacePayload } from '@models/workspace';
import { ChangePasswordPayload, UpdateUserProfilePayload } from '@models/user';
import HttpClientInstance from './base-services';

const httpClient = new HttpClientInstance();

export const getUserProfile = () => {
  const url = `${API_END_POINTS.USER}/profile`;
  return httpClient.get(url);
};

export const updateUserProfile = (data: UpdateUserProfilePayload | FormData) => {
  const url = `${API_END_POINTS.USER}`;
  return httpClient.patch(url, { data });
};

export const getAllUser = () => {
  const url = API_END_POINTS.USER;
  return httpClient.get(url);
};

export const changePassword = (data: ChangePasswordPayload) => {
  const url = `${API_END_POINTS.USER}/change-password`;
  return httpClient.post(url, { data });
};