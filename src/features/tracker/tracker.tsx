import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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


const TrackerDetails = () => {
  const { workspaceId, trackerId } = useParams();
  const [activities, setActivities] = useState<any>();
  const [tracker, setTracker] = useState<any>();

  const fetchData = async () => {
    try {
      const res: ResponseType = await getTrackerById(trackerId!);
      setTracker(res.payload);
      const activities: ResponseType = await getEventLogByTrackerId(trackerId!);
      setActivities(activities.payload);
    } catch (error: any) {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const activities: ResponseType = await getEventLogByTrackerId(id ?? '');
  //     setActivities(activities);
  //   } catch (error: any) {
  //     console.log(error?.message);
  //   };
  // };
  
  // useEffect(() => {
  //   // fetchData(); 
  //   getEventLogByTrackerId(id ?? '').then((res: ResponseType) => setActivities(res.payload));
  // }, []);
  

  const breadCumbItems = [
    {
      title: <a href={`${routes.workspace.path}/${workspaceId}`}>Workspace</a>,
    },
    {
      title: <a href={`${routes.workspace.path}/${workspaceId}/${routes.tracker.path}/${tracker?.id}`}>{tracker?.title}</a>,
    },
  ];

  return (
    <div className='tracker-details-container'>
      <Breadcrumb
        items={breadCumbItems}
      />
      {tracker && <TrackerCard trackerData={tracker} workspaceId={workspaceId!}/>}
      <Row className='tracker-details-row-2' gutter={16}>
        <Col span={8}>
          <TaskBar tracker={tracker}/>
        </Col>
        <Col span={8}>
          <MilestoneBar trackerId={tracker?.id} milestones={tracker?.milestones} refetchTracker={fetchData}/>
        </Col>
        <Col span={8}>
          <ActivityBar activities={activities}/>
        </Col>
      </Row>
    </div>
  );
};

export default TrackerDetails;