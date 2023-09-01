import { Fragment, useState, useEffect } from 'react';
import { DotIcon, EditIcon, PlusCircleRoundedIcon } from '@icons';
import { Button, Card, Col, Form, Row, Typography, message } from 'antd';
import './task-bar.css';
import TextInput from '@components/common/input-fields/text-input';
import Checkbox from 'antd/es/checkbox/Checkbox';
import TaskItem from './task-item';
import { createTask, deleteTask, getTasks, updateTask } from '@services/task-service';
import { ResponseType } from '@models/global-models';
import { TASK_TYPE, TaskBarProps, TaskStatusEnum, UpdateTaskPayload } from '@models/task';
import { TRACKER_TYPE } from '@models/tracker';
const { Text } = Typography;

const TaskBar = ({ tracker }: TaskBarProps) => {
  const [isTextInputOpen, setIsTextInputOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any>();
  const [taskItemForm] = Form.useForm();

  const fetchData = async () => {
    try {
      console.log('task fetching');
      const payload = {
        tracker_id: tracker.id!,
        task_type: TASK_TYPE.TRACKER,
        // milestone_id: 'sadfasdfasd'
      };
      const res: ResponseType = await getTasks(payload);
      setTasks(res?.payload);
    } catch (error: any) {
      console.log('task error');
    };
  };

  console.log('task', tasks);
  useEffect(() => {
    fetchData();
  }, [tracker]);

  const onTaskUpdate = (id: string, payload: Omit<UpdateTaskPayload,'tracker_id'>) => {
    const newPayload: UpdateTaskPayload = {...payload, tracker_id: tracker?.id!};
    updateTask(id, newPayload)
      .then((res: ResponseType) => {
        message.success(res?.message ?? 'Successfully updated');
        // taskItemForm.setFieldValue('task-name', payload.title);
        fetchData();
      })
      .catch((error: any) => message.error(error?.message ?? 'Unable to update'));
  };

  const onTaskDelete = (id:string) => {
    deleteTask(id)
      .then((res: ResponseType) => {
        message.success(res?.message ?? 'Successfully Deleted');
        // taskItemForm.setFieldValue('task-name', payload.title);
        fetchData();
      })
      .catch((error: any) => message.error(error?.message ?? 'Unable to update'));
  };

  const handleTaskCreate = async (e: any) => {
    try {
      setIsloading(true);
      const payload = {
        title: e.target.value,
        task_type: TASK_TYPE.TRACKER,
        tracker_id: tracker.id!,
        is_done: TaskStatusEnum.PENDING,
      };
      const res = await createTask(payload);
      message.success(res?.message ?? 'Successfully added task!');
      e.target.value = '';
      setIsTextInputOpen(false);
      setIsloading(false);
      fetchData();
    } catch (error: any) {
      message.error(error?.message ?? 'Something went wrong!');
    };
  };

  const handleBtnClick = () => {
    setIsTextInputOpen(true);
  };

  const renderTaskContent = (
    <div>
      {tasks?.map((task: any) => (
        <TaskItem form={taskItemForm} task={task} onTaskUpdate={onTaskUpdate} onTaskDelete={onTaskDelete} />
      ))}
    </div>
  );

  return (
    <Card className='task-bar-container hide-scrollbar' title="Task" bordered={false}>
      <Button 
        icon={<PlusCircleRoundedIcon />} 
        type='link' 
        className='taskbar-btn' 
        onClick={handleBtnClick}>
          Create Task
      </Button>

      {isTextInputOpen &&
      <Fragment>
        <Row gutter={16}>
          <Col span={tracker.type !== TRACKER_TYPE.TASK ? 14 : 24}>
            <TextInput
              className='taskbar-input'
              placeholder='Task name'
              onPressEnter={handleTaskCreate}
              disabled={isLoading}
            />
          </Col>
          <Col span={10}>
            {tracker.type !== TRACKER_TYPE.TASK &&
              <TextInput className='taskbar-input' type='date' />
            }
          </Col>
        </Row>
        <Text className='tracker-input-info'>press <span>Enter</span> to update</Text>
      </Fragment>}
      {renderTaskContent}
    </Card>
  );
};

export default TaskBar;