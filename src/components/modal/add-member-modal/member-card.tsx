import { useState } from 'react';
import { Avatar, Dropdown, MenuProps, Space } from 'antd';
import AppButton from '@components/common/button';

import './member-card.css';
import { ArrowDown } from '@icons';

export interface MemberCardProps {
  member: any;
}

const items: MenuProps['items'] = [
  {
    key: 'admin',
    label: 'admin',
  },
  {
    key: 'editor',
    label: 'editor',
  },
  {
    key: 'viewer',
    label: 'viewer',
  },
];

const MemberCard = ({ member }: MemberCardProps) => {
  const [role, setRole] = useState<string>();

  const handleDropdownChange = (e: any) => {
    setRole(e.key);
  };

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