export interface TrackerProgressbarProps {
  breakPoints: Array<number>;
  progressPercent: number;
}

export interface TrackerCardInfo {
  title: string;
  target: string;
  progressPercent: number;
  startDate: string;
  endDate: string;
}