export interface TrackerProgressbarProps {
  breakPoints: Array<number>;
  type: TRACKER_TYPE;
  progressPercent: number;
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
}

export enum TRACKER_TYPE {
  TASK = 'TASK',
  NUMERIC = 'NUMERIC'
}

export interface CreateUpdateTrackerPayload {
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  type?: string;
  target_start?: number;
  target_end?: number;
  workspace_id: string;
  user_ids?: string[];
}