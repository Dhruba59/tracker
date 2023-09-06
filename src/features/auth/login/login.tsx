import { FC, useState } from 'react';
import { Form, Typography, message } from 'antd';

import { Credentials } from '@models/auth-models';
import CheckboxInput from '@components/common/input-fields/checkbox';
import PasswordInput from '@components/common/input-fields/password-input';
import TextInput from '@components/common/input-fields/text-input';
import { GoogleIcon } from '@icons';
import { userLogin } from '@services/auth-services';
import { routes } from '@constants/route-constants';
import AuthFormWrapper from '@components/common/wrapper/auth-form-wrapper';
import Button from '@components/common/button';
import { ResponseType } from '@models/global-models';
import './login.css';
import { getWorkspaceList } from '@services/workspace-services';
import { useNavigate } from 'react-router-dom';
import { manageRouteAfterLogin } from '@helpers/global-helpers';

const { Text } = Typography;

const Login: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async (values: Credentials) => {
    try {
      setIsLoading(true);
      const res: ResponseType = await userLogin(values);
      form.resetFields();
      message.success(res?.message);
      manageRouteAfterLogin();
    } catch (error: any) {
      message.error(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper>
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
          <Button 
            size='large' 
            type='primary' 
            htmlType='submit' 
            loading={isLoading}
          >
            Sign In
          </Button>
          <Button size='large' icon={<GoogleIcon />}>
            Sign In with Google
          </Button>
        </div>
      </Form>
      <Text className="login-sign-up-text">
        Don't have any account? <a href={routes.sign_up.path}>Sign Up</a>
      </Text>
    </AuthFormWrapper>
  );
};

export default Login;
