import { CorrectSignIcon, ThreeDotIcon } from '@icons';
import { Avatar, Typography } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import './style.css';

const TrackerCard = () => {
  const { Text } = Typography;

  return (
    <div className='tracker-main-container'>
      <div className='tracker-row'>
        <Text className='tracker-title'>Design Tracker</Text>
        <ThreeDotIcon />
      </div>
      <div className='tracker-row'>
        <div className='tracker-target'>
          <CorrectSignIcon width={12} height={12}/>
          <Text>Target: 1222/5000</Text>
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
      <div>
        
      </div>
      <div className='tracker-row'>
        <div className='tracker-date-card'>2023-11-08</div>
        <Text className='tracker-progress-text'>Work Progress: 0%</Text>
        <div className='tracker-date-card'>2023-11-08</div>
      </div>
      <div></div>
    </div>
  );
};

export default TrackerCard;