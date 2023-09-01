import { Avatar, Dropdown, MenuProps } from 'antd';
import AppButton from '@components/common/button';

import './member-card.css';

export interface MemberCardProps {
  member: any;
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'admin',
  },
  {
    key: '2',
    label: 'editor',
  },
  {
    key: '3',
    label: 'viewer',
  },
];

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <div className='member-card-container'>
      <div className='member-card-col-1'>
        <Avatar />
        <div className='member-card-col-1-row-2'>
          <span className='member-card-name'>{member?.user.name}</span>
          <span className='member-card-email'>{member?.user.email}</span>
        </div>
      </div>
      <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
        <AppButton type='link'>{member?.is_owner ? 'admin' : 'not admin'}</AppButton>
      </Dropdown>
    </div>
  );
};

export default MemberCard;