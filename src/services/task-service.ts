import { API_END_POINTS } from '@constants/global-constants';
import HttpClientInstance from './base-services';
import { CreateTaskPayload, GetTasksPayload, UpdateTaskPayload } from '@models/task';

const httpClient = new HttpClientInstance();

export const createTask= (data: CreateTaskPayload) => {
  const url = API_END_POINTS.TASK;
  return httpClient.post(url, { data });
};

export const getTasks= (data: GetTasksPayload) => {
  const url = API_END_POINTS.TASK;
  return httpClient.get(url, { params: data });
};

export const updateTask= (id: string, data: UpdateTaskPayload) => {
  const url = `${API_END_POINTS.TASK}/${id}`;
  return httpClient.put(url, { data });
};

export const deleteTask= (id: string) => {
  const url = `${API_END_POINTS.TASK}/${id}`;
  return httpClient.delete(url);
};
