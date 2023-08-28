import AppButton from '@components/common/button';
import TextInput from '@components/common/input-fields/text-input';
import { Form, Image, Radio } from 'antd';
import './general-form.css';

const GeneralForm = () => {

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form className='general-form-container' onFinish={onSubmit} labelCol={{span: 24}}>
      <Image
        className='general-form-image'
        width={100}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <Form.Item name='name' label='Name' rules={[{required: true}]}>
        <TextInput className='general-form-input' />
      </Form.Item>
      <Form.Item name='email' label='Email' rules={[{required: true}]}>
        <TextInput className='general-form-input'/>
      </Form.Item>
      <Form.Item name='name' label='Time Zone' rules={[{required: true}]}>
      <Radio.Group>
        <Radio value={1}>12 hours</Radio>
        <Radio value={2}>24 hours</Radio>
      </Radio.Group>
      </Form.Item>
      <AppButton type='primary' htmlType='submit'>Save Changes</AppButton>
    </Form>
  );
};

export default GeneralForm;