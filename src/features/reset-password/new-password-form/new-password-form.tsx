import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Typography, message } from 'antd';

import PasswordInput from '@components/common/input-fields/password-input';
import AuthCardWrapper from '@components/common/wrapper/auth-form-wrapper';
import Button from '@components/common/button';
import { resetPassword } from '@services/auth-services';
import { routes } from '@constants/route-constants';
import './new-password-form.css';

const { Text } = Typography;

const NewPasswordForm: FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const setNewPassword = async ({ password, confirmed_password }: any) => {
    try {
      const payload = {
        newPassword: password,
        confirmNewPassword: confirmed_password,
        token: token ?? ''
      };
      await resetPassword(payload);
      navigate(routes.login.path);
      message.success('Successfully reset password!');
    } catch(error: any) {
      message.error(error?.message ?? 'Something went wrong!');
    }
  };

  return (
    <AuthCardWrapper>
      <Text className="newpass-title">Set New Password!</Text>
      <Form className="newpass-form" onFinish={setNewPassword} requiredMark='optional'>
        <Form.Item 
          name='password' 
          className="newpass-form-item" 
          label='Password'
          labelCol={{ span: 24 }}
          required
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <PasswordInput placeholder="Enter Password" />
        </Form.Item>

        <Form.Item 
          name='confirmed_password' 
          className="newpass-form-item" 
          label='Retype Password'  
          labelCol={{ span: 24 }}
          required
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <PasswordInput placeholder="Retype Password" />
        </Form.Item>
        <Button
          size='large'
          type='primary'
          htmlType='submit' 
          className=""> Update
        </Button>           
      </Form>
    </AuthCardWrapper>
  );
};

export default NewPasswordForm;
