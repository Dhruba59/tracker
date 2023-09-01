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

export function formatTime(date: string | Date) {
  date = new Date(date);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Determine whether it's AM or PM
  const amOrPm = hours < 12 ? 'am' : 'pm';

  // Format minutes with leading zero if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Create the formatted time string
  const formattedTime = `${formattedHours}.${formattedMinutes} ${amOrPm}`;

  return formattedTime;
}

export const generateMilestoneTitle = (length: number) => {
  return `milestone-${length+1}`;
};

const currentDate = new Date();
const formattedTimeString = formatTime(currentDate);
console.log(formattedTimeString); // Output: '8.20 pm'
