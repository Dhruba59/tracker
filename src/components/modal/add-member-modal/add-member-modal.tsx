import React, { useState, useEffect } from 'react';
import MemberCard from './member-card';
import { Divider, Dropdown, Form, MenuProps, Select, Space, message } from 'antd';
import AppModal from '@components/common/modal';
import { AddMemberModalProps } from '@models/members';
import './add-member-modal.css';
import AppButton from '@components/common/button';
import { addWorkspaceMember, getMembersByWorkspaceId } from '@services/workspace-members-service';
import { ResponseType } from '@models/global-models';
import { ArrowDown, EditIcon, SearchIcon } from '@icons';
import SelectDropdown from '@components/common/select-dropdown';
import { SelectDropdownValueType } from '@components/common/select-dropdown/select-dropdown';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];

export interface MemberFormValues {
  members: string[];
};

const AddMemberModal = ({ isOpen, onClose, members, memberOptions, workspaceId }: AddMemberModalProps) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onInviteInputChange = (values: SelectDropdownValueType) => {
    console.log(values);
    setValues(values);
  };

  const onSubmit = ({ members }: MemberFormValues) => {
    const payload = {
      is_owner: false,
      workspace_id: workspaceId,
      user_ids: members
    };
    setIsLoading(true);
    addWorkspaceMember(payload)
      .then((res: ResponseType) => {
        message.success(res?.message);
        form.resetFields();
      }).catch((error: any) => {
        message.error(error?.message ?? 'Unable to invite!');
      }).finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AppModal title='Workspace Members' {...{isOpen, onClose}}>
      <div className='add-member-modal-container'>
        <Form onFinish={onSubmit} className='add-member-modal-form' form={form}>
          <Form.Item name='members' className='add-member-form-item'>
            <SelectDropdown 
              onChange={onInviteInputChange} 
              dropdownItems={items} 
              selectOptions={memberOptions} 
              prefixIcon={<SearchIcon />}
            />
          </Form.Item>
          <AppButton
            htmlType='submit' 
            type='primary' 
            loading={isLoading} 
            className='add-modal-invite-btn'>
              Invite
            </AppButton>
        </Form>
        <div className='add-member-modal-member-list'>
          {members?.map((member: any, index: number) => (
            index === members.length-1 ? 
              <MemberCard member={member}/> :
            <>
              <MemberCard member={member}/>
              <Divider />
            </>
          ))}
        </div>  
      </div>
    </AppModal> 
  );
};

export default AddMemberModal;