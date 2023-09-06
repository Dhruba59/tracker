export interface TableDataType {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberOptions: any;
  workspaceId: string;
  members: any;
}

export enum MEMBER_ROLE_TYPE {
  OWNER = 'owner',
  NOT_OWNER = 'not_owner'
}

export interface WorkspaceMemberDeletePayload {
  memberId: string;
  workspaceId: string;
}

export interface TrackerMemberDeletePayload {
  memberId: string;
  trackerId: string;
}

export interface AddMemberPayload {
  is_owner: boolean;
  workspace_id: string;
  user_ids: string[];
}

export interface GetMembersByWorkspaceIdParamsType {
  userName?: string;
  is_owner?: MEMBER_ROLE_TYPE; 
}