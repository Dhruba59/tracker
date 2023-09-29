import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Breadcrumb, Col, Row, message } from 'antd';

import TrackerCard from '@components/common/tracker/tracker-card';
import TaskBar from './task-bar';
import MilestoneBar from './milestone-bar';
import ActivityBar from './activity-bar';
import { routes } from '@constants/route-constants';
import { ResponseType } from '@models/global-models';
import { getEventLogByTrackerId } from '@services/event-service';
import { getTrackerById } from '@services/tracker-service';
import { getWorkspaceById } from '@services/workspace-services';
import { dragAndDropPatch } from '@services/task-service';
import { DragDropPayload, TASK_TYPE } from '@models/task';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { FullPageLoading } from '@components/full-page-loading';
import './tracker.css';

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
      message.error('unable to fetch informations!');
    };
  };

  const fetchTrackerData = async () => {
    try {
      const res: ResponseType = await getTrackerById(trackerId!);
      setTracker(res.payload);
      const activities: ResponseType = await getEventLogByTrackerId(trackerId!);
      setActivities(activities.payload);
    } catch (error: any) {
      message.error('unable to fetch tracker informations!');
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

    dragAndDropPatch(draggableId, payload).then(() => {
      fetchTrackerData();
    }).catch(err => message.error('unable to fetch trackers informations!'));
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
      <div style={{display:'flex', gap: '10px', overflow: 'scroll', height: '100%'}} className='hide-scrollbar'>
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskBar tracker={tracker} refetchTracker={fetchTrackerData} />
          <MilestoneBar 
            tracker={tracker} 
            milestones={tracker?.milestones} 
            refetchTracker={fetchTrackerData} />
        </DragDropContext>
        <ActivityBar activities={activities} />
      </div>
    </div>
  );
};

export default Tracker;