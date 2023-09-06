import { Avatar, Typography } from 'antd';
import './activity.css';
import { formatTime } from '@helpers/global-helpers';

const { Text } = Typography;

const Activity = ({ activity }: any) => {
  const message = activity?.message?.split('called');
  
  return (
    <div className='activity-container'>
      <div className='activity-dp'>
        <Avatar size='large' />
      </div>
      <div className='activity-col-2'>
        <Text className='activity-title'>{message[0]} called <span>{message[1]}</span></Text>
        <Text className='activity-time-user'>{formatTime(activity.created_at)} by <span>{activity.created_by.name}</span></Text>
      </div>
    </div>
  );
};

export default Activity;