import { useEffect, useState } from 'react';

import './archive.css';
import { getTrackersByWorkspaceId } from '@services/tracker-service';
import { useParams } from 'react-router-dom';
import { ResponseType } from '@models/global-models';
import TrackerCard from '@components/common/tracker/tracker-card';
import PageHeader from '@components/common/page-header';
import { Avatar } from 'antd';
import { getWorkspaceById } from '@services/workspace-services';
import EmptyPageCard from '@components/common/empty-page-card';

const Archive = () => {
  const [trackers, setTrackers] = useState<any>();
  const [workspace, setWorkspace] = useState<any>();
  const { workspaceId } = useParams();

  const fetchWorkspace = () => {
    getWorkspaceById(workspaceId!)
    .then((res: ResponseType) => setWorkspace(res.payload))
    .catch((error) => console.log('unable to fetch workspace'));
  };

  const fetchTrackers = () => {
    getTrackersByWorkspaceId({ workspaceId: workspaceId!, isArchived: true })
    .then((res: ResponseType) => setTrackers(res.payload))
    .catch((error) => console.log('unable to fetch archived tracker'));
  };
  
  useEffect(() => {
    fetchTrackers();
    fetchWorkspace();
  }, []);

  const renderTrackers = (
    trackers?.length === 0 ? (
    <div className='workspace-empty-page'>
      <EmptyPageCard title='You have no archive trackers for this workspace.' />
    </div>    
    ) : (
      trackers?.map((tracker: any) => (
        <div key={tracker?.id} className='workspace-trackers-container'>
          <TrackerCard trackerData={tracker} workspaceId={workspaceId!} onUpdateTracker={fetchTrackers} />
        </div>
      ))
    )
  );

  return (
    <div className='workspace-details-container'>
      <PageHeader 
        icon={<Avatar />} 
        title={workspace?.title}
        // buttonName='Create Tracker'
        // buttonIcon={<PlusIcon />}
        // onButtonClick={handleClick}
      />
      {renderTrackers} 
      {/* <CreateTrackerModal form={form} onSubmit={onSubmit} isOpen={isTrackerModalOpen} onClose={closeModal} workspaceId={id!}/> */}
    </div>
  );
};

export default Archive;