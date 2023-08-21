import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, message } from 'antd';

import Button from '@components/common/button';
import AuthFormWrapper from '@components/common/wrapper/auth-form-wrapper';
import { FullPageBlurLoading } from '@components/full-page-loading';
import { EmailIcon } from '@icons';
import { routes } from '@constants/route-constants';
import { verifyEmail } from '@services/auth-services';
import './email-verification.css';

const { Text } = Typography;

enum EMAIL_VERIFICATION_STATUS {
  VERIFIED = 'verified',
  LOADING = 'loading',
  NOT_VERIFIED = 'not_verified'
}

const EmailVerification = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState<EMAIL_VERIFICATION_STATUS>(EMAIL_VERIFICATION_STATUS.NOT_VERIFIED);

  useEffect(() => {
    (async () => {
      try {
        setVerificationStatus(EMAIL_VERIFICATION_STATUS.LOADING);
        await verifyEmail({ token: token ?? '' });
        setVerificationStatus(EMAIL_VERIFICATION_STATUS.VERIFIED);
      } catch (error: any) {
        message.error(error?.message ?? 'Something went wrong!');
        setVerificationStatus(EMAIL_VERIFICATION_STATUS.NOT_VERIFIED);
      }
    })(); 
  }, []);
  
  if(verificationStatus === EMAIL_VERIFICATION_STATUS.LOADING) {
    return <FullPageBlurLoading />;
  }

  return (
    <AuthFormWrapper className='email-veriifcation-main-container'>
      <div className='email-verification-icon'><EmailIcon/></div>
      <Text className='email-verification-text'> 
        { verificationStatus === EMAIL_VERIFICATION_STATUS.VERIFIED ? 
          'Your email has verified!' : 'Not Verified, try again!' 
        }
      </Text>
      <Button type='link' href={routes.login.path}>Go to login</Button>
    </AuthFormWrapper>
  );
};

export default EmailVerification;