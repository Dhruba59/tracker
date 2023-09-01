import TextInput from '@components/common/input-fields/text-input';
import TaskItem from '@features/tracker/task-bar/task-item/task-item';
import { Collapse, CollapsePanelProps, DatePicker, Form, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import './milestone.css';
import AppCollapse from '@components/common/collapse';
import AppButton from '@components/common/button';
import { getMilestoneById } from '@services/milestone-service';
import { ResponseType } from '@models/global-models';
import { error } from 'console';
import { CreateOrUpdateMilestonePayload } from '@models/milestone';
import { createTask, deleteTask, getTasks, updateTask } from '@services/task-service';
import { CreateTaskPayload, TASK_TYPE, TaskStatusEnum, UpdateTaskPayload } from '@models/task';
import { ArrowDown, ArrowUp } from '@icons';

const { Text } = Typography;
const { RangePicker } = DatePicker;

export interface MilestoneProps {
  newMilestoneTitle?: string;
  trackerId: string;
  milestoneData?: any;
  updateMilestone: (id:string, values: CreateOrUpdateMilestonePayload) => void;
  createMilestone: (values: CreateOrUpdateMilestonePayload) => Promise<ResponseType>;
};

const Milestone = ({ milestoneData, createMilestone, updateMilestone, trackerId, newMilestoneTitle }: MilestoneProps) => {
  const [milestone, setMilestone] = useState<any>(milestoneData);
  const [isTaskInputOpen, setIsTaskInputOpen] = useState<boolean>(false);
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null!);
  const [tasks, setTasks] = useState<any>();
  const [taskItemForm] = Form.useForm();

  const fetchTasks = () => {
    getTasks({
      tracker_id: trackerId,
      task_type: TASK_TYPE.MILESTONE,
      milestone_id: milestone?.id
    }).then((res: ResponseType) => setTasks(res.payload))
      .catch((error: any) => message.error('unable to load tasks'));
  };

  useEffect(() => {
    setMilestone(milestoneData);
  }, [milestoneData]);

  useEffect(() => {
    if(milestone) {
      setSelectedDateRange([
        dayjs(milestone?.start_date, 'YYYY/MM/DD'), 
        dayjs(milestone?.end_date, 'YYYY/MM/DD')]);
    }
    
    fetchTasks();
  }, [milestone]);

  const handleTaskAdd = (e: any) => {
    //add task
    const payload: CreateTaskPayload = {
      title: e.target.value,
      tracker_id: trackerId,
      milestone_id: milestone?.id,
      is_done: TaskStatusEnum.PENDING,
      task_type: TASK_TYPE.TRACKER,
    };
    createTask(payload)
      .then((res: ResponseType) => {
        message.success('Successfully added');
        fetchTasks();
        setIsTaskInputOpen(false);
        e.target.value = '';
      })
      .catch(error => message.error('Unable to create1'));
  };

  const onTaskDelete = (id: string) => {
    deleteTask(id)
      .then((res: ResponseType) => {
        message.success(res.message ?? 'Successfully Deleted!');
        fetchTasks();
      })
      .catch((error: any) => message.error('Unable to delete!'));
  };

  const onTaskUpdate = (id: string, payload: Omit<UpdateTaskPayload, 'tracker_id'>) => {
    const newPayload = { ...payload, tracker_id: trackerId };
    updateTask(id, newPayload)
      .then((res: ResponseType) => {
        message.success(res.message ?? 'Successfully Updated!');
        fetchTasks();
        setIsTaskInputOpen(false);
      })
      .catch((error: any) => message.error('Unable to Update!'));
  };

  const handleDateChange = async (date: any) => {
    setSelectedDateRange([
      dayjs(new Date(date[0].$d).toISOString(), 'YYYY/MM/DD'), 
      dayjs(new Date(date[1].$d).toISOString(), 'YYYY/MM/DD')
    ]);
    const payload: any = {
      start_date: new Date(date[0].$d),
      end_date: new Date(date[1].$d)
    };
    if(milestone) {
      updateMilestone(milestone?.id, payload);
    } else {
      const res = await createMilestone(payload);
      console.log('res', res);
      setMilestone(res.payload);
    };
  };

  return (
    <AppCollapse 
      label={milestone?.title ?? newMilestoneTitle} 
      key={milestone?.id ?? ''} 
      expandIcon={(panelProps: any) => (panelProps.isActive ? <ArrowUp/> : <ArrowDown />)}
      expandIconPosition='right'
      >
      <div className='milestone-container'>
        <div className='milestone-row-1'>
          <Text className='milestone-title'>Tasks</Text>
          <RangePicker size='small' value={selectedDateRange} className='milestone-datepicker' onChange={handleDateChange}/>
        </div>
        <div className='milestone-row-2'>
          {tasks?.map((task: any) => (
            <TaskItem form={taskItemForm} task={task} onTaskDelete={onTaskDelete} onTaskUpdate={onTaskUpdate}/>
          ))}
          <AppButton className='milestone-task-add-btn' type='link' onClick={() => setIsTaskInputOpen(true)}>+ Add New</AppButton>
          {isTaskInputOpen && <TextInput className='milestone-task-add-input' onPressEnter={handleTaskAdd}/>}
        </div>
      </div>
    </AppCollapse>
  );
};

export default Milestone;