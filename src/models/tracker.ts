export interface TrackerProgressbarProps {
  tracker: any;
  progressPercent: number;
  milestones: any;
  onUpdateTracker: () => void;
}

export interface TrackerCardInfo {
  id?: string;
  status: boolean,
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  type: TRACKER_TYPE;
  target_start: number;
  target_end: number;
  is_archived: boolean;
  percentage: number; 
  task?: any[];
}

export interface TrackerCardProps {
  trackerData: any;
  workspaceId: string;
  onUpdateTracker: () => void;
}

export enum TRACKER_TYPE {
  TASK = 'TASK',
  NUMERIC = 'NUMERIC'
}

export enum ARCHIVE_TYPE_ENUM {
  ARCHIVE = 1,
  NOT_ARCHIVE = 0
}

export interface GetTrackerByWorkspaceIdPayload {
  workspaceId: string;
  isArchived?: boolean;
}

export interface CreateUpdateTrackerPayload {
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  type?: string;
  target_start?: number;
  target_end?: number;
  workspace_id: string;
  user_ids?: string[];
  is_archived?: ARCHIVE_TYPE_ENUM;
}

export interface CreateTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  workspaceId: string;
  form?: any;
  isCreateLoading: boolean;
};
