import { API_END_POINTS } from '@constants/global-constants';
import HttpClientInstance from './base-services';
import { CreateTaskPayload, GetTasksPayload, UpdateTaskPayload } from '@models/task';
import { CreateOrUpdateMilestonePayload } from '@models/milestone';

const httpClient = new HttpClientInstance();

export const createMilestone= (data: CreateOrUpdateMilestonePayload) => {
  const url = API_END_POINTS.MILESTONE;
  return httpClient.post(url, { data });
};

export const updateMilestone= (id: string, data: CreateOrUpdateMilestonePayload) => {
  const url = `${API_END_POINTS.MILESTONE}/${id}`;
  return httpClient.put(url, { data });
};

export const getMilestoneById= (id: string) => {
  const url = `${API_END_POINTS.MILESTONE}/${id}`;
  return httpClient.get(url);
};

// export const getTasks= (data: GetTasksPayload) => {
//   const url = API_END_POINTS.MILESTONE;
//   return httpClient.get(url, { params: data });
// };

// export const updateTask= (id: string, data: UpdateTaskPayload) => {
//   const url = `${API_END_POINTS.MILESTONE}/${id}`;
//   return httpClient.put(url, { data });
// };

// export const deleteTask= (id: string) => {
//   const url = `${API_END_POINTS.MILESTONE}/${id}`;
//   return httpClient.delete(url);
// };
