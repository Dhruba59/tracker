import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Typography, message } from 'antd';

import TrackerCard from '@components/common/tracker/tracker-card';
import { ResponseType } from '@models/global-models';
import { CreateUpdateTrackerPayload, TRACKER_TYPE, TrackerCardInfo } from '@models/tracker';
import { createTracker, getTrackersByWorkspaceId } from '@services/tracker-service';
import { getWorkspaceById } from '@services/workspace-services';

import { PlusIcon } from '@icons';
import CreateTrackerModal from '../../../components/modal/create-tracker-modal';
import PageHeader from '@components/common/page-header';
import EmptyPageCard from '@components/common/empty-page-card';
import { FullPageLoading } from '@components/full-page-loading';
import UserAvatar from '@components/common/user-avatar';
import './workspace-details.css';

const { Text } = Typography;

const WorkspaceDetails = () => {
  const {workspaceId} = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [workspaceData, setWorkspaceData] = useState<any>();
  const [isTrackerCreateLoading, setIsTrackerCreateLoading] = useState<boolean>(false);
  const [trackers, setTrackers] = useState<any>();
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const fetchWorkspace = async () => {
    try {
      const res: ResponseType = await getWorkspaceById(workspaceId ?? '');
      setWorkspaceData(res.payload);
    } catch {
      message.error('unable to fetch workspace informations!');
    };
  };

  const fetchTrackers = async () => {
    try {
      setIsLoading(true);
      const res: ResponseType = await getTrackersByWorkspaceId({ workspaceId: workspaceId! });
      setTrackers(res.payload);
    } catch (error: any) {
      message.error('unable to fetch trackers!');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClick = () => {
    setIsTrackerModalOpen(true);
  };

  const closeModal = () => {
    setIsTrackerModalOpen(false);
    form.resetFields();
  };

  const onSubmit = async (values: any) => {
    const { title, description, date, members, type, target_start, target_end } = values;
    setIsTrackerCreateLoading(true);
    let payload: CreateUpdateTrackerPayload = {
      title: title?.trim(),
      description: description?.trim(),
      type,
      start_date: date[0]?.$d,
      end_date: date[1]?.$d,
      workspace_id: workspaceId!,
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
      fetchTrackers();
    } catch (error: any) {
      message.error(error?.message ?? 'Something went wrong!');
    } finally {
      setIsTrackerCreateLoading(false);
    }
  };

  const renderTrackers = (
    trackers?.length === 0 ? (
      <div className='workspace-empty-page'>
        <EmptyPageCard title='You have no trackers here.' buttonText='Create Tracker' onButtonClick={handleClick} />
      </div>
    ) : (
      <div className='workspace-trackers-container'>
        {trackers?.map((tracker: any) => (
          <TrackerCard key={tracker?.id} trackerData={tracker} workspaceId={workspaceData?.id} onUpdateTracker={fetchTrackers} />
        ))}
      </div>
    )
  );

  useEffect(() => {
    fetchWorkspace();
    fetchTrackers();
  }, [workspaceId]);

  if(isLoading) {
    return <FullPageLoading /> ;
  };

  return (
    <div className='workspace-details-container'>
      <PageHeader 
        icon={<UserAvatar title={workspaceData?.title}/>} 
        title={workspaceData?.title}
        buttonName='Create Tracker'
        buttonIcon={<PlusIcon />}
        onButtonClick={handleClick}
      />
      {renderTrackers} 
      <CreateTrackerModal form={form} onSubmit={onSubmit} isOpen={isTrackerModalOpen} onClose={closeModal} isCreateLoading={isTrackerCreateLoading} workspaceId={workspaceId!}/>
    </div>
  );
};

export default WorkspaceDetails;