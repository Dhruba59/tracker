import { useState } from 'react';
import { Form, Modal, Popover, Progress } from 'antd';

import { DefaultMilestoneBarIcon, GreenMilestoneBarIcon, RedMilestoneBarIcon, YellowMilestoneBarIcon } from '@icons';
import { TRACKER_TYPE, TrackerProgressbarProps, TrackerStatusEnum } from '@models/tracker';
import './tracker-progressbar.css';
import TextInput from '../../input-fields/text-input';
import AppPopover from '@components/common/pop-over';
import TaskItem from '@components/common/tracker/task-item/task-item';
import { CalculateMilestonePercent } from '@helpers/global-helpers';
import { getTasks } from '@services/task-service';
import { GetTasksPayload, TASK_TYPE } from '@models/task';
import { ResponseType } from '@models/global-models';
import TaskPopoverContent from './task-popover-content';
import { MilestoneStatusEnum } from '@models/milestone';

export const PROGRESS_COLOR = {
  COMPLETED:  '#82E57B',
  OVERDUE: '#FF6231',
  IN_PROGRESS: '#FFA800',
  NOT_STARTED: '#E6E7EC'
};

const TrackerProgressbar = ({ tracker, progressPercent, milestones, onUpdateTracker }: TrackerProgressbarProps) => {
  const handleMilestoneUpdate = () => {
    console.log('update milestone!');
  };

  const milestonesPosition: number[] = milestones?.map((milestone: any) => {
    return (CalculateMilestonePercent(tracker?.start_date, tracker?.end_date, milestone.end_date));
  }) || [];

  const getProgressColor = () => {
    switch(tracker?.progress_status){
      case TrackerStatusEnum.COMPLETED:
        return PROGRESS_COLOR.COMPLETED;
      case TrackerStatusEnum.IN_PROGRESS:
        return PROGRESS_COLOR.IN_PROGRESS;
      case TrackerStatusEnum.OVERDUE:
        return PROGRESS_COLOR.OVERDUE;
      case TrackerStatusEnum.NOT_STARTED:
        return PROGRESS_COLOR.NOT_STARTED;
      default:
        return PROGRESS_COLOR.NOT_STARTED;
    }
  };
  
  const renderMilestoneIcon = (progressStatus: MilestoneStatusEnum) => {
    switch(progressStatus){
      case MilestoneStatusEnum.COMPLETED:
        return <GreenMilestoneBarIcon />;
      case MilestoneStatusEnum.IN_PROGRESS:
        return <YellowMilestoneBarIcon />;
      case MilestoneStatusEnum.OVERDUE:
        return <RedMilestoneBarIcon />;
      case MilestoneStatusEnum.NOT_STARTED:
        return <DefaultMilestoneBarIcon />;
      default:
        return <DefaultMilestoneBarIcon /> ;
    };
  };
  console.log(milestonesPosition);

  return (
    <div className="progress-container">
      <Progress 
        className='progress-bar' 
        strokeColor={getProgressColor()} 
        percent={progressPercent} 
        showInfo={false} />
        {milestones?.map((milestone: any, index: number) => (
        <div 
          key={milestone?.id} 
          className='progress-stop-point'   
          style={{ left: `${milestonesPosition[index]}%` }}
          >
            <AppPopover 
              className='progress-tracker-tasks-popup' 
              // title="Tasks" 
              closeIcon
              content={() => <TaskPopoverContent tracker={tracker} milestone={milestone} onUpdateTracker={onUpdateTracker} />}
              >
                <div style={{
                  marginLeft: milestonesPosition[index] < 5 ? '4px': '', 
                  marginRight: milestonesPosition[index] > 95 ? '4px': ''}}
                  >
                  {renderMilestoneIcon(milestone?.progress_status)}
                </div>
                
            </AppPopover>
          </div>
      ))}
    </div>
  );
};

export default TrackerProgressbar;