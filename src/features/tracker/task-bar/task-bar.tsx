import { Fragment, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { CloseIcon, CloseIcon2, DotIcon, EditIcon, PlusCircleRoundedIcon } from '@icons';
import { Button, Card, Col, DatePicker, Form, Input, Row, Typography, message } from 'antd';
import './task-bar.css';
import TextInput from '@components/common/input-fields/text-input';
import Checkbox from 'antd/es/checkbox/Checkbox';
import TaskItem from '../../../components/common/tracker/task-item';
import { createTask, deleteTask, getTasks, updateTask } from '@services/task-service';
import { ResponseType } from '@models/global-models';
import { TASK_TYPE, TaskBarProps, TaskStatusEnum, UpdateTaskPayload } from '@models/task';
import { TRACKER_TYPE } from '@models/tracker';
import { addTarget } from '@services/target-service';
import { TARGET_TYPE_ENUM } from '@models/target';
import { REGEX } from '@constants/global-constants';
import { Draggable, Droppable } from 'react-beautiful-dnd';
const { Text } = Typography;

const TaskBar = ({ tracker, refetchTracker, isDragDrop=true, isPopUp=false, onCloseIconClick }: TaskBarProps) => {
  const [isTextInputOpen, setIsTextInputOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any>();
  const [taskItemForm] = Form.useForm();
  const [numericForm] = Form.useForm();
  const [taskAddForm] = Form.useForm();

  const fetchTasks = async () => {
    try {
      const payload = {
        tracker_id: tracker?.id!,
        task_type: TASK_TYPE.TRACKER,
      };
      const res: ResponseType = await getTasks(payload);
      setTasks(res?.payload);
    } catch (error: any) {
      console.log('task error');
    };
  };

  const onTaskUpdate = (id: string, payload: Omit<UpdateTaskPayload,'tracker_id'>) => {
    const newPayload: UpdateTaskPayload = {...payload, tracker_id: tracker?.id!};
    updateTask(id, newPayload)
      .then((res: ResponseType) => {
        message.success(res?.message ?? 'Successfully updated');
        fetchTasks();
        refetchTracker();
      })
      .catch((error: any) => message.error(error?.message ?? 'Unable to update'));
  };

  const onTaskDelete = (id:string) => {
    deleteTask(id)
      .then((res: ResponseType) => {
        message.success(res?.message ?? 'Successfully Deleted');
        fetchTasks();
        refetchTracker();
      })
      .catch((error: any) => message.error(error?.message ?? 'Unable to update'));
  };

  const handleTaskCreate = async (e: any) => {
    if (
        (taskAddForm.getFieldError('task-input') &&
        taskAddForm.getFieldError('task-input').length > 0) ||
        e.target.value === '' || 
        tracker?.type === TRACKER_TYPE.NUMERIC
      ) {
      return;
    }
    try {
      setIsloading(true);
      const payload = {
        title: e.target.value.trim(),
        task_type: TASK_TYPE.TRACKER,
        tracker_id: tracker?.id!,
        is_done: TaskStatusEnum.PENDING,
      };
      const res = await createTask(payload);
      message.success(res?.message ?? 'Successfully added task!');
      // e.target.value = '';
      taskAddForm.resetFields();
      setIsTextInputOpen(false);
      setIsloading(false);
      fetchTasks();
      refetchTracker();
    } catch (error: any) {
      setIsloading(false);
      message.error(error?.message ?? 'Something went wrong!');
    };
  };

  const handleTargetCreate = () => {
    const payload = {
      achieved_target: numericForm.getFieldValue('target'),
      achieved_date: numericForm.getFieldValue('date'),
      tracker_id: tracker?.id!,
      target_type: TARGET_TYPE_ENUM.TRACKER
    };
    addTarget(payload).then((res: ResponseType) => {
      message.success(res.message);
      refetchTracker();
      numericForm.resetFields();
    }).catch((error: any) => message.error(error?.message ?? 'Unable to add target!'));
  };

  const handleBtnClick = () => {
    setIsTextInputOpen(true);
  };

  const DropAbleTaskContents = (
    <Droppable droppableId="task-drop">
      {(provided) => (
        <div className='task-bar-task-items task-drop' {...provided.droppableProps} ref={provided.innerRef}>
          {tasks?.map((task: any, index: number) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {
                (f) => (
                  <div ref={f.innerRef} {...f.draggableProps} {...f.dragHandleProps}>
                    <TaskItem key={index} form={taskItemForm} task={task} onTaskUpdate={onTaskUpdate} onTaskDelete={onTaskDelete} />
                  </div>
                )
              }
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  const NotDraggableTaskContent = (
    tasks?.map((task: any, index: number) => (
      <TaskItem key={index} form={taskItemForm} task={task} onTaskUpdate={onTaskUpdate} onTaskDelete={onTaskDelete} /> ))
  );

  const renderTaskContent = (
    <div className='task-bar-task-items'>
      {isDragDrop ? DropAbleTaskContents : NotDraggableTaskContent}
    </div>
  );

  useEffect(() => {
    if(tracker?.id){
      fetchTasks();
    }
  }, [tracker]);

  const cardHeader = (
    <div className='task-bar-card-header'>
      {tracker?.type === TRACKER_TYPE.TASK ? 'Task' : 'Target'}
      {isPopUp && <CloseIcon2 onClick={onCloseIconClick} style={{cursor: 'pointer'}}/>}
    </div>
  );

  return (
    <Card 
      className='task-bar-container hide-scrollbar' 
      title={cardHeader} 
      bordered={false}
      >
      {tracker?.type === TRACKER_TYPE.TASK && 
      <Button 
        icon={<PlusCircleRoundedIcon />} 
        type='link' 
        className='taskbar-btn' 
        onClick={handleBtnClick}>
          Create Task
      </Button> }

      {isTextInputOpen &&
      <Fragment>
        <Row gutter={16} justify='center' align='middle'>
          <Col span={24}>
            <Form form={taskAddForm}>
              <Form.Item 
                name='task-input'  
                rules={[
                  { required: true, message: 'Please enter name' },
                  { pattern: REGEX.LETTERS_NUMBERS, message: 'Invalid name.' },
                ]}
                >
                <TextInput
                  className='taskbar-input'
                  placeholder={'Add Task'}
                  onPressEnter={handleTaskCreate}
                  disabled={isLoading}
                />
              </Form.Item>
            </Form>
            
          </Col>
        </Row>
        <Text className='tracker-input-info'>press <span>Enter</span> to update</Text>
      </Fragment>}
      {tracker?.type === TRACKER_TYPE.NUMERIC &&
      <Form form={numericForm}>
        <Row gutter={16} justify='center' align='top'>
          <Col span={14}>
            <Form.Item 
              name='target'
              rules={[
                { required: true, message: 'Please enter value' },
                // Use a regular expression to allow only letters and spaces
                { pattern: REGEX.NUMBERS, message: 'Invalid number.' },
              ]}
            >
              <TextInput
                className='taskbar-input'
                placeholder={'Input value'}
                disabled={isLoading || !tracker?.is_enabled}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item name='date'>
              <DatePicker
                className='taskbar-input' 
                placeholder='Select Date' 
                onChange={handleTargetCreate} 
                disabled={isLoading || !tracker?.is_enabled}
              />
            </Form.Item> 
          </Col>  
        </Row>
        <Text className='tracker-input-info'>press <span>Enter</span> to update</Text>
      </Form>}
      {renderTaskContent}
    </Card>
  );
};

export default TaskBar;
