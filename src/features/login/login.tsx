import { FC, useState, useEffect } from 'react';
import { Form, Input, Typography, message, Checkbox } from 'antd';

import './login.css';
import { Credentials } from '@models/auth-models';
import CheckboxInput from '@components/common/InputFields/Checkbox';
import PasswordInput from '@components/common/InputFields/PasswordInput';
import TextInput from '@components/common/InputFields/TextInput';
import { GoogleIcon } from '@icons';
import { userLogin } from '@services/auth-services';
import { routes } from '@constants/route-constants';
import { useNavigate } from 'react-router-dom';
import AuthCardWrapper from '@components/common/wrapper/AuthWrapper';
import Button from '@components/common/Button';

const { Text } = Typography;

const Login: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogin = (values: Credentials) => {
    userLogin({ ...values })
      .then(() => {
        message.success('Successfully logged in');
      })
      .catch((err: any) => {
        console.log(err);
        message.error(err?.data?.message);
      });
  };

  return (
    <AuthCardWrapper>
      <div className="login-title-group">
        <Text className="login-title">Welcome back</Text>
        <Text className="login-subtitle">Micro management for progressive teams</Text>
      </div>

      <Form className="login-form" onFinish={handleLogin} requiredMark='optional'>
        <Form.Item 
          name='email' 
          className="login-form-item" 
          label="Email" 
          rootClassName="label" 
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Email is required!' }]}
        >
          <TextInput placeholder="Email" />
        </Form.Item>
        <Form.Item 
          name='password' 
          className="login-form-item" 
          label="Password" 
          rootClassName="label" 
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <PasswordInput placeholder="Password" />
        </Form.Item>
        <div className="login-checkbox-forget-pass-group">
          <Form.Item className="login-checkbox">
            <CheckboxInput>Remember for 30 days</CheckboxInput>
          </Form.Item>
          <a className='login-forget-pass' href={routes.reset_password.path}>Forgot Password</a>
        </div>
        <div className="login-btn-group">
          <Button size='large' type='primary' htmlType='submit'>Sign In</Button>
          <Button size='large' icon={<GoogleIcon />}>
            Sign In with Google
          </Button>
        </div>
      </Form>
      <Text className="login-sign-up-text">
        Don't have any account? <a href={routes.sign_up.path}>Sign Up</a>
      </Text>
    </AuthCardWrapper>
  );
};

export default Login;
