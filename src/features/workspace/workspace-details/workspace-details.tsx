import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TrackerCard from '@components/common/tracker/tracker-card';
import { ResponseType } from '@models/global-models';
import { TrackerCardInfo } from '@models/tracker';
import { getTrackersByWorkspaceId } from '@services/tracker-service';
import { getWorkspaceById } from '@services/workspace-services';
import './workspace-details.css';
import { Avatar, Typography } from 'antd';
import { workerData } from 'worker_threads';
import AppButton from '@components/common/button';
import { PlusIcon } from '@icons';
import { tracker } from '@helpers/global-helpers';
import AppModal from '@components/common/modal';
import CreateTrackerModal from './create-tracker-modal';
import PageHeader from '@components/common/page-header';

const { Text } = Typography;

const WorkspaceDetails = () => {
  const {id} = useParams();
  const [workspaceData, setWorkspaceData] = useState<any>();
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState<boolean>(false);

  const fetchWorkspaceTrackers = async () => {
    try {
      const res: ResponseType = await getWorkspaceById(id ?? '');
      setWorkspaceData(res.payload);
    } catch {
      console.log('error');
    };
  };
  
  const handleClick = () => {
    setIsTrackerModalOpen(true);
  };

  const onCloseModal = () => {
    setIsTrackerModalOpen(false);
  };

  useEffect(() => {
    fetchWorkspaceTrackers();
  }, [id]);

  return (
    <div className='workspace-details-container'>
      <PageHeader 
        icon={<Avatar />} 
        title='Workspace Name'
        buttonName='Create Tracker'
        buttonIcon={<PlusIcon />}
        onButtonClick={handleClick}
      />
      <div className='workspace-trackers-container'>
        <TrackerCard tracker={tracker}/>
        <TrackerCard tracker={tracker}/>
        <TrackerCard tracker={tracker}/>
      </div> 
      <CreateTrackerModal isOpen={isTrackerModalOpen} onClose={onCloseModal} />
    </div>
  );
};

export default WorkspaceDetails;