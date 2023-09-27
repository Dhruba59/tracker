import { Col, Form, Popconfirm, Radio, Row, message } from 'antd';
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

  const onSubmit = () => {
    const values = form.getFieldsValue();
    setPasswordUpdateLoading(true);
    changePassword(values).then((res: ResponseType) => {
      message.success(res.message ?? 'Successfully Changed password!');
      form.resetFields();
    }).catch((error: any) => {
      message.error(error?.message ?? 'Unable to change password!');
    }).finally(() => setPasswordUpdateLoading(false));
  };

  const passwordRules = [
    {
      required: true,
      message: 'Please enter your password.',
    },
    {
      min: 8,
      message: 'Password must be at least 8 characters long.',
    },
  ];

  const confirmNewPasswordRules = [
    {
      required: true,
      message: 'Please retype your new password.',
    },
    {
      validator(_: any, value: any) {
        if (!value || form.getFieldValue('newPassword') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Password does not match.'));
      },
    },
  ];
  

  return (
    <Form className='security-form-container' onFinish={onSubmit} labelCol={{span: 24}} form={form}>
      <Form.Item name='previousPassword' label='Current Password' rules={passwordRules}>
        <PasswordInput className='security-form-input'/>
      </Form.Item>
      <Form.Item name='newPassword' label='New Password' rules={passwordRules}>
        <PasswordInput className='security-form-input'/>
      </Form.Item>
      <Form.Item name='confirmNewPassword' label='Retype New Password' rules={confirmNewPasswordRules}>
        <PasswordInput className='security-form-input'/>
      </Form.Item>
      <Row gutter={10}>
        {/* <Col>
          <AppButton type='default' htmlType='button'>Cancel</AppButton>
        </Col> */}
        <Col>
          <Popconfirm
            title="Change Password!"
            description="Are you sure to change password?"
            okText="Yes"
            cancelText="No"
            onConfirm={onSubmit}
            disabled={!!form.getFieldsError()}
          >
            <AppButton loading={passwordUpdateLoading} type='primary' htmlType='submit'>Update</AppButton>
          </Popconfirm>
          
        </Col>
      </Row>    
    </Form>
  );
};

export default SecurityForm;