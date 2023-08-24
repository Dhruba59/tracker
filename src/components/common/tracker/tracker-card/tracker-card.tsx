import { CorrectSignIcon, ThreeDotIcon } from '@icons';
import { Avatar, Form, Modal, Progress, Typography } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

import TrackerProgressbar from '../tracker-progressbar';
import './tracker-card.css';
import { TrackerCardInfo } from '@models/tracker';

export interface TrackerCardProps {
  tracker: TrackerCardInfo;
}

const TrackerCard = ({ tracker }: TrackerCardProps) => {
  const { Text } = Typography;
  const { title, target, progressPercent, startDate, endDate } = tracker;
  return (
    <div className='tracker-main-container'>
      <div className='tracker-row'>
        <Text className='tracker-title'>Design Tracker</Text>
        <ThreeDotIcon />
      </div>
      <div className='tracker-row'>
        <div className='tracker-target'>
          <CorrectSignIcon width={12} height={12}/>
          <Text>Target: {target}</Text>
        </div>
        <Avatar.Group>
          <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' />
          <a href='https://ant.design'>
            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          </a>
          {/* <Tooltip title="Ant User" placement="top">
            <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
          </Tooltip> */}
          <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
        </Avatar.Group>
      </div>
      <TrackerProgressbar progressPercent={progressPercent} breakPoints={[23,44,90]} />   
      <div className='tracker-row'>
        <div className='tracker-date-card'>{startDate}</div>
        <Text className='tracker-progress-text'>Work Progress: <span>{progressPercent}%</span></Text>
        <div className='tracker-date-card'>{endDate}</div>
      </div>
    </div>
  );
};

export default TrackerCard;