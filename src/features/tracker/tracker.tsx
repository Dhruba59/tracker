import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Breadcrumb, Col, Row } from 'antd';
import TrackerCard from '@components/common/tracker/tracker-card';
import { tracker } from '@helpers/global-helpers';
import TaskBar from './task-bar';
import MilestoneBar from './milestone-bar';
import ActivityBar from './activity-bar';
import { routes } from '@constants/route-constants';
import './tracker.css';
import { ResponseType } from '@models/global-models';
import { getEventLogByTrackerId } from '@services/event-service';
import { getTrackerById } from '@services/tracker-service';
import { getWorkspaceById } from '@services/workspace-services';


const Tracker = () => {
  const { workspaceId, trackerId } = useParams();
  const [activities, setActivities] = useState<any>();
  const [tracker, setTracker] = useState<any>();
  const [workspace, setWorkspace] = useState<any>();

  const fetchWorkspaceData = async () => {
    try {
      const res: ResponseType = await getWorkspaceById(workspaceId!);
      setWorkspace(res.payload);
    } catch (error: any) {
      console.log('error');
    };
  };

  const fetchTrackerData = async () => {
    try {
      const res: ResponseType = await getTrackerById(trackerId!);
      setTracker(res.payload);
      const activities: ResponseType = await getEventLogByTrackerId(trackerId!);
      setActivities(activities.payload);
    } catch (error: any) {
      console.log('error');
    };
  };

  const onUpdateTracker = () => {
    fetchTrackerData();
  };

  useEffect(() => {
    fetchTrackerData();
    fetchWorkspaceData();
  }, []);

  const breadCumbItems = [
    {
      title: <a href={`${routes.workspace.path}/${workspaceId}`}>{workspace?.title}</a>,
    },
    {
      title: <a style={{color: '#000000D9'}} href={`${routes.workspace.path}/${workspaceId}/${routes.tracker.path}/${tracker?.id}`}>{tracker?.title}</a>,
    },
  ];

  console.log('refetch tracker', tracker);

  return (
    <div className='tracker-details-container'>
      <Breadcrumb
        items={breadCumbItems}
      />
      {tracker &&
        <TrackerCard
          trackerData={tracker}
          workspaceId={workspaceId!}
          onUpdateTracker={onUpdateTracker}
        />}
      <Row className='tracker-details-row-2' gutter={16}>
        <Col span={8}>
          <TaskBar tracker={tracker} refetchTracker={fetchTrackerData}/>
        </Col>
        <Col span={8}>
          <MilestoneBar tracker={tracker} milestones={tracker?.milestones} refetchTracker={fetchTrackerData}/>
        </Col>
        <Col span={8}>
          <ActivityBar activities={activities} />
        </Col>
      </Row>
    </div>
  );
};

export default Tracker;