import { API_END_POINTS } from '@constants/global-constants';
import HttpClientInstance from './base-services';
import { CreateWorkspacePayload } from '@models/workspace';
import { AddMemberPayload, WorkspaceMemberDeletePayload } from '@models/members';

const httpClient = new HttpClientInstance();

export const getMembersByWorkspaceId = (id: string) => {
  const url = `${API_END_POINTS.WORKSPACE_MEMBERS}/${id}`;
  return httpClient.get(url);
};

export const addWorkspaceMember = (data: AddMemberPayload) => {
  const url = API_END_POINTS.WORKSPACE_MEMBERS;
  return httpClient.post(url, { data });
};

export const deleteWorkspaceMember = ({memberId, workspaceId}: WorkspaceMemberDeletePayload) => {
  const url = `${API_END_POINTS.WORKSPACE_MEMBERS}/${memberId}/${workspaceId}`;
  return httpClient.delete(url);
};

