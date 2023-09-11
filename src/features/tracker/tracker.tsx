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
import { dragAndDropPatch } from '@services/task-service';
import { DragDropPayload, TASK_TYPE } from '@models/task';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { FullPageLoading } from '@components/full-page-loading';


const Tracker = () => {
  const { workspaceId, trackerId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      // setIsLoading(true);
      const res: ResponseType = await getTrackerById(trackerId!);
      setTracker(res.payload);
      const activities: ResponseType = await getEventLogByTrackerId(trackerId!);
      setActivities(activities.payload);
    } catch (error: any) {
      console.log('error');
    } finally {
      // setIsLoading(false);
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
      title: <a style={{color: '#000000D9'}} href={`${routes.workspace.path}/${workspaceId}/tracker/${tracker?.id}`}>{tracker?.title}</a>,
    },
  ];

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination, draggableId } = result;
    console.log(source, destination, draggableId);
    if (!destination || (source?.droppableId === destination?.droppableId)) {
      // The item was dropped outside of valid drop targets
      return;
    }

    let payload: Partial<DragDropPayload> = {
      task_type: source?.droppableId === 'task-drop' ? TASK_TYPE.MILESTONE : TASK_TYPE.TRACKER,
      tracker_id: tracker?.id
    };


    if (destination?.droppableId !== 'task-drop') {
      payload = {
        ...payload,
        milestone_id: destination?.droppableId
      };
    }
    console.log(payload);

    dragAndDropPatch(draggableId, payload).then(() => {
      fetchTrackerData();
    }).catch(err => console.log(err));
  };

  if(isLoading) {
    return <FullPageLoading />;
  };

  return (
    <div className='tracker-details-container'>
      <Breadcrumb items={breadCumbItems}/>
      {tracker &&
        <TrackerCard
          trackerData={tracker}
          workspaceId={workspaceId!}
          onUpdateTracker={onUpdateTracker}
        />}
      <div style={{display:'flex', gap: '10px', overflow: 'scroll'}} className='hide-scrollbar'>
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskBar tracker={tracker} refetchTracker={fetchTrackerData} />
          <MilestoneBar 
            tracker={tracker} 
            milestones={tracker?.milestones} 
            refetchTracker={fetchTrackerData} />
        </DragDropContext>
        <ActivityBar activities={activities} />
      </div>
      {/* <Row className='tracker-details-row-2' gutter={16}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Col span={8}>
            <TaskBar tracker={tracker} refetchTracker={fetchTrackerData} />
          </Col>
          <Col span={8}>
            <MilestoneBar tracker={tracker} milestones={tracker?.milestones} refetchTracker={fetchTrackerData} />
          </Col>
        </DragDropContext>
        <Col span={8}>
          <ActivityBar activities={activities} />
        </Col>
      </Row> */}
    </div>
  );
};

export default Tracker;