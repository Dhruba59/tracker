import { useState, useEffect } from 'react';
import TextInput from '@components/common/input-fields/text-input';
import AppModal from '@components/common/modal';
import { DatePicker, Form, FormInstance, Input, Radio, Select, message } from 'antd';
import './create-tracker-modal.css';
import AppButton from '@components/common/button';
import { TRACKER_TYPE } from '@models/tracker';
import { createTracker } from '@services/tracker-service';
import { ResponseType } from '@models/global-models';
import { getAllUser } from '@services/user-services';

export interface CreateTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  workspaceId: string;
  form?: any;
};

const { TextArea } = Input;

const CreateTrackerModal = ({ isOpen, onClose, workspaceId, onSubmit, form }: CreateTrackerModalProps) => {
  const [type, setType] = useState<TRACKER_TYPE>(TRACKER_TYPE.TASK);
  const [memberOptions, setMemberOptions] = useState<any>();

  const formatSelectOptions = (list: any) => (
    list.map((item: any) => ({
      value: item.id,
      label: item.name
    }))
  );

  console.log(memberOptions);
  
  useEffect(() => {
    getAllUser().then((res: ResponseType) => setMemberOptions(formatSelectOptions(res.payload)));
  }, []);
  

  if(!form) {
    [form] = Form.useForm();
  };
  
  const onRadioChange = (e: any) => {
    setType(e.target.value);
  };

  return (
    <AppModal title='Create Tracker' {...{isOpen, onClose}}>
      <Form
        className='create-tracker-modal-container'
        onFinish={onSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
      >
        <Form.Item 
          name='title' 
          label='Tracker Title' 
          rules={[{required: true, message: 'Title is required'}]}
        >
          <TextInput className='create-tracker-modal-input' placeholder='Title'/>
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <TextArea className='create-tracker-modal-input'/>
        </Form.Item>
        <Form.Item name='date' label='Time Period' >
          <DatePicker.RangePicker className='create-tracker-modal-input'/>
        </Form.Item>
        <Form.Item name='members' label='Assign Members'>
          <Select
            className='create-tracker-modal-input'
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            // defaultValue={['a10', 'c12']}
            // onChange={handleChange}
            options={memberOptions}
          />
        </Form.Item>
        <Form.Item name='type' label='Tracker Type'>
          <Radio.Group onChange={onRadioChange}>
            <Radio value={TRACKER_TYPE.TASK}>Task</Radio>
            <Radio value={TRACKER_TYPE.NUMERIC}>Numeric</Radio>
          </Radio.Group>
        </Form.Item>
        {type === TRACKER_TYPE.NUMERIC && (
          <div className='create-tracker-target'>
            <Form.Item name='target_start' label='Target'>
              <TextInput className='create-tracker-target-input'/>
            </Form.Item> To
            <Form.Item name='target_end'>
              <TextInput className='create-tracker-target-input'/>
            </Form.Item>
          </div>
          )}
        <AppButton htmlType='submit' type='primary' className='create-tracker-modal-btn'>Save Tracker</AppButton>
      </Form>
    </AppModal>  
  );
};

export default CreateTrackerModal;
