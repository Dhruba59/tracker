import React, { useState, useEffect, useRef } from 'react';
import { Typography } from 'antd';
import { DeleteIcon, DotIcon, EditIcon } from '@icons';
import CheckboxInput from '@components/common/input-fields/checkbox';
import TextInput from '@components/common/input-fields/text-input';
import { TaskItemProps } from '@models/tracker';
import './task-item.css';

const { Text } = Typography;

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const taskItemRef = useRef<HTMLDivElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleTaskUpdate = (e: any) => {
    console.log(e.target.value);
    setIsInputOpen(false);
  };

  const handleEditClick = (event: React.MouseEvent) => {
    setIsInputOpen(true);
  };

  const handleOnMouseLeave = () => {
    setIsMouseOver(false);
    setIsInputOpen(false);
  };

  const handleDelteClick = () => {
    console.log('deleted');
  };

  console.log('rerendering');

  const handleCheckbox = (e: any) => {
    setIsChecked(e.target.checked);
  };

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
      <CheckboxInput onChange={handleCheckbox} />
      {!isInputOpen && (
        <Text style={{textDecoration: isChecked ? 'line-through' : ''}}>{task}</Text>
      )}
      
      {isInputOpen && <TextInput className='task-item-input' onPressEnter={handleTaskUpdate}/>}
      {isMouseOver && !isInputOpen && (
        <>
          <EditIcon onClick={handleEditClick} />
          <DeleteIcon onClick={handleDelteClick}/>
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
