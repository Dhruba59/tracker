import { FC } from 'react';
import { Form, Typography, message } from 'antd';

import TextInput from '@components/common/input-fields/text-input';
import { routes } from '@constants/route-constants';
import AuthCardWrapper from '@components/common/wrapper/auth-form-wrapper';
import Button from '@components/common/button';
import { ResetPasswordProps } from '@models/reset-password';
import { requestResetPassword } from '@services/auth-services';
import './reset-password-form.css';

const { Text } = Typography;

const ResetPassword: FC<ResetPasswordProps> = ({ setValues }) => {

  const handleResetPass = async ({ email }: any) => {
    try {
      await requestResetPassword({ email });
      setValues({
        step: 2,
        email
      });
      message.success('A link has been sent to your email!');
    } catch(error: any) {
      message.error(error?.message ?? 'Something went wrong!');
    };
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
