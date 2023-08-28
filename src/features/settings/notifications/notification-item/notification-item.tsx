import CheckboxInput from '@components/common/input-fields/checkbox';
import { Avatar, Col, Dropdown, MenuProps, Row, Typography } from 'antd';
import React from 'react';
import AppButton from '@components/common/button';
import './notification-item.css';
const { Text } = Typography;

const actionItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div className='notifications-dropdown-item'>
        <CheckboxInput />
        <Text>All</Text>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className='notifications-dropdown-item'>
        <CheckboxInput />
        <Text>All</Text>
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <div className='notifications-dropdown-item'>
        <CheckboxInput />
        <Text>All</Text>
      </div>
    ),
  },
];

const NotificationItem = () => {
  return (
    <div className='notification-item-container'>
      <div className='notification-item-col-1'>
        <Avatar size='large'/>
        <Text className='notification-item-title'>Vivasoft Workspace</Text>
      </div>
      <Dropdown menu={{ items: actionItems }} placement="bottomLeft">
        <AppButton type='link' className='notification-action-btn'>Manage</AppButton>
      </Dropdown>
    </div>   
  );
};

export default NotificationItem;