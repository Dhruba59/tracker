import { useEffect, useState } from 'react';
import { Avatar, message } from 'antd';
import { useParams } from 'react-router-dom';

import './archive.css';
import { getTrackersByWorkspaceId } from '@services/tracker-service';
import { ResponseType } from '@models/global-models';
import TrackerCard from '@components/common/tracker/tracker-card';
import PageHeader from '@components/common/page-header';
import { getWorkspaceById } from '@services/workspace-services';
import EmptyPageCard from '@components/common/empty-page-card';
import { FullPageLoading } from '@components/full-page-loading';

const Archive = () => {
  const [trackers, setTrackers] = useState<any>();
  const [workspace, setWorkspace] = useState<any>();
  const [isLoadingArchive, setIsLoadingArchive] = useState<boolean>(false);
  const { workspaceId } = useParams();

  const fetchWorkspace = () => {
    setIsLoadingArchive(true);
    getWorkspaceById(workspaceId!)
    .then((res: ResponseType) => setWorkspace(res.payload))
    .catch((error) => message.error('unable to fetch workspace'))
    .finally(() => setIsLoadingArchive(false));
  };

  const fetchTrackers = () => {
    getTrackersByWorkspaceId({ workspaceId: workspaceId!, isArchived: true })
    .then((res: ResponseType) => setTrackers(res.payload))
    .catch((error) => message.error('unable to fetch archived tracker'));
  };
  
  useEffect(() => {
    fetchTrackers();
    fetchWorkspace();
  }, [workspaceId]);

  const renderTrackers = (
    trackers?.length === 0 ? (
    <div className='workspace-empty-page'>
      <EmptyPageCard title='You have no archive trackers for this workspace.' />
    </div>    
    ) : (
      trackers?.map((tracker: any) => (
        <div className='workspace-trackers-container'>
          <TrackerCard key={tracker?.id} trackerData={tracker} workspaceId={workspaceId!} onUpdateTracker={fetchTrackers} />
        </div>
      ))
    )
  );

  if(isLoadingArchive) {
    return <FullPageLoading /> ;
  }

  return (
    <div className='workspace-details-container'>
      <PageHeader 
        icon={<Avatar />} 
        title={workspace?.title}
      />
      {renderTrackers}
    </div>
  );
};

export default Archive;