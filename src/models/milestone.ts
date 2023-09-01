export interface CreateOrUpdateMilestonePayload {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  tracker_id: string;
}

// export interface GetTasksPayload {
//   task_type: string;
//   tracker_id: string;
//   milestone_id?: string;
// }


// export enum TASK_TYPE {
//   TRACKER = 'tracker',
//   MILESTONE = 'milestone'
// }

// export interface TaskBarProps {
//   tracker: TrackerCardInfo;
// }

// export interface TaskItemProps {
//   form: any;
//   task: any;
//   trackerId: string;
//   onTaskUpdate : (id: string, values: UpdateTaskPayload) => void;
//   onTaskDelete : (id: string) => void;
// }

// export enum TaskStatusEnum {
//   DONE = 1,
//   PENDING = 0,
// }