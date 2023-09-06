export enum TARGET_TYPE_ENUM {
  TRACKER = 'tracker',
  MILESTONE = 'milestone'
}

export interface AddTargetPayload {
  achieved_target: number;
  achieved_date: string;
  target_type: TARGET_TYPE_ENUM;
  tracker_id: string;
}