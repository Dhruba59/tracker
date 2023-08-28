import AppTable from '@components/common/table';

import './members.css';
import { TableDataType } from '@models/members';
import { ColumnsType } from 'antd/es/table';
import { Avatar, Dropdown, MenuProps, Space, Typography } from 'antd';
import { DeleteIcon2, DownArrowIcon, PlusIcon } from '@icons';
import AddMemberModal from './add-member-modal';
import { useState } from 'react';
import PageHeader from '@components/common/page-header';

const { Text } = Typography;

const roleItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'Viewer',
  },
  {
    key: '2',
    label: 'Editor',
  },
  {
    key: '3',
    label: 'Admin',
  },
];

const RoleDropDown = () => (
  <Dropdown menu={{items: roleItems }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownArrowIcon />
      </Space>
    </a>
  </Dropdown>
);

const Members = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

const openModal = () => {
  setIsModalOpen(false);
};

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TableDataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: TableDataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const columns: ColumnsType<TableDataType> = [
    {
      title: <Text className='members-table-title'>Name</Text>,
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: <Text className='members-table-title'>Email</Text>,
      dataIndex: 'email',
    },
    {
      title: <Text className='members-table-title'>Role</Text>,
      dataIndex: 'role',
      render: (text, record) => <RoleDropDown />,
    },
    {
      title: <Text className='members-table-title'>Action</Text>,
      dataIndex: 'action',
      render: () => <DeleteIcon2 />
    },
  ];

  const data: TableDataType[] = [
    {
      key: '1',
      name: 'John Brown',
      email: 'acbd@gmail.com',
      role: 'New ',
      action: 'sssss'
    },
    {
      key: '2',
      name: 'John Brown',
      email: 'acbd@gmail.com',
      role: 'New ',
      action: 'sssss'
    },
    {
      key: '3',
      name: 'John Brown',
      email: 'acbd@gmail.com',
      role: 'New ',
      action: 'sssss'
    },
    {
      key: '4',
      name: 'John Brown',
      email: 'acbd@gmail.com',
      role: 'New ',
      action: 'sssss'
    },
  ];

  return (
    <div className='members-container'>
      <PageHeader 
        icon={<Avatar />} 
        title='Workspace Name'
        buttonName='Create Tracker'
        buttonIcon={<PlusIcon />}
        onButtonClick={openModal}
      />
      <div className='members-body-container'>
        <Text className='members-title'>Members</Text>
        <AppTable className='members-table' columns={columns} data={data} rowSelection={rowSelection}/>
        <AddMemberModal isOpen={isModalOpen} onClose={onCloseModal}/>
      </div>  
    </div>
    
  );
};

export default Members;