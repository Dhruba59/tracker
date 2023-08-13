import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, MenuProps, Menu, theme } from 'antd';

import './style.css';
import { DashboardIcon, ExpandIcon, PlusIcon, SettingsIcon, WorkspaceIcon } from '@icons';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = (index * 4) + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const items3: MenuProps['items'] = [
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
    className: 'workspace-section',
    label: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
        <span>Workspace</span>
        <span style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <PlusIcon />
        </span>
      </div>
    ),
    // children: [
    //   {
    //     key: '9',
    //     label: 'workspace 1',
    //   },
    //   {
    //     key: '93',
    //     label: 'workspace 2',
    //   }
    // ]
  },
  {
    key: '212',
    className: 'workspace-item',
    label: (
      <span className='workspace-item-label'>
        Workspace 2
      </span>
    ),
    expandIcon: <ExpandIcon/>,
    children: [
      {
        key: '9',
        label: 'Members',
        className: 'workspace-child'
      },
      {
        key: '93',
        label: 'Archive',
        className: 'workspace-child'
      }
    ]
  },
  {
    key: '22',
    className: 'workspace-item',
    label: (
      <span className='workspace-item-label'>
        Workspace 2
      </span>
    ),
    expandIcon: <ExpandIcon/>,
    children: [
      {
        key: '9',
        label: 'Members',
        className: 'workspace-child'
      },
      {
        key: '93',
        label: 'Archive',
        className: 'workspace-child'
      }
    ]
  }
];

const BaseSidebar: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header> */}
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
          className='sidebar-menu'
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items3}
          />
        </Sider>
        {/* <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout> */}
      </Layout>
    </Layout>
  );
};

export default BaseSidebar;