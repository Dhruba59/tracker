import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TrackerCard from '@components/common/tracker/tracker-card';
import { ResponseType } from '@models/global-models';
import { CreateUpdateTrackerPayload, TRACKER_TYPE, TrackerCardInfo } from '@models/tracker';
import { createTracker, getTrackersByWorkspaceId } from '@services/tracker-service';
import { getWorkspaceById } from '@services/workspace-services';
import './workspace-details.css';
import { Avatar, Form, Typography, message } from 'antd';
import AppButton from '@components/common/button';
import { PlusIcon } from '@icons';
import { tracker } from '@helpers/global-helpers';
import AppModal from '@components/common/modal';
import CreateTrackerModal from '../../../components/modal/create-tracker-modal';
import PageHeader from '@components/common/page-header';
import EmptyPageCard from '@components/common/empty-page-card';

const { Text } = Typography;

const WorkspaceDetails = () => {
  const {id} = useParams();
  const [workspaceData, setWorkspaceData] = useState<any>();
  const [trackers, setTrackers] = useState<any>();
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const fetchWorkspace = async () => {
    try {
      const res: ResponseType = await getWorkspaceById(id ?? '');
      setWorkspaceData(res.payload);
    } catch {
      console.log('error');
    };
  };

  const fetchTrackers = async () => {
    try {
      const res: ResponseType = await getTrackersByWorkspaceId({ workspaceId: id! });
      setTrackers(res.payload);
    } catch (error: any) {
      console.log('errors');
    }
  };
  
  const handleClick = () => {
    setIsTrackerModalOpen(true);
  };

  const closeModal = () => {
    setIsTrackerModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    const { title, description, date, members, type, target_start, target_end } = values;
    console.log(values);
    let payload: CreateUpdateTrackerPayload = {
      title,
      description,
      type,
      start_date: date[0].$d,
      end_date: date[1].$d,
      workspace_id: id!,
      user_ids: members
    };
    if(type === TRACKER_TYPE.NUMERIC) {
      payload = {...payload , target_start, target_end};
    };
   
    try {
      const res: ResponseType = await createTracker(payload);
      message.success(res?.message ?? 'Tracker created!');
      closeModal();
      form.resetFields();
      // fetchWorkspace();
      fetchTrackers();
    } catch (error: any) {
      message.error(error?.message ?? 'Something went wrong!');
    }
  };

  const renderTrackers = (
    trackers?.length === 0 ? (
    <div className='workspace-empty-page'>
      <EmptyPageCard title='You have no trackers here.' buttonText='Create Tracker' onButtonClick={handleClick} />
    </div>    
    ) : (
      trackers?.map((tracker: any) => (
        <div className='workspace-trackers-container'>
          <TrackerCard key={tracker?.id} trackerData={tracker} workspaceId={workspaceData?.id} onUpdateTracker={fetchTrackers}/>
        </div>
     ))
    )
  );

  useEffect(() => {
    fetchWorkspace();
    fetchTrackers();
  }, [id]);

  return (
    <div className='workspace-details-container'>
      <PageHeader 
        icon={<Avatar />} 
        title={workspaceData?.title}
        buttonName='Create Tracker'
        buttonIcon={<PlusIcon />}
        onButtonClick={handleClick}
      />
      {renderTrackers} 
      <CreateTrackerModal form={form} onSubmit={onSubmit} isOpen={isTrackerModalOpen} onClose={closeModal} workspaceId={id!}/>
    </div>
  );
};

export default WorkspaceDetails;