import React from 'react';
import TrackerCard from '../../components/common/tracker-card';
import './dashboard.css';
import { getWorkspaceList } from '@services/workspace-services';

const Dashboard =  () => {

  return (
    <div className='dashboard-main-container'>
      <TrackerCard />
    </div>
  );
};

export default Dashboard;