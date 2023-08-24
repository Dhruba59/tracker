import { API_END_POINTS } from '@constants/global-constants';
import HttpClientInstance from './base-services';

const httpClient = new HttpClientInstance();

// export const createWorkspace = (data : CreateWorkspacePayload) => {
//   const url = API_END_POINTS.WORKSPACE;
//   return httpClient.post(url, { data });
// };

// export const getWorkspaceList = () => {
//   const url = API_END_POINTS.WORKSPACE;
//   return httpClient.get(url);
// };

export const getTrackersByWorkspaceId= (id: string) => {
  const url = `${API_END_POINTS.TRACKER}/workspace/${id}`;
  return httpClient.get(url);
};