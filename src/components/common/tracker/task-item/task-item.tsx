import React, { useState, useEffect, useRef } from 'react';
import { Form, Typography, message } from 'antd';
import { DeleteIcon, DotIcon, EditIcon } from '@icons';
import CheckboxInput from '@components/common/input-fields/checkbox';
import TextInput from '@components/common/input-fields/text-input';
import { TASK_TYPE, TaskItemProps, TaskStatusEnum, UpdateTaskPayload } from '@models/task';
import './task-item.css';

const { Text } = Typography;

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const taskItemRef = useRef<HTMLDivElement | null>(null);
  // const [isChecked, setIsChecked] = useState<boolean>(false);

  const [form] = Form.useForm();

  const handleTaskUpdate = (e: any) => {
    console.log(e.target.value);
    const payload = {
      title: e.target.value,
    };
    onTaskUpdate(task.id, payload);
    setIsInputOpen(false);
  };

  const handleTaskDelete = () => {
    onTaskDelete(task.id);
  };

  const handleEditClick = (event: React.MouseEvent) => {
    setIsInputOpen(true);
  };

  const handleOnMouseLeave = () => {
    setIsMouseOver(false);
    setIsInputOpen(false);
  };

  const handleCheckbox = (e: any) => {
    const payload = {
      task_type: TASK_TYPE.TRACKER,
      is_done: e.target.checked ? TaskStatusEnum.DONE : TaskStatusEnum.PENDING
    };
    // setIsChecked(e.target.checked);
    onTaskUpdate(task.id, payload);

  };

  useEffect(() => {
    form.setFieldValue('task-name', task.title);
  }, [task]);

  // TODO
  // const handleClickOutside = (event: MouseEvent) => {
  //   if (taskItemRef.current && !taskItemRef.current.contains(event.target as Node)) {
  //     setIsMouseOver(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  return (
    <div
      className='task-item-container'
      ref={taskItemRef}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={handleOnMouseLeave}
    >
      <DotIcon />
      <CheckboxInput checked={task?.is_done} onChange={handleCheckbox} />
      {!isInputOpen && (
        <Text style={{
          textDecoration: task?.is_done ? 'line-through' : '',
          opacity: task?.is_done ? '.6' : '1'
        }}
        >{task?.title}</Text>
      )}
      
      {isInputOpen && 
        <Form form={form}>
          <Form.Item name='task-name'>
            <TextInput className='task-item-input' onPressEnter={handleTaskUpdate}/>
          </Form.Item>
        </Form>
      }
      {isMouseOver && !isInputOpen && (
        <>
          <EditIcon onClick={handleEditClick} style={{cursor: 'pointer'}}/>
          <DeleteIcon onClick={handleTaskDelete} style={{cursor: 'pointer'}}/>
        </>
      )}
      
      {
      // TODO
      /* <Paragraph
        className=''
        editable={{
          icon: paragraphIcons,
          tooltip: 'click to edit text',
          onChange: handleTaskUpdate,
          editing: isInputOpen
        }}
      >
        {task}
      </Paragraph> */}
    </div>
  );
};

export default TaskItem;
