import { Avatar, Typography } from 'antd';
import './activity.css';
import { formatTime } from '@helpers/global-helpers';
import UserAvatar from '@components/common/user-avatar';

const { Text } = Typography;

const Activity = ({ activity }: any) => {
  const message = activity?.message?.split('called');
  const dateEvent = new Date(activity?.created_at);
  const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = dateEvent.toLocaleDateString(undefined, options);

  return (
    <div className='activity-container'>
      <div className='activity-dp'>
        <UserAvatar title={activity?.created_by?.name} src={activity?.created_by?.profile_image_url} />
      </div>
      <div className='activity-col-2'>
        <Text className='activity-title'>{message[0]} {message.length > 1 ? 'called': ''}<span> {message[1]}.</span></Text>
        <Text className='activity-time-user'>{date} at {formatTime(activity.created_at)} by <span>{activity.created_by.name}</span></Text>
      </div>
    </div>
  );
};

export default Activity;