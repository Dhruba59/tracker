import React, { useState, useEffect, FC } from 'react';
import { Popover, PopoverProps, Tree, Typography } from 'antd';

import { CloseIcon } from '@icons';
import './pop-over.css';

const { Text } = Typography;
interface PopOverProps extends PopoverProps {
  title?: string;
  closeIcon?: boolean;
};

const AppPopover: FC<PopOverProps> = ({ title, content, open, closeIcon, children, ...rest}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(open ?? false);

  // useEffect(() => {
  //   setIsOpen(open ?? false);
  // }, [open]);

  // const handleClose = () => {
  //   setIsOpen(false);
  // };

  const titleContent = (
    <div className='popover-title-container'>
      <Text>{title}</Text>
      { closeIcon && <CloseIcon />}
    </div>
  );

  return (
    <Popover
      rootClassName='app-popover' 
      title={title && titleContent}
      content={content}
      {...rest}
    >
      {children}   
    </Popover>
  );
};

export default AppPopover;