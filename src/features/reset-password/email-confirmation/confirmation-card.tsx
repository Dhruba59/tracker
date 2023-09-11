import { EmailIcon } from '@icons';
import { Typography, message } from 'antd';

import AuthCardWrapper from '@components/common/wrapper/auth-form-wrapper';
import Button from '@components/common/button';
import { ConfirmationCardProps } from '@models/reset-password';
import './confirmation-card.css';
import { requestResetPassword } from '@services/auth-services';
import { useState } from 'react';

const { Text } = Typography;

const ConfirmationCard = ({ email }: ConfirmationCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleResetPass = async () => {
    try {
      setIsLoading(true);
      await requestResetPassword({ email });
      message.success('Link has been sent again!');
    } catch(error: any) {
      message.error(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <AuthCardWrapper className='confirmation-card-main-container'>
      <div className='confirmation-card-icon'><EmailIcon/></div>
      <Text className='confirmation-card-text'>We sent a recovery link to you at</Text>
      <Text className='confirmation-card-email'>{email}</Text>
      <Button 
        type='link' 
        className='confirmation-card-resend-link' 
        loading={isLoading}
        onClick={handleResetPass}
      >
        Resend Link
        </Button>
    </AuthCardWrapper>
  );
};

export default ConfirmationCard;