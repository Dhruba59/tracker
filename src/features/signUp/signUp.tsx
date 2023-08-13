import { FC, useState } from 'react';
import { Form, Typography } from 'antd';

import './signUp.css';
import { Credentials } from '@models/auth-models';
import CheckboxInput from '@components/common/InputFields/Checkbox';
import PasswordInput from '@components/common/InputFields/PasswordInput';
import TextInput from '@components/common/InputFields/TextInput';
import { GoogleIcon } from '@icons';
import { userSignUp } from '@services/auth-services';
import { routes } from '@constants/route-constants';
import AuthCardWrapper from '@components/common/wrapper/AuthWrapper/AuthCardWrapper';
import Button from '@components/common/Button';

const { Text } = Typography;

const SignUp: FC = () => {
  const handleLogin = (values: Credentials) => {
    console.log(values);
    userSignUp({...values, designation: 'ssss'});
  };

  return (
    <AuthCardWrapper>
       <div className="signup-title-group">
        <Text className="signup-title">Welcome back</Text>
        <Text className="signup-subtitle">Micro management for progressive teams</Text>
      </div>

      <Form className="signup-form" onFinish={handleLogin} requiredMark='optional'>
        <Form.Item 
          name='name' 
          className="signup-form-item" 
          label="Name" 
          labelCol={{ span: 24 }}
          rules={[{ required: true, message: 'Name is required!' }]}
        >
          <TextInput placeholder="Email" />
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
          name='terms'
          className="signup-form-item signup-checkbox-group"
          rules={[{ required: true, message: 'Please read terms and conditions!' }]} >
          <CheckboxInput className='signup-checkbox' />
          <span>I accept <a className="signup-terms-condition">terms & condition</a></span>
        </Form.Item>
       
        <div className="signup-btn-group">
          <Button size='large' type='primary' htmlType='submit' className="">Sign Up</Button>
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
