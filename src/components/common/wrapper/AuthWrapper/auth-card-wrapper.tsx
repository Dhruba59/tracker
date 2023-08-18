import{ FC } from 'react';

import './style.css';
import { AuthWrapperProps } from '@models/wrapper';

const AuthWrapper: FC<AuthWrapperProps>= ({ className, children }) => {
  return (
    <div className={`auth-wrapper ${className}`}>
      {children}
    </div>
  );
};

export default AuthWrapper;