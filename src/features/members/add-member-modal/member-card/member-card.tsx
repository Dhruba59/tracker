import { Avatar, Dropdown, MenuProps } from 'antd';
import AppButton from '@components/common/button';

import './member-card.css';

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

const MemberCard = () => {
  return (
    <div className='member-card-container'>
      <div className='member-card-col-1'>
        <Avatar />
        <div className='member-card-col-1-row-2'>
          <span className='member-card-name'>Shafiul hasan</span>
          <span className='member-card-email'>nieves.lorenzo@example.com</span>
        </div>
      </div>
      <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
        <AppButton type='link'>admin</AppButton>
      </Dropdown>
    </div>
  );
};

export default MemberCard;