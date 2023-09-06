import { useState } from 'react';
import { Form, Modal, Popover, Progress } from 'antd';

import { MilestoneBarIcon } from '@icons';
import { TRACKER_TYPE, TrackerProgressbarProps } from '@models/tracker';
import './tracker-progressbar.css';
import TextInput from '../../input-fields/text-input';
import AppPopover from '@components/common/pop-over';
import TaskItem from '@components/common/tracker/task-item/task-item';
import { CalculateMilestonePercent } from '@helpers/global-helpers';
import { getTasks } from '@services/task-service';
import { GetTasksPayload, TASK_TYPE } from '@models/task';
import { ResponseType } from '@models/global-models';
import TaskPopoverContent from './task-popover-content';

const TrackerProgressbar = ({ tracker, progressPercent, milestones, onUpdateTracker }: TrackerProgressbarProps) => {
  const handleMilestoneUpdate = () => {
    console.log('update milestone!');
  };

  console.log('refetch tracker progressbar', tracker);

  const milestonesPosition: number[] = milestones?.map((milestone: any) => {
    return (CalculateMilestonePercent(tracker?.start_date, tracker?.end_date, milestone.created_at));
  }) || [];

  const renderNumericContent = (milestoneId: string) => (
    <Form>
      <Form.Item name='target' rules={[{ required: true, message: 'Value required!' }]}>
        <TextInput className='progress-tracker-input' />
      </Form.Item>
      <Form.Item name='date' rules={[{ required: true, message: 'Date is required!' }]}>
        <TextInput className='progress-tracker-input' type="date" onPressEnter={handleMilestoneUpdate} />
      </Form.Item>
    </Form>
  );

  const renderPopOverContent = (milestoneId: string) => (
    tracker?.type === TRACKER_TYPE.TASK ? 
      <TaskPopoverContent tracker={tracker} milestoneId={milestoneId} onUpdateTracker={onUpdateTracker}/> : 
      renderNumericContent(milestoneId)
  );

  return (
    <div className="progress-container">
      <Progress className='progress-bar' percent={progressPercent} showInfo={false} />
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
              content={() => renderPopOverContent(milestone?.id)}
              mouseLeaveDelay={1}
              >
                <MilestoneBarIcon />
            </AppPopover>
          </div>
      ))}
    </div>
  );
};

export default TrackerProgressbar;