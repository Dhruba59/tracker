import { Col, Form, Radio, Row } from 'antd';
import AppButton from '@components/common/button';
import TextInput from '@components/common/input-fields/text-input';
import PasswordInput from '@components/common/input-fields/password-input';
import './security-form.css';

const SecurityForm = () => {

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form className='security-form-container' onFinish={onSubmit} labelCol={{span: 24}}>
      <Form.Item name='current-password' label='Current Password' rules={[{required: true}]}>
        <PasswordInput className='security-form-input'/>
      </Form.Item>
      <Form.Item name='new-password' label='Password' rules={[{required: true}]}>
        <PasswordInput className='security-form-input'/>
      </Form.Item>
      <Form.Item name='retype-password' label='Retype Password' rules={[{required: true}]}>
        <PasswordInput className='security-form-input'/>
      </Form.Item>
      <Row gutter={10}>
        <Col>
          <AppButton type='default' htmlType='submit'>Cancel</AppButton>
        </Col>
        <Col>
          <AppButton type='primary' htmlType='submit'>Update</AppButton>
        </Col>
      </Row>    
    </Form>
  );
};

export default SecurityForm;