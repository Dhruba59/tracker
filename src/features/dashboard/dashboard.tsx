import { Avatar, message } from 'antd';
import { TrackerCardInfo } from '@models/tracker';
import TrackerCard from '../../components/common/tracker/tracker-card';
import './dashboard.css';
import { tracker } from '@helpers/global-helpers';
import { getWorkspaceList } from '@services/workspace-services';
import { Fragment, useEffect, useState } from 'react';
import { ResponseType } from '@models/global-models';
import WorkspaceCard from './workspace-card';
import WelcomeCard from '@components/common/welcome-card';
import { FullPageLoading } from '@components/full-page-loading';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWorkspaces = () => {
    setIsLoading(true);
    getWorkspaceList().then((workSpaceList: ResponseType) => {
      setWorkspaces(workSpaceList.payload);
      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  if(isLoading){
    return <FullPageLoading />;
  }

  return (
    <div className='dashboard-main-container'>
      <WelcomeCard />
      <div className='dashboard-body'>
        {workspaces?.map((workspace: any) => (
        <WorkspaceCard key={workspace.id} workspace={workspace}/>
        ))}
      </div>
    </div>
    
  );
};

export default Dashboard;