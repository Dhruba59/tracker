import { EmailIcon } from '@icons';
import { Typography } from 'antd';

import './style.css';
import AuthCardWrapper from '@components/common/wrapper/AuthWrapper';
import Button from '@components/common/button-component';
import { ConfirmationCardProps } from '@models/reset-password';

const { Text } = Typography;

const ConfirmationCard = ({ email }: ConfirmationCardProps) => {
  return (
    <AuthCardWrapper className='confirmation-card-main-container'>
      <div className='confirmation-card-icon'><EmailIcon/></div>
      <Text className='confirmation-card-text'>We sent a recovery link to you at</Text>
      <Text className='confirmation-card-email'>{email}</Text>
      <Button type='link' className='confirmation-card-resend-link'>Resend Link</Button>
    </AuthCardWrapper>
  );
};

export default ConfirmationCard;