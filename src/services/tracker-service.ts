import { API_END_POINTS } from '@constants/global-constants';
import HttpClientInstance from './base-services';
import { CreateUpdateTrackerPayload, GetTrackerByWorkspaceIdPayload } from '@models/tracker';

const httpClient = new HttpClientInstance();

// export const createWorkspace = (data : CreateWorkspacePayload) => {
//   const url = API_END_POINTS.WORKSPACE;
//   return httpClient.post(url, { data });
// };

// export const getWorkspaceList = () => {
//   const url = API_END_POINTS.WORKSPACE;
//   return httpClient.get(url);
// };


export const getTrackersByWorkspaceId= (data: GetTrackerByWorkspaceIdPayload) => {
  const url = API_END_POINTS.TRACKER;
  return httpClient.get(url, { params: data });
};

export const getTrackerById= (id: string) => {
  const url = `${API_END_POINTS.TRACKER}/${id}`;
  return httpClient.get(url);
};

export const createTracker= (data: CreateUpdateTrackerPayload) => {
  const url = API_END_POINTS.TRACKER;
  return httpClient.post(url, { data });
};

export const updateTracker= (id: string, data: CreateUpdateTrackerPayload) => {
  const url = `${API_END_POINTS.TRACKER}/${id}`;
  return httpClient.put(url, { data });
};