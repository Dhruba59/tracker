import { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import TrackerCard from '@components/common/tracker/tracker-card';
import { ResponseType } from '@models/global-models';
import { getWorkspaceById } from '@services/workspace-services';
import './workspace-card.css';

const WorkspaceCard = ({ id }: any) => {
  const [workspace, setWorkspace] = useState<any>();

  const fetchWorkspace = async () => {
    try {
      const res: ResponseType = await getWorkspaceById(id);
      setWorkspace(res.payload);
    } catch (error: any) {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchWorkspace();
  }, []);

  if(workspace?.trackers?.length === 0){
    return (
      <></>
    );
  };

  return (
    <div>
      <div className='dashboard-workspace-title'>
        <Avatar />
        <span>{workspace?.title}</span>
      </div>
      <div className='dashboard-workspace-tracker-container'>
        {workspace?.trackers?.map((tracker: any) => (
          <TrackerCard key={tracker.id} trackerData={tracker} workspaceId={workspace.id} />
        ))}
      </div>
    </div>
  );
};

export default WorkspaceCard;