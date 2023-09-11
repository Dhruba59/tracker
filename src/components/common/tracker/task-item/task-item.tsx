import React, { useState, useEffect, useRef } from 'react';
import { Form, Popconfirm, Tooltip, Typography, message } from 'antd';
import { DeleteIcon, DotIcon, EditIcon } from '@icons';
import CheckboxInput from '@components/common/input-fields/checkbox';
import TextInput from '@components/common/input-fields/text-input';
import { TASK_TYPE, TaskItemProps, TaskStatusEnum, UpdateTaskPayload } from '@models/task';
import './task-item.css';
import { REGEX } from '@constants/global-constants';

const { Text } = Typography;

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const taskItemRef = useRef<HTMLDivElement | null>(null);
  // const [isChecked, setIsChecked] = useState<boolean>(false);

  const [form] = Form.useForm();

  const handleTaskUpdate = (e: any) => {
    if(e.target.value && e.target.value.trim() !== '') {
      const payload = {
        title: e.target.value.trim(),
      };
      onTaskUpdate(task.id, payload);
      setIsInputOpen(false);
    }
  };

  const handleTaskDelete = () => {
    onTaskDelete(task.id);
    setIsDeleteModalOpen(false);
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
      <div className='task-item-drag-drop-icon'>
        <DotIcon />
      </div> 
      <CheckboxInput className='task-item-checkbox-input' checked={task?.is_done} onChange={handleCheckbox} />
      {!isInputOpen && (
        <Text style={{
          textDecoration: task?.is_done ? 'line-through' : '',
          opacity: task?.is_done ? '.6' : '1',
          textAlign: 'center',
          marginTop: '1px'
        }}
        >{task?.title}</Text>
      )}
      
      {isInputOpen && 
        <Form form={form}>
          <Form.Item name='task-name' 
            rules={[
            { required: true, message: 'Name is required.' },
            // Use a regular expression to allow only letters and spaces
            { pattern: REGEX.LETTERS_NUMBERS, message: 'Please enter a valid name.' },
        ]}>
            <TextInput autoFocus className='task-item-input' onPressEnter={handleTaskUpdate}/>
          </Form.Item>
        </Form>
      }
      {isMouseOver && !isInputOpen && (
        <>
          <Tooltip title='edit'>
            <EditIcon onClick={handleEditClick} style={{cursor: 'pointer'}}/>
          </Tooltip>
          <Tooltip title='delete' placement='bottom'>  
            <DeleteIcon style={{cursor: 'pointer'}} onClick={() => setIsDeleteModalOpen(true)}/>
          </Tooltip>    
        </>
      )}

            <Popconfirm
              open={isDeleteModalOpen}
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={handleTaskDelete}
              onCancel={() => setIsDeleteModalOpen(false)}
              okText="Yes"
              cancelText="No"
            >
            </Popconfirm>
      
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
