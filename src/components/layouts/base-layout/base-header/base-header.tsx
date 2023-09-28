import { useState, useEffect } from 'react';
import { Avatar, Badge, Dropdown, Layout, Menu, MenuProps, Popover, Tooltip, Typography } from 'antd';

import { LogOutIcon, LogoIcon, NotificationIcon, QuestionCircle, SettingsIcon, WorkspaceIcon } from '@icons';
import { userLogout } from '@services/auth-services';
import './base-header.css';
import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/route-constants';
import { getUserProfile } from '@services/user-services';
import { ResponseType } from '@models/global-models';
import { useUserContext } from '@contexts/user-context';
import UserAvatar from '@components/common/user-avatar';

const { Header } = Layout;
const { Text } = Typography;

const BaseHeader = () => {
  const {user, setUser} = useUserContext();
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
            <UserAvatar size='small' src={user?.profile_image} title={user?.name}/>
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
      icon: <QuestionCircle />,
      disabled: true,
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
      label: (
          <Dropdown menu={{ items: dropdownItems }} placement="bottomLeft" arrow>
            <div>
              <UserAvatar size='default' src={user?.profile_image} title={user?.name}/>
              <span style={{marginLeft: '8px'}}>{user?.name}</span>
            </div>
          </Dropdown>
        ),
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