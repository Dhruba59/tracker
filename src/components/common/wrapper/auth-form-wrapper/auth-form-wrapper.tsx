import{ FC } from 'react';

import { AuthWrapperProps } from '@models/wrapper';
import './auth-form-wrapper.css';

const AuthFormWrapper: FC<AuthWrapperProps>= ({ className, children }) => {
  return (
    <div className={`auth-wrapper ${className}`}>
      {children}
    </div>
  );
};

export default AuthFormWrapper;