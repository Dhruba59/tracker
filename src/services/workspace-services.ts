import { API_END_POINTS } from '@constants/global-constants';
import HttpClientInstance from './base-services';
import { CreateWorkspacePayload } from '@models/workspace';

const httpClient = new HttpClientInstance();

export const createWorkspace = (data : CreateWorkspacePayload) => {
  const url = API_END_POINTS.WORKSPACE;
  return httpClient.post(url, { data });
};

export const getWorkspaceList = () => {
  const url = API_END_POINTS.WORKSPACE;
  return httpClient.get(url);
};