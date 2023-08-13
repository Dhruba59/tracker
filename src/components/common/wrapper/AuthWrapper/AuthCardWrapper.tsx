import{ FC } from 'react';
import { Outlet } from 'react-router-dom';

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