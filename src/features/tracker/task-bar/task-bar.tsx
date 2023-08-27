import { Fragment, useState } from 'react';
import { DotIcon, EditIcon, PlusCircleRoundedIcon } from '@icons';
import { Button, Card, Col, Row, Typography, message } from 'antd';
import './task-bar.css';
import TextInput from '@components/common/input-fields/text-input';
import { TRACKER_TYPE, TaskBarProps, TrackerCardInfo } from '@models/tracker';
import Checkbox from 'antd/es/checkbox/Checkbox';
import TaskItem from './task-item';
const { Text } = Typography;

const TaskBar = ({ tracker }: TaskBarProps) => {
  const [isTextInputOpen, setIsTextInputOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleTaskCreate = (e: any) => {
    try {
      setIsloading(true);
      // const res = await addTask(e.target.value);
      // message.success(res?.message ?? 'Successfully added task!');
      e.target.value = '';
      setIsTextInputOpen(false);
      setIsloading(false);
    } catch (error: any) {
      message.error(error?.message ?? 'Something went wrong!');
    }
  };

  const handleBtnClick = () => {
    setIsTextInputOpen(true);
  };

  const renderTaskContent = (
    <div>
      {tracker?.task?.map((task: any) => (
        <TaskItem task={task}/>
      ))}
    </div>
  );

  return (
    <Card className='task-bar-container' title="Task" bordered={false}>
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