import { Avatar, Typography } from 'antd';
import './activity.css';

const { Text } = Typography;

const Activity = ({activity}: any) => {
  return (
    <div className='activity-container'>
      <Avatar size='large' />
      <div className='activity-col-2'>
        <Text className='activity-title'>Created 2 new team in <span>PiHR</span></Text>
        <Text className='activity-time-user'>8.12 PM by <span>Nayem Nawaf</span></Text>
      </div>
    </div>
  );
};

export default Activity;