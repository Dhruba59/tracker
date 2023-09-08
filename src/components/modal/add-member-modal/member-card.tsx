import { useState } from 'react';
import { Avatar, Dropdown, MenuProps, Space } from 'antd';
import AppButton from '@components/common/button';

import './member-card.css';
import { ArrowDown } from '@icons';
import { MEMBER_ROLE_TYPE } from '@models/members';

export interface MemberCardProps {
  member: any;
}

const items: MenuProps['items'] = [
  {
    key: MEMBER_ROLE_TYPE.OWNER,
    label: MEMBER_ROLE_TYPE.OWNER
  },
  {
    key: MEMBER_ROLE_TYPE.NOT_OWNER,
    label: MEMBER_ROLE_TYPE.NOT_OWNER
  },
];

const MemberCard = ({ member }: MemberCardProps) => {
  const [role, setRole] = useState<string>(member?.is_owner === 1 ? MEMBER_ROLE_TYPE.OWNER : MEMBER_ROLE_TYPE.NOT_OWNER);

  const handleDropdownChange = (e: any) => {
    setRole(e.key);
  };
  console.log(member);
  console.log(role);
  return (
    <div className='member-card-container'>
      <div className='member-card-col-1'>
        <Avatar />
        <div className='member-card-col-1-row-2'>
          <span className='member-card-name'>{member?.user.name}</span>
          <span className='member-card-email'>{member?.user.email}</span>
        </div>
      </div>
      <Dropdown className='member-card-role' menu={{ items, onClick: handleDropdownChange }} >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {role}
            <ArrowDown />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default MemberCard;