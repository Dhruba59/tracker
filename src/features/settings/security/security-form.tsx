import { Col, Form, Radio, Row, message } from 'antd';
import AppButton from '@components/common/button';
import TextInput from '@components/common/input-fields/text-input';
import PasswordInput from '@components/common/input-fields/password-input';
import './security-form.css';
import { changePassword } from '@services/user-services';
import { ChangePasswordPayload } from '@models/user';
import { ResponseType } from '@models/global-models';
import { useState } from 'react';

const SecurityForm = () => {
  const [passwordUpdateLoading, setPasswordUpdateLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    setPasswordUpdateLoading(true);
    changePassword(values).then((res: ResponseType) => {
      message.success(res.message ?? 'Successfully Changed password!');
      form.resetFields();
    }).catch((error: any) => {
      message.error(error?.message ?? 'Unable to change password!');
    }).finally(() => setPasswordUpdateLoading(false));
  };

  return (
    <Form className='security-form-container' onFinish={onSubmit} labelCol={{span: 24}} form={form}>
      <Form.Item name='previousPassword' label='Current Password' rules={[{required: true}]}>
        <PasswordInput className='security-form-input'/>
      </Form.Item>
      <Form.Item name='newPassword' label='New Password' rules={[{required: true}]}>
        <PasswordInput className='security-form-input'/>
      </Form.Item>
      <Form.Item name='confirmNewPassword' label='Retype New Password' rules={[{required: true}]}>
        <PasswordInput className='security-form-input'/>
      </Form.Item>
      <Row gutter={10}>
        <Col>
          <AppButton type='default' htmlType='submit'>Cancel</AppButton>
        </Col>
        <Col>
          <AppButton loading={passwordUpdateLoading} type='primary' htmlType='submit'>Update</AppButton>
        </Col>
      </Row>    
    </Form>
  );
};

export default SecurityForm;