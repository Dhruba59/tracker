import TaskItem from '@components/common/tracker/task-item/task-item';
import { Collapse, CollapsePanelProps, DatePicker, Form, Input, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import './milestone.css';
import AppCollapse from '@components/common/collapse';
import AppButton from '@components/common/button';
import { ResponseType } from '@models/global-models';
import { error } from 'console';
import { CreateOrUpdateMilestonePayload } from '@models/milestone';
import { createTask, deleteTask, getTasks, updateTask } from '@services/task-service';
import { CreateTaskPayload, TASK_TYPE, TaskStatusEnum, UpdateTaskPayload } from '@models/task';
import { ArrowDown, ArrowUp, DotIcon, EditIcon } from '@icons';
import { TRACKER_TYPE } from '@models/tracker';
import { REGEX } from '@constants/global-constants';
import CheckboxInput from '@components/common/input-fields/checkbox';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const { Text } = Typography;
const { RangePicker } = DatePicker;

export interface MilestoneProps {
  newMilestoneTitle?: string;
  tracker: any;
  milestoneData?: any;
  refetchTracker: () => void;
  updateMilestone: (id:string, values: CreateOrUpdateMilestonePayload) => void;
  createMilestone: (values: CreateOrUpdateMilestonePayload) => Promise<ResponseType>;
};

const Milestone = ({ milestoneData, createMilestone, updateMilestone, tracker, refetchTracker, newMilestoneTitle }: MilestoneProps) => {
  const [milestone, setMilestone] = useState<any>(milestoneData);
  const [isTaskInputOpen, setIsTaskInputOpen] = useState<boolean>(false);
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null!);
  const [tasks, setTasks] = useState<any>();
  const [taskItemForm] = Form.useForm();
  const [milestoneForm] = Form.useForm();
  const [numericInputForm] = Form.useForm();
  const [taskAddForm] = Form.useForm();

  const fetchTasks = () => {
    getTasks({
      tracker_id: tracker?.id,
      task_type: TASK_TYPE.MILESTONE,
      milestone_id: milestone?.id
    }).then((res: ResponseType) => setTasks(res.payload))
      .catch((error: any) => message.error('unable to load tasks'));
  };

  // useEffect(() => {
  //   console.log('changed milestone');
  //   fetchTasks();
  // }, [tracker]);

  useEffect(() => {
    console.log('changed milestone');
    setMilestone(milestoneData);
    // fetchTasks();
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
    if (taskAddForm.getFieldError('task-name') && taskAddForm.getFieldError('task-name').length === 0 && e.target.value.trim() !== '') {
      const payload: CreateTaskPayload = {
        title: e.target.value?.trim(),
        tracker_id: tracker?.id,
        milestone_id: milestone?.id,
        is_done: TaskStatusEnum.PENDING,
        task_type: TASK_TYPE.TRACKER,
      };
      createTask(payload)
        .then((res: ResponseType) => {
          message.success('Successfully added');
          fetchTasks();
          setIsTaskInputOpen(false);
          taskAddForm.resetFields();
          refetchTracker();
        })
        .catch(error => message.error('Unable to create1'));
    }
  };

  const onTaskDelete = (id: string) => {
    deleteTask(id)
      .then((res: ResponseType) => {
        message.success(res.message ?? 'Successfully Deleted!');
        fetchTasks();
        refetchTracker();
      })
      .catch((error: any) => message.error('Unable to delete!'));
  };

  const onTaskUpdate = (id: string, payload: Omit<UpdateTaskPayload, 'tracker_id'>) => {
    const newPayload = { ...payload, tracker_id: tracker?.id };
    updateTask(id, newPayload)
      .then((res: ResponseType) => {
        message.success(res.message ?? 'Successfully Updated!');
        fetchTasks();
        setIsTaskInputOpen(false);
        refetchTracker();
      })
      .catch((error: any) => message.error('Unable to Update!'));
  };

  const handleDateChange = async (date: any) => {
    if (milestoneForm.getFieldError('target') && milestoneForm.getFieldError('target').length === 0) {
      setSelectedDateRange([
        dayjs(new Date(date[0].$d).toISOString(), 'YYYY/MM/DD'), 
        dayjs(new Date(date[1].$d).toISOString(), 'YYYY/MM/DD')
      ]);
      let payload: any = {
        start_date: new Date(date[0].$d),
        end_date: new Date(date[1].$d),
        // tracker_type: tracker?.type,
        // tracker_id: tracker?.id
      };
      if(tracker?.type === TRACKER_TYPE.NUMERIC) {
        console.log(milestoneForm.getFieldValue('target') );
        if(milestoneForm.getFieldValue('target') === undefined || milestoneForm.getFieldValue('target') === '' ) {
          return;
        }
        payload = { ...payload, target_value: milestoneForm.getFieldValue('target')};
      };
      if(milestone?.id) {
        console.log('mile', milestone);
        updateMilestone(milestone?.id, payload);
      } else {
        const res = await createMilestone(payload);
        setMilestone(res.payload);
      };
    }
  };

  const handleLabelChange = (value: string) => {
    if(value && value !== '' && milestone?.id) {
      const payload: any = {
        title: value?.trim()
      };
      updateMilestone(milestone?.id, payload);
    }
  };

  const editableLabel = (
    <Typography.Paragraph editable={{
      onChange: handleLabelChange,
      icon: milestone?.id ? <EditIcon style={{marginTop: 'auto'}}/> : <></>,
      enterIcon: null,
    }} className='milestone-editable-label'>{milestone?.title ?? newMilestoneTitle}</Typography.Paragraph>
  );

  const disabledDate = (current: Dayjs) => {
    const minDate = dayjs(tracker?.start_date);
    const maxDate = dayjs(tracker?.end_date);
    return current.isBefore(minDate) || current.isAfter(maxDate);
  };

  const handleTargetAchieved = (e: any) => {
    const payload = {
      achieved_target: e.target.value,
      tracker_type: TRACKER_TYPE.NUMERIC,
    };
    updateMilestone(milestone?.id, payload);
    numericInputForm.resetFields();
  };

  return (
    <AppCollapse 
      label={editableLabel}
      key={milestone?.id ?? ''} 
      expandIcon={(panelProps: any) => (panelProps.isActive ? <ArrowUp/> : <ArrowDown />)}
      expandIconPosition='right'
      >
      <div className='milestone-container'>
        <div className='milestone-row-1'>
          {tracker?.type === TRACKER_TYPE.TASK && <Text className='milestone-title'>Tasks</Text>}
          <Form form={milestoneForm} className='milestone-form' style={{width: tracker?.type === TRACKER_TYPE.NUMERIC ? '100%': ''}}>
            {milestone?.id && tracker?.type === TRACKER_TYPE.NUMERIC && <span className='milestone-target'>target: {milestone?.target_value}</span>}
            {tracker?.type === TRACKER_TYPE.NUMERIC && !milestone?.id &&
            <Form.Item 
              name='target'
              rules={[
                { required: true, message: 'target required' },
                { pattern: REGEX.NUMBERS, message: 'Invalid target.' },
              ]}
              >
              <Input size='small' className='milestone-target-input' placeholder='input target here'/>
            </Form.Item>}
            {/* <Form.Item name='date'>
              <RangePicker size='small' value={selectedDateRange} disabledDate={disabledDate} className='milestone-datepicker' onChange={handleDateChange} showTime={false} />
            </Form.Item> */}
            <RangePicker size='small' value={selectedDateRange} disabledDate={disabledDate} className='milestone-datepicker' onChange={handleDateChange} showTime={false} />
          </Form>
          {/* {tracker?.type === TRACKER_TYPE.TASK ?
            <Text className='milestone-title'>Tasks</Text> :
            <TextInput />}
            <RangePicker size='small' value={selectedDateRange} disabledDate={disabledDate} className='milestone-datepicker' onChange={handleDateChange} showTime={false} /> */}
        </div>
        <div>
          {milestone?.id && tracker?.type === TRACKER_TYPE.NUMERIC &&
            <Form form={numericInputForm}>
              <Form.Item
                name='achieved_target'
                rules={[
                  { required: true, message: 'Please enter value' },
                  // Use a regular expression to allow only letters and spaces
                  { pattern: REGEX.NUMBERS, message: 'Invalid number.' },
                ]}>
                <Input size='middle' onPressEnter={(e) => {
                  if (numericInputForm.getFieldError('achieved_target') && numericInputForm.getFieldError('achieved_target').length === 0) {
                    handleTargetAchieved(e);
                  }
                }} className='milestone-target-input' placeholder='input value here' />
              </Form.Item>
            </Form>}

        </div>
        {/* <TextInput onPressEnter={(e) => {
                  if (numericForm.getFieldError('target') && numericForm.getFieldError('target').length === 0) {
                    handleTargetAchieve(e);
                  }
                }} className='progress-popover-input' placeholder='Input value' /> */}
            
            {/* <div className='milestone-row-2'> */}
            {/* {tasks?.map((task: any) => (
              <TaskItem key={task.id} form={taskItemForm} task={task} onTaskDelete={onTaskDelete} onTaskUpdate={onTaskUpdate} />
            ))} */}
        {tracker?.type === TRACKER_TYPE.TASK &&
          <Droppable droppableId={milestone?.id} >
            {(provided) => (
              <div className='milestone-row-2' {...provided.droppableProps} ref={provided.innerRef}>

                {tasks?.map((task: any, index: number) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {
                      (f) => (
                        <div ref={f.innerRef} {...f.draggableProps} {...f.dragHandleProps}>
                          <TaskItem key={task.id} form={taskItemForm} task={task} onTaskDelete={onTaskDelete} onTaskUpdate={onTaskUpdate} />
                        </div>
                      )
                    }
                  </Draggable>
                ))}

                {isTaskInputOpen &&
                  <Form form={taskAddForm} className='milestone-new-task-row'>
                    <div>
                      <DotIcon style={{ marginTop: '6px' }} />
                    </div>
                    <div>
                      <CheckboxInput disabled={true} />
                    </div>

                    <Form.Item className='task-name' name='task-name' rules={[
                      { required: true, message: 'Name is required.' },
                      { pattern: REGEX.LETTERS_NUMBERS, message: 'Please enter a valid name.' },
                    ]}>
                      <Input placeholder='Task name here' size='small' className='milestone-task-add-input' onPressEnter={handleTaskAdd} autoFocus />
                    </Form.Item>
                  </Form>
                }
                <AppButton className='milestone-task-add-btn' type='link' disabled={!milestone?.id} onClick={() => setIsTaskInputOpen(true)} >+ Add New</AppButton>
                {provided.placeholder}
              </div>

            )}
          </Droppable>

        }
      </div>
    </AppCollapse>
  );
};

export default Milestone;