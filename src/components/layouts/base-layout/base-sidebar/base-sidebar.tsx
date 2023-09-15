import React, { useEffect, useState } from 'react';
import { Layout, MenuProps, Menu, Form, message, Input } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { DashboardIcon, ArrowDown, PlusIcon, SettingsIcon, WorkspaceIcon } from '@icons';
import { createWorkspace, getWorkspaceList } from '@services/workspace-services';
import { ResponseType } from '@models/global-models';
import { routes } from '@constants/route-constants';
import './base-sidebar.css';

const { Sider } = Layout;

const BaseSidebar: React.FC = () => {
  const [workspaces, setWorkspaces] = useState(); 
  const [isWorkspaceInputOpen, setIsWorkspaceInputOpen] = useState<boolean>(false); 
  const [ form ] = Form.useForm();
  const { workspaceId } = useParams();
  const { pathname } = useLocation();
  const [sidebarActiveKey, setSidebarActiveKey] = useState<string[]>(workspaceId ? [workspaceId] : []);
  const navigate = useNavigate();

  const fetchWorkspacesData = async () => {
    try{
      const workspaceData: ResponseType = await getWorkspaceList();
      setWorkspaces(workspaceData?.payload);
    } catch(error: any) {
      console.log('error');
    }
  };

  const createNewWorkspace = async () => {
    if (form.getFieldError('title') && form.getFieldError('title').length === 0 && form.getFieldValue('title') && form.getFieldValue('title').trim() !== '') {
      const title = form.getFieldValue('title')?.trim();
      try {
        const res: ResponseType = await createWorkspace({ title });
        message.success(res?.message ?? 'Successfully created workspace!');
        form.resetFields();
        setIsWorkspaceInputOpen(false);
      } catch (error: any) {
        message.error(error?.message ?? 'Unable to create workspace!');
      } finally {
        await fetchWorkspacesData();
      }
    }
  };

  const handleWorkspaceClick = (id: string) => {
    setSidebarActiveKey([id]);
    navigate(`${routes.workspace.path}/${id}`);
    setIsWorkspaceInputOpen(false);
  };

  const manageWorkspaceActiveKeyList = (workspaceId: string) => {
    if (!sidebarActiveKey.includes(workspaceId)) {
      const updatedKeys = [...sidebarActiveKey, workspaceId];
      setSidebarActiveKey(updatedKeys);
    } else {
      const updatedKeys = sidebarActiveKey.filter((key) => key !== workspaceId);
      setSidebarActiveKey(updatedKeys);
    }
  };

  const handleWorkspaceArrowClick = (id: string) => {
    setIsWorkspaceInputOpen(false);
    manageWorkspaceActiveKeyList(id);
  };  

  const getMenuItems = (data: any) => {
    const items: MenuProps['items'] = [
      {
        key: 'dashboard',
        icon: <DashboardIcon />,
        label: 'Dashboard',
        onClick: () => navigate(routes.dashboard.path)
      },
      {
        key: 'settings',
        icon: <SettingsIcon />,
        label: 'Settings',
        onClick: () => navigate(routes.settings.path)
      },
      {
        key: 'workspace-add',
        label: (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'white', justifyContent: 'space-between', width: '100%', paddingInline: '24px' }}>
              <WorkspaceIcon />
              <span style={{ marginLeft: '4px' }}>Workspace</span>
              <span
                onClick={() => setIsWorkspaceInputOpen(!isWorkspaceInputOpen)}
                style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}
              >
                <PlusIcon />
              </span>
            </div>
            {isWorkspaceInputOpen && (
              <Form form={form} className='sidebar-workspace-form'>
                <Form.Item name='title' rules={[{required: true, message: 'Title required!'}]}>
                  <Input size='small' className='sidebar-workspace-input' onPressEnter={createNewWorkspace} placeholder='Workspace name'/>
                </Form.Item>
              </Form>
            )}
          </div>
        ),
        className: 'sidebar-workspace-create-item',
      },
    ];
  
    data?.forEach((workspace: any) => {
      items.push({
        key: workspace.id,
        label: (
          <span 
            className='sidebar-workspace-item-label' 
            onClick={() => handleWorkspaceClick(workspace.id)} >
            {workspace.title}
          </span>
        ),
        
        expandIcon: <ArrowDown style={{
          height: '100%',
          transform: sidebarActiveKey.includes(workspace.id)
              ? 'rotate(180deg)'
              : 'rotate(0deg)', 
            transition: 'transform 0.3s ease',
          }} 
          onClick={() => handleWorkspaceArrowClick(workspace.id)} />,
        
        children: [
          {
            key: `${workspace.id}members`,
            label: 'Members',
            onClick: () => navigate(`${routes.workspace.path}/${workspace.id}/members`)
          },
          {
            key: `${workspace.id}archive`,
            label: 'Archive',
            onClick: () => navigate(`/${workspace.id}/archive`)
          }
        ]
      });
    });
    return items;
  };

  const handleMenuClick = (e: any) => {
    if(e.key !== 'workspace-add'){
      setIsWorkspaceInputOpen(false);
    }
  };

  useEffect(() => {
    if(pathname.includes(routes.settings.path)){
      setSidebarActiveKey(['settings']);
    }
    else if(pathname.includes(routes.dashboard.path)){
      setSidebarActiveKey(['dashboard']);
    }
    else if(pathname.includes(routes.members.path)){
      setSidebarActiveKey([workspaceId!, `${workspaceId}members`]);
    }
    else if(pathname.includes(routes.archive.path)){
      setSidebarActiveKey([workspaceId!, `${workspaceId}archive`]);
    }
  }, [pathname]);
  
  useEffect(() => {
    fetchWorkspacesData();
  }, []);

  return (
    <Sider className='sidebar-sider'>
      <Menu
        className='sidebar-menu'
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        items={getMenuItems(workspaces)}
        onClick={handleMenuClick}
        selectedKeys={sidebarActiveKey}
        openKeys={sidebarActiveKey}
      />
    </Sider>
  );
};

export default BaseSidebar;