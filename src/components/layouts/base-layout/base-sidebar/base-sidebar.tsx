import React from 'react';
import { Layout, MenuProps, Menu, theme } from 'antd';

import { DashboardIcon, ExpandIcon, PlusIcon, SettingsIcon, WorkspaceIcon } from '@icons';
import './base-sidebar.css';

const { Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <DashboardIcon />,
    label: 'Dashboard'
  },
  {
    key: '2',
    icon: <SettingsIcon />,
    label: 'Settings'
  },
  {
    key: '3',
    icon: <WorkspaceIcon />,
    label: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
        <span>Workspace</span>
        <span style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <PlusIcon />
        </span>
      </div>
    ),
  },
  {
    key: '212',
    label: (
      <span className='sidebar-workspace-item-label'>
        Workspace 2
      </span>
    ),
    expandIcon: <ExpandIcon/>,
    children: [
      {
        key: '9',
        label: 'Members',
      },
      {
        key: '93',
        label: 'Archive',
      }
    ]
  },
  {
    key: '22',
    label: (
      <span className='sidebar-workspace-item-label'>
        Workspace 2
      </span>
    ),
    expandIcon: <ExpandIcon/>,
    children: [
      {
        key: '9',
        label: 'Members'
      },
      {
        key: '93',
        label: 'Archive'
      }
    ]
  }
];

const BaseSidebar: React.FC = () => {
  return (
    <Sider className='sidebar-sider'>
      <Menu
        className='sidebar-menu'
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
      />
    </Sider>
  );
};

export default BaseSidebar;