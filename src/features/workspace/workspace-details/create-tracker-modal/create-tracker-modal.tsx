import TextInput from '@components/common/input-fields/text-input';
import AppModal from '@components/common/modal';
import { DatePicker, Form, Input, Radio } from 'antd';
import './create-tracker-modal.css';
import AppButton from '@components/common/button';

export interface CreateTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
};

const { TextArea } = Input;

const CreateTrackerModal = ({ isOpen, onClose }: CreateTrackerModalProps) => {

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <AppModal title='Create Tracker' {...{isOpen, onClose}}>
      <Form className='create-tracker-modal-container'
        onFinish={onSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
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
          <TextInput className='create-tracker-modal-input'/>
        </Form.Item>
        <Form.Item name='type' label='Tracker Type'>
          <Radio.Group>
            <Radio value={1}>Task</Radio>
            <Radio value={2}>Numeric</Radio>
          </Radio.Group>
        </Form.Item>
        <AppButton htmlType='submit' type='primary' className='create-tracker-modal-btn'>Save Tracker</AppButton>
      </Form>
    </AppModal>  
  );
};

export default CreateTrackerModal;
