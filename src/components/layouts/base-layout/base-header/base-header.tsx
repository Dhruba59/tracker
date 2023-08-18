import { Avatar, Badge, Layout, Menu, MenuProps } from 'antd';
import React from 'react';

import './style.css';
import { LogoIcon, NotificationIcon, QuestionCircle, SettingsIcon, WorkspaceIcon } from '@icons';

const { Header, Footer, Sider, Content } = Layout;

const BaseHeader = () => {

  const items: MenuProps['items'] = [
    {
      key: 'questionCircle',
      icon: <QuestionCircle />,
      className: 'menu-item'
    },
    {
      key: 'app',
      icon: (
        <Badge count={22}>
          <NotificationIcon />
        </Badge>
      ),
      className: 'menu-item'
    },
    {
      key: 'avatar',
      icon: <Avatar />,
      label: 'John doe',
      className: 'menu-item'
    },
  ];

  return (
    <Header className='header'>
      <LogoIcon />
      <Menu className='menu' mode="horizontal" items={items} />
    </Header>
  );
};

export default BaseHeader;