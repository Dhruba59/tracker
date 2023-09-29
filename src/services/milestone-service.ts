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
  return httpClient.patch(url, { data });
};

export const getMilestoneById= (id: string) => {
  const url = `${API_END_POINTS.MILESTONE}/${id}`;
  return httpClient.get(url);
};
