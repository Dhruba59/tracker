import React from 'react';
import MemberCard from './member-card';
import { Divider } from 'antd';
import AppModal from '@components/common/modal';
import { AddMemberModalProps } from '@models/members';
import './add-member-modal.css';

const AddMemberModal = ({isOpen, onClose}: AddMemberModalProps) => {
  return (
    <AppModal title='Workspace Members' {...{isOpen, onClose}}>
      <div className='add-member-modal-container'>
        <MemberCard />
        <Divider />
        <MemberCard />
        <Divider />
        <MemberCard />
    </div>
    </AppModal>
    
  );
};

export default AddMemberModal;