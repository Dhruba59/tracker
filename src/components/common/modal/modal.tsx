import React, { useState, useEffect } from 'react';
import { Button, Divider, Modal, ModalProps, Typography } from 'antd';

import './modal.css';
import { CloseIcon2 } from '@icons';

const { Text } = Typography;

export interface AppModalProps extends ModalProps{
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const AppModal: React.FC<AppModalProps> = ({isOpen, title, onClose, children, ...rest}) => {
  const [open, setOpen] = useState<boolean>(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal
      centered
      open={open}
      // onOk={() => setOpen(false)}
      // onCancel={() => setOpen(false)}
      width={1000}
      footer={false}
      closable={false}
      closeIcon={<CloseIcon2 />}
      className='modal-container'
    >
      <div className='modal-col-1'>
          
      </div>
      <div className='modal-col-2'>
        <div className='modal-header'>
          <Text className='modal-header-title'>{title}</Text>
          <CloseIcon2 className='modal-header-close-btn' onClick={closeModal}/>
        </div>
        <Divider />
        <div className=''>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default AppModal;