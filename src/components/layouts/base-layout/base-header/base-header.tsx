import { useState, useEffect } from 'react';
import { Avatar, Badge, Dropdown, Layout, Menu, MenuProps, Popover, Tooltip, Typography } from 'antd';

import { LogOutIcon, LogoIcon, NotificationIcon, QuestionCircle, SettingsIcon, WorkspaceIcon } from '@icons';
import { userLogout } from '@services/auth-services';
import './base-header.css';
import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/route-constants';
import { getUserProfile } from '@services/user-services';
import { ResponseType } from '@models/global-models';

const { Header } = Layout;
const { Text } = Typography;

const BaseHeader = () => {
  const [user, setUser] = useState<any>();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const fetchUser = () => {
    getUserProfile()
    .then((res: ResponseType) => setUser(res.payload))
    .catch((error: any) => console.log('error fetching user!'));
  };

  const handleLogout = () => {
    userLogout();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const dropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className='header-popover-item'>
          <span className='header-popover-item-icon' >
            <Avatar size='small'/>
          </span>
          <Text>{user?.name}</Text>
        </div>
      ),
      onClick: () => navigate(routes.settings.path)
    },
    {
      key: '2',
      label: (
        <div className='header-popover-item'>
          <span className='header-popover-item-icon'><LogOutIcon style={{marginLeft: '4px'}}/></span>
          <Text>Log out</Text>
        </div>
      ),
      onClick: handleLogout
    },
  ];

  const headerMenuItems: MenuProps['items'] = [
    {
      key: 'questionCircle',
      icon: (
        <Tooltip title={
          <div style={{ textAlign: 'center' }}>
            For any kind of help mail at example@mail.com
          </div>}>
          <QuestionCircle />
        </Tooltip>
      ),
      className: 'header-menu-item'
    },
    {
      key: 'app',
      icon: (
        <div>
          <Badge style={{height: '100%'}}>
            <NotificationIcon />
          </Badge>
        </div>
      
      ),
      className: 'header-menu-item',
      disabled: true
    },
    {
      key: 'avatar',
      // icon: <Avatar />,
      label: (
          <Dropdown menu={{ items: dropdownItems }} placement="bottomLeft" arrow>
            <div>
              <Avatar />
              <span style={{marginLeft: '8px'}}>{user?.name}</span>
            </div>
          </Dropdown>
        ),
      // className: 'header-menu-item',
      onClick: handleClick
    },
  ];

  return (
    <Header className='header'>
      <LogoIcon onClick={() => navigate(routes.dashboard.path)} style={{cursor: 'pointer'}}/>
      <Menu className='header-menu' mode="horizontal" items={headerMenuItems} />   
    </Header>
  );
};

export default BaseHeader;