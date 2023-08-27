import { useState } from 'react';
import { Form, Modal, Popover, Progress } from 'antd';

import { MilestoneBarIcon } from '@icons';
import { TRACKER_TYPE, TrackerProgressbarProps } from '@models/tracker';
import './tracker-progressbar.css';
import TextInput from '../../input-fields/text-input';
import AppPopover from '@components/common/pop-over';
import TaskItem from '@features/tracker/task-bar/task-item/task-item';

const TrackerProgressbar = ({ type, breakPoints, progressPercent }: TrackerProgressbarProps) => {
  const handleMilestoneUpdate = () => {
    console.log('update milestone!');
  };

  const taskContent = (
    <div className='progress-popover-container'>
      <TaskItem task='sdsdfsd'/>
      <TaskItem task='sdsdfsd'/>
      <TaskItem task='sdsdfsd'/>
      <TaskItem task='sdsdfsd'/>
    </div>
  );

  const numericContent = (
    <Form>
      <Form.Item name='target' rules={[{ required: true, message: 'Value required!' }]}>
        <TextInput className='progress-tracker-input' />
      </Form.Item>
      <Form.Item name='date' rules={[{ required: true, message: 'Date is required!' }]}>
        <TextInput className='progress-tracker-input' type="date" onPressEnter={handleMilestoneUpdate} />
      </Form.Item>
    </Form>
  );

  const popOverContent = (
   type === TRACKER_TYPE.TASK ? taskContent : numericContent
  );

  return (
    <div className="progress-container">
      <Progress className='progress-bar' percent={progressPercent} showInfo={false} />
      {breakPoints?.map((point: number) => (
        <div 
          key={point} 
          className='progress-stop-point'   
          style={{ left: `${point}%` }}
          >
            <AppPopover 
              className='progress-tracker-tasks-popup' 
              title="Tasks" 
              closeIcon
              content={popOverContent}
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