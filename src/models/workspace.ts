import { Dispatch, SetStateAction } from 'react';
export interface CreateWorkspacePayload {
  title: string;
}

export interface WorkspaceContextInitialValue {
  workspaceId: string;
  setWorkspaceId: Dispatch<SetStateAction<string>>;
}