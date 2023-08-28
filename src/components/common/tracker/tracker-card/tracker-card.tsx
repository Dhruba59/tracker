import { CorrectSignIcon, ThreeDotIcon } from '@icons';
import { Avatar, Form, Menu, MenuProps, Modal, Progress, Typography } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

import TrackerProgressbar from '../tracker-progressbar';
import './tracker-card.css';
import { TrackerCardInfo, TrackerCardProps } from '@models/tracker';
import { stringToDateOnly } from '@helpers/global-helpers';
import AppPopover from '@components/common/pop-over';
import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/route-constants';

const TrackerCard = ({ tracker }: TrackerCardProps) => {
  const { Text } = Typography;
  const navigate = useNavigate();

  const threeDotItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Restore',
      onClick: () => console.log('s')
    },
    {
      key: '2',
      label: 'View',
      onClick: () => navigate(`${routes.tracker.path}/${tracker.id}`)
    }
  ];
  
  const threeDotContent = (
    <Menu items={threeDotItems}></Menu>
  );

  return (
    <div className='tracker-main-container'>
      <div className='tracker-row'>
        <Text className='tracker-title'>{tracker.title}</Text>
        <AppPopover content={threeDotContent}>
          <ThreeDotIcon />
        </AppPopover>
       
      </div>
      <div className='tracker-row'>
        <div className='tracker-target'>
          <CorrectSignIcon width={12} height={12}/>
          <Text>Target: 12/22</Text>
        </div>
        <Avatar.Group>
          <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1' />
          <a href='https://ant.design'>
            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          </a>
          {
          // TODO
          /* <Tooltip title="Ant User" placement="top">
            <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
          </Tooltip> */}
          <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
        </Avatar.Group>
      </div>
      <TrackerProgressbar type={tracker.type} progressPercent={tracker.percentage} breakPoints={[23,44,90]} />   
      <div className='tracker-row'>
        <div className='tracker-date-card'>{stringToDateOnly(tracker.start_date)}</div>
        <Text className='tracker-progress-text'>Work Progress: <span>{tracker.percentage}%</span></Text>
        <div className='tracker-date-card'>{stringToDateOnly(tracker.end_date)}</div>
      </div>
    </div>
  );
};

export default TrackerCard;