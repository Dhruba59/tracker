import { TrackerCardInfo } from './tracker';

export interface CreateTaskPayload {
  title: string;
  is_done?: TaskStatusEnum;
  task_type?: string;
  tracker_id: string;
  milestone_id?: string;
}

export interface GetTasksPayload {
  task_type: string;
  tracker_id: string;
  milestone_id?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  is_done?: TaskStatusEnum;
  task_type?: TASK_TYPE;
  tracker_id: string;
  milestone_id?: string;
}

export enum TASK_TYPE {
  TRACKER = 'tracker',
  MILESTONE = 'milestone'
}

export interface TaskBarProps {
  tracker: any;
  refetchTracker: () => void;
}

export interface TaskItemProps {
  form: any;
  task: any;
  onTaskUpdate : (id: string, values: Omit<UpdateTaskPayload, 'tracker_id'>) => void;
  onTaskDelete : (id: string) => void;
}

export enum TaskStatusEnum {
  DONE = 1,
  PENDING = 0,
}