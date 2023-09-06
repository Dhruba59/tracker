import { API_END_POINTS } from '@constants/global-constants';
import HttpClientInstance from './base-services';
import { AddTargetPayload } from '@models/target';

const httpClient = new HttpClientInstance();

export const addTarget= (data: AddTargetPayload) => {
  const url = API_END_POINTS.TARGET;
  return httpClient.post(url, { data });
};
