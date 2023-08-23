import { Avatar, Badge, Layout, Menu, MenuProps, Popover, Typography } from 'antd';

import { LogOutIcon, LogoIcon, NotificationIcon, QuestionCircle, SettingsIcon, WorkspaceIcon } from '@icons';
import './base-header.css';
import { useState } from 'react';
import { userLogout } from '@services/auth-services';

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

  const content = (
    <div className='header-popover-content-container'>
      <div className='header-popover-item'>
        <span className='header-popover-item-icon' >
          <Avatar size='small'/>
        </span>
        <Text>John doe</Text>
      </div>
      <div className="header-popover-item" onClick={handleLogout}>
        <span className='header-popover-item-icon' >
          <LogOutIcon />
        </span>
        <Text>Logout</Text>
      </div>
    </div>
  );

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
      label: (
        <div>
          <span>John Doe</span>
          <Popover 
            rootClassName='header-popover' 
            open={isPopupOpen} 
            content={content} 
            placement='bottomLeft'/>
        </div> ),
      className: 'header-menu-item',
      onClick: handleClick
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