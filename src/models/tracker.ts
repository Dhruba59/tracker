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
  tracker: TrackerCardInfo;
}

export enum TRACKER_TYPE {
  TASK = 'TASK',
  NUMERIC = 'NUMERIC'
}

export interface TaskBarProps {
  tracker: TrackerCardInfo;
}

export interface TaskItemProps {
  task: string;
}

