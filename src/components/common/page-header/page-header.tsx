import { Avatar } from 'antd';
import React, { ReactNode } from 'react';
import AppButton from '../button';
import './page-header.css';

export interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
  buttonName?: string;
  buttonIcon?: ReactNode;
  onButtonClick?: () => void;
};

const PageHeader = (props: PageHeaderProps) => {
  const { icon, title, buttonName, buttonIcon, onButtonClick } = props;
  return (
    <div className='page-header-container'>
      <div className='page-header-col-1'>
        {icon}
        <p>{title}</p>
      </div>
      {buttonName && (
        <div className='page-header-col-2'>
          <AppButton
            className='page-header-btn' 
            icon={buttonIcon} 
            onClick={onButtonClick}>
              {buttonName}
            </AppButton>
        </div>
      )}    
    </div>
  );
};

export default PageHeader;