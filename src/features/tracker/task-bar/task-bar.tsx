import { Fragment, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { DotIcon, EditIcon, PlusCircleRoundedIcon } from '@icons';
import { Button, Card, Col, DatePicker, Form, Row, Typography, message } from 'antd';
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
const { Text } = Typography;

const TaskBar = ({ tracker, refetchTracker }: TaskBarProps) => {
  const [isTextInputOpen, setIsTextInputOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any>();
  const [taskItemForm] = Form.useForm();
  const [numericForm] = Form.useForm();

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
    if(tracker?.type === TRACKER_TYPE.NUMERIC) {
      return;
    };
    try {
      setIsloading(true);
      const payload = {
        title: e.target.value,
        task_type: TASK_TYPE.TRACKER,
        tracker_id: tracker?.id!,
        is_done: TaskStatusEnum.PENDING,
      };
      const res = await createTask(payload);
      message.success(res?.message ?? 'Successfully added task!');
      e.target.value = '';
      setIsTextInputOpen(false);
      setIsloading(false);
      fetchTasks();
      refetchTracker();
    } catch (error: any) {
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
    }).catch((error: any) => message.error(error?.message ?? 'Unable to add target!'));
  };

  const handleBtnClick = () => {
    setIsTextInputOpen(true);
  };

  const renderTaskContent = (
    <div className='task-bar-task-items'>
      {tasks?.map((task: any) => (
        <TaskItem form={taskItemForm} task={task} onTaskUpdate={onTaskUpdate} onTaskDelete={onTaskDelete} />
      ))}
    </div>
  );

  useEffect(() => {
    if(tracker?.id){
      fetchTasks();
    }
  }, [tracker]);

  return (
    <Card className='task-bar-container hide-scrollbar' title="Task" bordered={false}>
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
            <TextInput
              className='taskbar-input'
              placeholder={'Add Task'}
              onPressEnter={handleTaskCreate}
              disabled={isLoading}
            />
          </Col>
        </Row>
        <Text className='tracker-input-info'>press <span>Enter</span> to update</Text>
      </Fragment>}
      {tracker?.type === TRACKER_TYPE.NUMERIC &&
      <Form form={numericForm}>
        <Row gutter={16} justify='center' align='middle'>
          <Col span={14}>
            <Form.Item name='target'>
              <TextInput
                className='taskbar-input'
                placeholder={'Input value'}
                disabled={isLoading || tracker?.is_enabled}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item name='date'>
              <DatePicker
                className='taskbar-input' 
                placeholder='Select Date' 
                onChange={handleTargetCreate} 
                disabled={isLoading || tracker?.is_enabled}
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
