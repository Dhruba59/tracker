import React, { useState, useEffect } from 'react';
import MemberCard from './member-card';
import { Divider, Form, Select, message } from 'antd';
import AppModal from '@components/common/modal';
import { AddMemberModalProps } from '@models/members';
import './add-member-modal.css';
import AppButton from '@components/common/button';
import { addWorkspaceMember, getMembersByWorkspaceId } from '@services/workspace-members-service';
import { ResponseType } from '@models/global-models';

export interface MemberFormValues {
  members: string[];
};

const AddMemberModal = ({ isOpen, onClose, members, memberOptions, workspaceId }: AddMemberModalProps) => {
  const [form] = Form.useForm();

  const onSubmit = ({ members }: MemberFormValues) => {
    const payload = {
      is_owner: false,
      workspace_id: workspaceId,
      user_ids: members
    };
    addWorkspaceMember(payload)
      .then((res: ResponseType) => {
        message.success(res?.message);
        form.resetFields();
      }).catch((error: any) => {
      message.error(error?.message ?? 'Unable to invite!');
    });
  };

  return (
    <AppModal title='Workspace Members' {...{isOpen, onClose}}>
      <div className='add-member-modal-container'>
        <Form onFinish={onSubmit} className='add-member-modal-form' form={form}>
          <Form.Item name='members' className='add-member-form-item'>
            <Select
              className='add-member-modal-input'
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              // onChange={handleChange}
              options={memberOptions}
              // onSelect={handleOnSelect}
            />
          </Form.Item>
          <AppButton htmlType='submit' type='primary' className='add-modal-invite-btn'>Invite</AppButton>
        </Form>
        <div className='add-member-modal-member-list'>
          {members?.map((member: any, index: number) => (
              index === members.length-1 ? 
                <MemberCard member={member}/> :
              <>
                <MemberCard member={member}/>
                <Divider />
              </>
            )
          )}
        </div>  
    </div>
    </AppModal> 
  );
};

export default AddMemberModal;