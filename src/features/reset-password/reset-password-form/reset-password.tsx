import { FC, useEffect, SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Typography, message, Checkbox } from 'antd';

import './style.css';
import TextInput from '@components/common/InputFields/TextInput';
import { routes } from '@constants/route-constants';
import AuthCardWrapper from '@components/common/wrapper/AuthWrapper';
import Button from '@components/common/Button';
import { ResetPasswordProps } from '@models/reset-password';

const { Text } = Typography;

const ResetPassword: FC<ResetPasswordProps> = ({ setValues }) => {

  const handleResetPass = ({ email }: any) => {
    console.log('reset password');
    setValues({
      step: 2,
      email
    });
  };

  return (
    <AuthCardWrapper>
      <div className="resetpass-title-group">
        <Text className="resetpass-title">Forget Password!</Text>
        <Text className="resetpass-subtitle">No worries. we'll send you reset instructions.</Text>
      </div>

      <Form className="resetpass-form" onFinish={handleResetPass} requiredMark='optional'>
        <Form.Item 
          name='email' 
          className="resetpass-form-item" 
          label='Email' 
          rootClassName="label" 
          labelCol={{ span: 24 }}
          required
          rules={[{ required: true, message: 'Email is required!' }]}
        >
          <TextInput placeholder="Enter Email" />
        </Form.Item>
       
        <div className="resetpass-btn-group">
          <Button type='primary' size='large' htmlType='submit' className="">Send reset Link</Button>
          <a href={routes.login.path} className="resetpass-login">
            Back to login
          </a>
        </div>
      </Form>
    </AuthCardWrapper>
  );
};

export default ResetPassword;
