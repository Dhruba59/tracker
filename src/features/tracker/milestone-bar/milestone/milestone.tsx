import TextInput from '@components/common/input-fields/text-input';
import TaskItem from '@features/tracker/task-bar/task-item/task-item';
import { Collapse, DatePicker, Typography } from 'antd';
import { useState } from 'react';

import './milestone.css';
import AppCollapse from '@components/common/collapse';
import AppButton from '@components/common/button';

const { Text } = Typography;
const { RangePicker } = DatePicker;

export interface MilestoneProps {
  milestone: string;
}



const Milestone = ({ milestone }: MilestoneProps) => {
  const [isTaskInputOpen, setIsTaskInputOpen] = useState<boolean>(false);

  const handleTaskAdd = (e: any) => {
    //add task
    e.target.value = '';
    setIsTaskInputOpen(false);
  };

  return (
  <AppCollapse label={milestone} key={milestone}>
    <div className='milestone-container'>
      <div className='milestone-row-1'>
        <Text className='milestone-title'>Tasks</Text>
        <RangePicker size='small' className='milestone-datepicker'/>
      </div>
      <div className='milestone-row-2'>
        <TaskItem task='ssss'/>
        <TaskItem task='ssss'/>
        <TaskItem task='ssss'/>
        <TaskItem task='ssss'/>
        <TaskItem task='ssss'/>
        <AppButton className='milestone-task-add-btn' type='link' onClick={() => setIsTaskInputOpen(true)}>+ Add New</AppButton>
        {isTaskInputOpen && <TextInput className='milestone-task-add-input' onPressEnter={handleTaskAdd}/>}
      </div>
    </div>
  </AppCollapse>
  );
};

export default Milestone;