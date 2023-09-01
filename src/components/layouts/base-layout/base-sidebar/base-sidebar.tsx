import React, { useEffect, useState } from 'react';
import { Layout, MenuProps, Menu, Form, message } from 'antd';

import { DashboardIcon, ArrowDown, PlusIcon, SettingsIcon, WorkspaceIcon } from '@icons';
import { createWorkspace, getWorkspaceList } from '@services/workspace-services';
import { ResponseType } from '@models/global-models';
import TextInput from '@components/common/input-fields/text-input';
import './base-sidebar.css';
import { routes } from '@constants/route-constants';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceContext } from '@contexts/workspace-context';

const { Sider } = Layout;

const BaseSidebar: React.FC = () => {
  const [workspaces, setWorkspaces] = useState(); 
  const [isWorkspaceInputOpen, setIsWorkspaceInputOpen] = useState<boolean>(false); 
  const [ form ] = Form.useForm();
  const navigate = useNavigate();
  const {workspaceId, setWorkspaceId} = useWorkspaceContext();


  const fetchWorkspacesData = async () => {
    try{
      const workspaceData: ResponseType = await getWorkspaceList();
      setWorkspaces(workspaceData?.payload);
    } catch(error: any) {
      console.log('error');
    }
  };

  const createNewWorkspace = async () => {
    const title = form.getFieldValue('title');
    try{
      const res: ResponseType = await createWorkspace({ title });
      message.success(res?.message ?? 'Successfully created workspace!');
      form.resetFields();
      setIsWorkspaceInputOpen(false);
    } catch(error: any) {
      message.error(error?.message ?? 'Unable to create workspace!');
    } finally {
      await fetchWorkspacesData();
    }
  };

  const handleWorkspaceClick = (id: string) => {
    setWorkspaceId(id);
    navigate(`${routes.workspace.path}/${id}`);
  };

  const getMenuItems = (data: any) => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        icon: <DashboardIcon />,
        label: 'Dashboard',
        onClick: () => navigate(routes.dashboard.path)
      },
      {
        key: '2',
        icon: <SettingsIcon />,
        label: 'Settings',
        onClick: () => navigate(routes.settings.path)
      },
      {
        key: '3',
        label: (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                <Form.Item name='title'>
                  <TextInput onPressEnter={createNewWorkspace} className='sidebar-workspace-create-input' />
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
        
        expandIcon: <ArrowDown />,
        children: [
          {
            key: `${workspace.id}members`,
            label: 'Members',
            onClick: () => navigate(`${routes.workspace.path}/${workspace.id}/members`)
          },
          {
            key: `${workspace.id}archive`,
            label: 'Archive'
          }
        ]
      });
    });
    return items;
  };
  
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
      />
    </Sider>
  );
};

export default BaseSidebar;