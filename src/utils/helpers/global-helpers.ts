import { routes } from '@constants/route-constants';
import { ResponseType } from '@models/global-models';
import { TRACKER_TYPE, TrackerCardInfo } from '@models/tracker';
import { getWorkspaceList } from '@services/workspace-services';

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

export const manageRouteAfterLogin = () => {
  getWorkspaceList().then((res: ResponseType) => {
    if(res.payload.length === 0) {
      window.location.pathname = routes.create_first_workspace.path;
    }
    else {
      window.location.pathname = routes.dashboard.path;
    }
  }).catch((error: any) => console.log('Something went wrong!'));
};

export function CalculateMilestonePercent (startDateString: string | Date, endDateString: string | Date, thirdDateString: string | Date): number {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const thirdDate = new Date(thirdDateString);

  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = thirdDate.getTime() - startDate.getTime();

  const percentage = (elapsedDuration / totalDuration) * 100;

  return percentage;
}

export const greetByTime = (userName: string) => {
  const currentHour = new Date().getHours();
  if (currentHour >= 4 && currentHour < 12) {
    return `Good Morning, ${userName}! Have a good day! ✨`;
  } else if (currentHour >= 12 && currentHour < 17) {
    return `Good Afternoon, ${userName}! Have a good day! ✨`;
  } else if (currentHour >= 17 && currentHour < 22) {
    return `Good Evening, ${userName}! Hope you have a good day! ✨`;
  } else {
    return `Good Night, ${userName}! Have a good sleep! ✨`;
  }
};


export function formatNumberWithTwoDecimals(number: number) {
  if (Number.isInteger(number)) {
    return number?.toString(); // It's an integer, return as is
  } else {
    return number;
    // return number?.toFixed(2); // It's not an integer, format with two decimals
  } 
}


const currentDate = new Date();
const formattedTimeString = formatTime(currentDate);
// console.log(formattedTimeString); // Output: '8.20 pm'
