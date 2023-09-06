import { API_END_POINTS } from '@constants/global-constants';
import HttpClientInstance from './base-services';

const httpClient = new HttpClientInstance();

export const getEventLogByTrackerId= (trackerId: string) => {
  const url = `${API_END_POINTS.EVENT_LOG}/${trackerId}`;
  return httpClient.get(url);
};

