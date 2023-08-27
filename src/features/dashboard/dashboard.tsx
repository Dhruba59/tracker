import { Avatar } from 'antd';
import { TrackerCardInfo } from '@models/tracker';
import TrackerCard from '../../components/common/tracker/tracker-card';
import './dashboard.css';
import { tracker } from '@helpers/global-helpers';

const Dashboard = () => {
  return (
    <div className='dashboard-main-container'>
      <div className='dashboard-title'>
        <Avatar />
        <span>Vivasoft Workspace</span>
      </div>
      <div className='dashboard-tracker-container'>
        <TrackerCard tracker={tracker}/>
        <TrackerCard tracker={tracker}/>
        <TrackerCard tracker={tracker}/>
        <TrackerCard tracker={tracker}/>
      </div>  
    </div>
  );
};

export default Dashboard;