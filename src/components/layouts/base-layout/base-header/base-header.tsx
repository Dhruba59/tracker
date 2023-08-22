import { Avatar, Badge, Layout, Menu, MenuProps } from 'antd';

import { LogoIcon, NotificationIcon, QuestionCircle, SettingsIcon, WorkspaceIcon } from '@icons';
import './base-header.css';

const { Header } = Layout;

const BaseHeader = () => {

  const items: MenuProps['items'] = [
    {
      key: 'questionCircle',
      icon: <QuestionCircle />,
      className: 'header-menu-item'
    },
    {
      key: 'app',
      icon: (
        <Badge count={22}>
          <NotificationIcon />
        </Badge>
      ),
      className: 'header-menu-item'
    },
    {
      key: 'avatar',
      icon: <Avatar />,
      label: 'John doe',
      className: 'header-menu-item'
    },
  ];

  return (
    <Header className='header'>
      <LogoIcon />
      <Menu className='header-menu' mode="horizontal" items={items} />
    </Header>
  );
};

export default BaseHeader;