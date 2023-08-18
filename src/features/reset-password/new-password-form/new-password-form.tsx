import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Typography } from 'antd';

import './style.css';
import PasswordInput from '@components/common/inputfields/password-input';
import AuthCardWrapper from '@components/common/wrapper/AuthWrapper';
import Button from '@components/common/button';

const { Text } = Typography;

const NewPasswordForm: FC = () => {
  const { token } = useParams();

  const setNewPassword = ({ password, confirmed_password }: any) => {
    console.log('set new password with token, pass, confirm pass');
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
