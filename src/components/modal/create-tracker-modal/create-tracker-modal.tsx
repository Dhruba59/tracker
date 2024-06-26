import { useState, useEffect } from 'react';
import TextInput from '@components/common/input-fields/text-input';
import AppModal from '@components/common/modal';
import { Col, DatePicker, Form, FormInstance, Input, Radio, Row, Select, message } from 'antd';
import './create-tracker-modal.css';
import AppButton from '@components/common/button';
import { CreateTrackerModalProps, TRACKER_TYPE } from '@models/tracker';
import { createTracker } from '@services/tracker-service';
import { ResponseType } from '@models/global-models';
import { getAllUser } from '@services/user-services';
import NumberRangeInput from '@components/common/input-fields/number-range-input';
import { REGEX } from '@constants/global-constants';
import NumberRange from '@components/common/input-fields/number-range';

const { TextArea } = Input;

const CreateTrackerModal = ({ isOpen, onClose, workspaceId, onSubmit, isCreateLoading, form }: CreateTrackerModalProps) => {
  const [selectedRange, setSelectedRange] = useState<any>([0, 100]);
  const [type, setType] = useState<TRACKER_TYPE>(TRACKER_TYPE.TASK);
  const [memberOptions, setMemberOptions] = useState<any>();

  const formatSelectOptions = (list: any) => (
    list.map((item: any) => ({
      value: item.id,
      label: item.name
    }))
  );
  
  useEffect(() => {
    getAllUser().then((res: ResponseType) => setMemberOptions(formatSelectOptions(res.payload)));
  }, []);
  

  if(!form) {
    [form] = Form.useForm();
  };

  const handleRangeChange = (newRange: [number, number]) => {
    setSelectedRange(newRange);
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
          rules={[
            { required: true, message: 'Title is required' }, 
            { pattern: REGEX.LETTERS_NUMBERS, message: 'Please enter valid title.', }]}
        >
          <TextInput className='create-tracker-modal-input' placeholder='Title'/>
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <TextArea className='create-tracker-modal-input'/>
        </Form.Item>
        <Form.Item name='date' label='Time Period' required rules={[{required: true, message: 'Date is required'}]} >
          <DatePicker.RangePicker className='create-tracker-modal-input'/>
        </Form.Item>
        <Form.Item name='members' label='Assign Members'>
          <Select
            className='create-tracker-modal-date-input'
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            // defaultValue={['a10', 'c12']}
            // onChange={handleChange}
            options={memberOptions}
          />
        </Form.Item>
        <Form.Item name='type' label='Tracker Type' required rules={[{required: true, message: 'Type is required'}]} >
          <Radio.Group onChange={onRadioChange}>
            <Radio value={TRACKER_TYPE.TASK}>Task</Radio>
            <Radio value={TRACKER_TYPE.NUMERIC}>Numeric</Radio>
          </Radio.Group>
        </Form.Item>
        {type === TRACKER_TYPE.NUMERIC && (
          <div className='create-tracker-target'>
            <Form.Item 
              name='target_start' 
              label='Target'
              rules={[
                { required: true, message: 'Start value is required' },
                { pattern: REGEX.NUMBERS, message: 'Invalid number.', }]}
              >
              <TextInput className='create-tracker-target-input-start' placeholder='Start value'/>
            </Form.Item>
            <Form.Item
              name='target_end'
              rules={[
                { required: true, message: 'End value is required' },
                { pattern: REGEX.NUMBERS, message: 'Invalid number.', }]}>
              <TextInput className='create-tracker-target-input-end' placeholder='End value' />
            </Form.Item>
          </div>
          // <Form.Item label='Target'>
          //   <NumberRange value={selectedRange} onChange={handleRangeChange} />
          // </Form.Item>
          
          )}
        <AppButton 
          htmlType='submit' 
          type='primary' 
          loading={isCreateLoading} 
          className='create-tracker-modal-btn'>
            Save Tracker
          </AppButton>
      </Form>
    </AppModal>  
  );
};

export default CreateTrackerModal;
