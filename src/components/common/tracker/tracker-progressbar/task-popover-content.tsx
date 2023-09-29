import { Divider, Form, message } from 'antd';
import { useState, useEffect, Fragment } from 'react';

import { GetTasksPayload, TASK_TYPE, UpdateTaskPayload } from '@models/task';
import { deleteTask, getTasks, updateTask } from '@services/task-service';
import TaskItem from '../task-item';
import { ResponseType } from '@models/global-models';
import TextInput from '@components/common/input-fields/text-input';
import { TRACKER_TYPE } from '@models/tracker';
import { updateMilestone } from '@services/milestone-service';
import { REGEX } from '@constants/global-constants';
import './task-popover-content.css';
export interface MilestonePopoverContentProps {
  milestone: any;
  tracker: any;
  onUpdateTracker: () => void;
};

const TaskPopoverContent = ({ milestone, tracker, onUpdateTracker }: MilestonePopoverContentProps) => {
  const [tasks, setTasks] = useState<any>();
  const [form] = Form.useForm();
  const [numericForm] = Form.useForm();

  const fetchTasks = () => {
    const payload: GetTasksPayload = {
      task_type: TASK_TYPE.MILESTONE,
      tracker_id: tracker?.id,
      milestone_id: milestone?.id
    };
    getTasks(payload)
      .then((res: ResponseType) => setTasks(res.payload))
      .catch((error) => { 
        message.error('unable to fetch milestone tasks');
      });
  };

  const onTaskUpdate = (id: string, payload: Omit<UpdateTaskPayload, 'tracker_id'>) => {
    const newPayload: UpdateTaskPayload = {
      ...payload,
      tracker_id: tracker?.id,
      milestone_id: milestone?.id
    };
    updateTask(id, newPayload)
      .then((res: ResponseType) => {
        message.success(res?.message ?? 'Successfully updated');
        fetchTasks();
        onUpdateTracker();
      })
      .catch((error: any) => message.error(error?.message ?? 'Unable to update'));
  };

  const onTaskDelete = (id: string) => {
    deleteTask(id)
      .then((res: ResponseType) => {
        message.success(res?.message ?? 'Successfully Deleted');
        fetchTasks();
      })
      .catch((error: any) => message.error(error?.message ?? 'Unable to update'));
  };

  const handleTargetAchieve = (e: any) => {
    updateMilestone(milestone?.id, { achieved_target: e.target.value, tracker_type: tracker?.type })
    .then((res: ResponseType) => {
      message.success(res?.message ?? 'Updated Milestone!');
      onUpdateTracker();
      numericForm.resetFields();
    }).catch((error: any) => message.error(error?.message ?? 'Unable to update!'));
  };

  useEffect(() => {
    fetchTasks();
  }, [tracker]);

  return (
    <div className='progress-popover-container'>
      <p>{tracker?.type === TRACKER_TYPE.TASK ? 'Task' : 'Target'}</p>
      <Divider />
      <div className='progress-popover-body'>
        {tracker?.type === TRACKER_TYPE.TASK ? (
          <Fragment>
            {tasks && tasks.map((task: any, index: number) => (
              <TaskItem
                key={index}
                task={task}
                onTaskDelete={onTaskDelete}
                onTaskUpdate={onTaskUpdate}
                form={form}
              />
            ))}
          </Fragment>
        ) : (
            <Form form={numericForm}>
              <div className='progress-popover-target'>Target: {milestone?.target_value}</div>
              <Form.Item
                name='target'
                rules={[
                  { required: true, message: 'Value required!' },
                  { pattern: REGEX.NUMBERS, message: 'Invalid numbers' }
                ]}>
                <TextInput onPressEnter={(e) => {
                  if (numericForm.getFieldError('target') && numericForm.getFieldError('target').length === 0) {
                    handleTargetAchieve(e);
                  }
                }} className='progress-popover-input' placeholder='Input value' />
              </Form.Item>
            </Form>
        )}
      </div>
    </div>
  );
};

export default TaskPopoverContent;