import { TRACKER_TYPE, TrackerCardInfo } from '@models/tracker';

export const stringToDateOnly = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleString().split(',')[0];
};

export const tracker: TrackerCardInfo = {
  id: 'dfadsfad',
  status: true,
  created_by: 'a2c92055-4ddb-4e2d-bdbe-562216c20462',
  updated_by: 'a2c92055-4ddb-4e2d-bdbe-562216c20462',
  created_at: '2023-08-23T10:45:03.987Z',
  updated_at: '2023-08-23T10:45:03.987Z',
  title: 'Tracker',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, a laboriosam pariatur commodi totam laudantium inventore iste officia aspernatur dicta.',
  start_date: '2023-08-23T00:00:00.000Z',
  end_date: '2023-08-25T00:00:00.000Z',
  type: 'TASK' as TRACKER_TYPE,
  target_start: 2,
  target_end: 22,
  is_archived: false,
  percentage: 34,
  task: [
    'task2', 'task43', 'tasdfas43', 'task'
  ]
};