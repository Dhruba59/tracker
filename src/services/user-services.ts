import { API_END_POINTS } from '@constants/global-constants';
import HttpClientInstance from './base-services';
import { CreateWorkspacePayload } from '@models/workspace';

const httpClient = new HttpClientInstance();

export const getAllUser = () => {
  const url = API_END_POINTS.USER;
  return httpClient.get(url);
};

