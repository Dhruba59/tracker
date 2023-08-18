import { FC, useState } from 'react';
import { Form, Typography, message } from 'antd';

import './style.css';
import { Credentials } from '@models/auth-models';
import CheckboxInput from '@components/common/inputfields/checkbox';
import PasswordInput from '@components/common/inputfields/password-input';
import TextInput from '@components/common/inputfields/text-input';
import { GoogleIcon } from '@icons';
import { userSignUp } from '@services/auth-services';
import { routes } from '@constants/route-constants';
import AuthCardWrapper from '@components/common/wrapper/AuthWrapper/auth-card-wrapper';
import Button from '@components/common/button';
import { ResponseType } from '@models/global-models';

const { Text } = Typography;

const SignUp: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleLogin = async (values: Credentials) => {
    setIsLoading(true);
    try {
      const res: ResponseType = await userSignUp(values);
      form.resetFields();
      message.success('An verification mail has sent to your email! Please verfiy!');     
    } catch(error: any) {
      message.error(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCardWrapper>
       <div className="signup-title-group">
        <Text className="signup-title">Welcome back</Text>
        <Text className="signup-subtitle">Micro management for progressive teams</Text>
      </div>

      <Form form={form} className="signup-form" onFinish={handleLogin} requiredMark='optional'>
        <Form.Item 
          name='name' 
          className="signup-form-item" 
          label="Name" 
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Name is required!' }]}
        >
          <TextInput placeholder="Name" />
        </Form.Item>
        <Form.Item 
          name='email' 
          className="signup-form-item" 
          label="Email"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Email is required!' }]}
        >
          <TextInput placeholder="Email" />
        </Form.Item>
        <Form.Item 
          name='password' 
          className="signup-form-item" 
          label="Password"
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <PasswordInput placeholder="Password" />
        </Form.Item>
          <Form.Item 
            name='isTermAccepted'
            className="signup-form-item signup-checkbox-group"
            valuePropName="checked"
            //
            rules={[
              {
                validator: (_, value) => (
                  value ? Promise.resolve() : Promise.reject(new Error('Please accept terms & conditions!'))),
              },
            ]}
          >
            <CheckboxInput className='signup-checkbox'>
              <span>I accept <a className="signup-terms-condition">terms & condition</a></span>
            </CheckboxInput>          
          </Form.Item>
      
        <div className="signup-btn-group">
          <Button 
            size='large' 
            type='primary' 
            htmlType='submit' 
            loading={isLoading}
            >
              Sign Up
            </Button>
          <Button size='large' icon={<GoogleIcon />} className="">
            Sign Up with Google
          </Button>
        </div>
      </Form>
      <Text className="signup-text">
        Already have an account? <a href={routes.login.path}>Sign In</a>
      </Text>
    </AuthCardWrapper>
  );
};

export default SignUp;
