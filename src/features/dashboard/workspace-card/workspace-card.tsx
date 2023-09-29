import { useState, useEffect } from 'react';
import { message } from 'antd';
import TrackerCard from '@components/common/tracker/tracker-card';
import { ResponseType } from '@models/global-models';
import './workspace-card.css';
import UserAvatar from '@components/common/user-avatar';
import { getTrackersByWorkspaceId } from '@services/tracker-service';

const WorkspaceCard = ({ workspace }: any) => {
  const [trackers, setTrackers] = useState<any>();

  const fetchTrackers = async () => {
    try {
      const res: ResponseType = await getTrackersByWorkspaceId({ workspaceId: workspace?.id });
      setTrackers(res.payload);
    } catch (error: any) {
      message.error('unable to fetch trackers!');
    }
  };

  useEffect(() => {
    fetchTrackers();
  }, []);

  if(trackers?.length === 0){
    return (
      <></>
    );
  };

  return (
    <div>
      <div className='dashboard-workspace-title'>
        <UserAvatar title={workspace?.title ?? ''} />
        <span>{workspace?.title}</span>
      </div>
      <div className='dashboard-workspace-tracker-container'>
        {trackers?.map((tracker: any) => (
            <TrackerCard 
              key={tracker?.id} 
              trackerData={tracker} 
              workspaceId={workspace.id} 
              onUpdateTracker={fetchTrackers}
            />
          ))}
      </div>
    </div>
  );
};

export default WorkspaceCard;