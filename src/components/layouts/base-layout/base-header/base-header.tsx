import { useState } from 'react';
import { Avatar, Badge, Dropdown, Layout, Menu, MenuProps, Popover, Typography } from 'antd';

import { LogOutIcon, LogoIcon, NotificationIcon, QuestionCircle, SettingsIcon, WorkspaceIcon } from '@icons';
import { userLogout } from '@services/auth-services';
import './base-header.css';

const { Header } = Layout;
const { Text } = Typography;

const BaseHeader = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleLogout = () => {
    userLogout();
  };

  const dropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className='header-popover-item'>
          <span className='header-popover-item-icon' >
            <Avatar size='small'/>
          </span>
          <Text>John doe</Text>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className='header-popover-item'>
          <span className='header-popover-item-icon'><LogOutIcon /></span>
          <Text>Log out</Text>
        </div>
      ),
      onClick: handleLogout
    },
  ];

  const headerMenuItems: MenuProps['items'] = [
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
      label: (
          <Dropdown menu={{ items: dropdownItems }} placement="bottomLeft" arrow>
            <span>John Doe</span>
          </Dropdown>
        ),
      className: 'header-menu-item',
      onClick: handleClick
    },
  ];

  return (
    <Header className='header'>
      <LogoIcon />
      <Menu className='header-menu' mode="horizontal" items={headerMenuItems} />   
    </Header>
  );
};

export default BaseHeader;