import { API_END_POINTS } from '@constants/global-constants';
import HttpClientInstance from './base-services';
import { CreateWorkspacePayload } from '@models/workspace';
import { AddMemberPayload, TrackerMemberDeletePayload } from '@models/members';

const httpClient = new HttpClientInstance();

export const getMembersByTrackerId = (id: string) => {
  const url = `${API_END_POINTS.TRACKER_MEMBERS}/${id}`;
  return httpClient.get(url);
};

export const addTrackerMember = (data: AddMemberPayload) => {
  const url = API_END_POINTS.TRACKER_MEMBERS;
  return httpClient.post(url, { data });
};

export const deleteTrackerMember = ({memberId, trackerId}: TrackerMemberDeletePayload) => {
  const url = `${API_END_POINTS.TRACKER_MEMBERS}/${memberId}/${trackerId}`;
  return httpClient.delete(url);
};

