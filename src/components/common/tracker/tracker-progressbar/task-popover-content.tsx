import { GetTasksPayload, TASK_TYPE, UpdateTaskPayload } from '@models/task';
import { deleteTask, getTasks, updateTask } from '@services/task-service';
import { Divider, Form, message } from 'antd';
import { useState, useEffect } from 'react';
import TaskItem from '../task-item';
import { ResponseType } from '@models/global-models';
import './task-popover-content.css';

export interface MilestonePopoverContentProps {
  milestoneId: string;
  tracker: any;
  onUpdateTracker: () => void;
};

const TaskPopoverContent = ({ milestoneId, tracker, onUpdateTracker } : MilestonePopoverContentProps) => {
  const [tasks, setTasks] = useState<any>();
  const [form] = Form.useForm();

  const fetchTasks = () => {
    const payload: GetTasksPayload = {
      task_type: TASK_TYPE.MILESTONE,
      tracker_id: tracker?.id,
      milestone_id: milestoneId
    };
    getTasks(payload)
    .then((res: ResponseType) => setTasks(res.payload))
    .catch((error) => console.log('unable to fetch milestone tasks'));
  };

  const onTaskUpdate = (id: string, payload: Omit<UpdateTaskPayload,'tracker_id'>) => {
    const newPayload: UpdateTaskPayload = {
      ...payload, 
      tracker_id: tracker?.id, 
      milestone_id: milestoneId
    };
    updateTask(id, newPayload)
      .then((res: ResponseType) => {
        message.success(res?.message ?? 'Successfully updated');
        fetchTasks();
        onUpdateTracker();
        // taskItemForm.setFieldValue('task-name', payload.title);
        // fetchData();
      })
      .catch((error: any) => message.error(error?.message ?? 'Unable to update'));
  };

  const onTaskDelete = (id:string) => {
    deleteTask(id)
      .then((res: ResponseType) => {
        message.success(res?.message ?? 'Successfully Deleted');
        fetchTasks();
        // taskItemForm.setFieldValue('task-name', payload.title);
        // fetchData();
      })
      .catch((error: any) => message.error(error?.message ?? 'Unable to update'));
  };

  useEffect(() => {
    fetchTasks();
  }, [tracker]);
  
  return (
    <div className='progress-popover-container'>
      <p>Tasks</p>
      <Divider />
      <div className='progress-popover-body'>
        {tasks && tasks.map((task: any) => (
          <TaskItem task={task} 
            onTaskDelete={onTaskDelete} 
            onTaskUpdate={onTaskUpdate} 
            form={form}
          />
        ))}
      </div> 
    </div>
  );
};

export default TaskPopoverContent;