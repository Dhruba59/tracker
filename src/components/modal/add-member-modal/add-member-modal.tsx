import React, { useState, useEffect, Fragment } from 'react';
import MemberCard from './member-card';
import { Divider, Dropdown, Form, MenuProps, Select, Space, message } from 'antd';
import AppModal from '@components/common/modal';
import { AddMemberModalProps, MEMBER_ROLE_TYPE } from '@models/members';
import './add-member-modal.css';
import AppButton from '@components/common/button';
import { addWorkspaceMember, getMembersByWorkspaceId } from '@services/workspace-members-service';
import { ResponseType } from '@models/global-models';
import { ArrowDown, EditIcon, SearchIcon } from '@icons';
import SelectDropdown from '@components/common/select-dropdown';
import { SelectDropdownValueType } from '@components/common/select-dropdown/select-dropdown';

const items: MenuProps['items'] = [
  {
    key: MEMBER_ROLE_TYPE.OWNER,
    label: 'Owner'
  },
  {
    key: MEMBER_ROLE_TYPE.NOT_OWNER,
    label: 'Not Owner',
  }
];

export interface MemberFormValues {
  memberIds: string[];
  role: MEMBER_ROLE_TYPE;
};
export interface MembersFormValues {
  members: MemberFormValues;
};

const AddMemberModal = ({ isOpen, onClose, members, memberOptions, workspaceId, onMemberAddUpdate }: AddMemberModalProps) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onInviteInputChange = (values: SelectDropdownValueType) => {
    setValues(values);
  };

  const onSubmit = ({ members }: MembersFormValues) => {
    console.log(members);
    const payload = {
      is_owner: members?.role === MEMBER_ROLE_TYPE.OWNER ? 1 : 0,
      workspace_id: workspaceId,
      user_ids: members.memberIds
    };
    setIsLoading(true);
    addWorkspaceMember(payload)
      .then((res: ResponseType) => {
        message.success(res?.message);
        form.resetFields();
        onMemberAddUpdate?.();
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
              defaultDropDownSelect={MEMBER_ROLE_TYPE.OWNER}
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
              <MemberCard key={index} member={member}/> :
            <Fragment key={index}>
              <MemberCard member={member}/>
              <Divider />
            </Fragment>
          ))}
        </div>  
      </div>
    </AppModal> 
  );
};

export default AddMemberModal;