import { Avatar, message } from 'antd';
import { TrackerCardInfo } from '@models/tracker';
import TrackerCard from '../../components/common/tracker/tracker-card';
import './dashboard.css';
import { tracker } from '@helpers/global-helpers';
import { getWorkspaceList } from '@services/workspace-services';
import { Fragment, useEffect, useState } from 'react';
import { ResponseType } from '@models/global-models';
import WorkspaceCard from './workspace-card';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState<any>();

  const fetchWorkspaces = async () => {
    try {
      const res: ResponseType = await getWorkspaceList();
      setWorkspaces(res.payload);
    } catch (error: any) {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div className='dashboard-main-container'>
      {workspaces?.map((workspace: any) => (
        <WorkspaceCard key={workspace.id} id={workspace.id}/>
      ))}
    </div>
  );
};

export default Dashboard;