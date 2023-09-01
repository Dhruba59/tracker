
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Avatar, Dropdown, MenuProps, Space, Typography, message } from 'antd';

import { MEMBER_ROLE_TYPE, TableDataType } from '@models/members';
import { DeleteIcon2, DownArrowIcon, PlusIcon } from '@icons';
import AddMemberModal from './add-member-modal';
import PageHeader from '@components/common/page-header';
import AppTable from '@components/common/table';
import './members.css';
import { deleteWorkspaceMember, getMembersByWorkspaceId } from '@services/workspace-members-service';
import { ResponseType } from '@models/global-models';
import { getWorkspaceById } from '@services/workspace-services';
import { getAllUser } from '@services/user-services';

const { Text } = Typography;

const roleItems: MenuProps['items'] = [
  {
    key:  MEMBER_ROLE_TYPE.OWNER,
    label: 'Owner',
  },
  {
    key: MEMBER_ROLE_TYPE.NOT_OWNER,
    label: 'Not Owner',
  },
];

const handleRoleChange = (e: any) => {
  //updateMember(e.key)
  // setSelectedRole(e.key);
};

const RoleDropDown = ({children}: any) => (
  <Dropdown menu={{items: roleItems, onClick: handleRoleChange }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        {children}
        <DownArrowIcon />
      </Space>
    </a>
  </Dropdown>
);

const Members = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [members, setMembers] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState('');
  const [memberOptions, setMemberOptions] = useState();
  const {workspaceId} = useParams();

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
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

  const handleDelete = (id: string) => {
    deleteWorkspaceMember({
      memberId: id,
      workspaceId: workspaceId!
    }).then((res: ResponseType) => {
      message.success(res?.message ?? 'Successfully Deleted!');
      fetchMembers();
    }).catch((error: any) => {
      message.error(error?.message ?? '');
    });
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
      render: (text, record) => <RoleDropDown>{RoleDropDown}</RoleDropDown>,
    },
    {
      title: <Text className='members-table-title'>Action</Text>,
      dataIndex: 'action',
      render: (_, record) => <DeleteIcon2 onClick={() => handleDelete(record.id)} />
    },
  ];

  const getTableData: any = () => (
    members?.map((member: any) => ({
      key: member.user.id,
      id: member.user.id,
      name: member.user.name,
      email: member.user.email,
      role: member.is_owner ? MEMBER_ROLE_TYPE.OWNER : MEMBER_ROLE_TYPE.NOT_OWNER,
    }))
  );

  const formatSelectOptions = (list: any) => (
    list.map((item: any) => ({
      value: item.id,
      label: item.name
    }))
  );

  const fetchMembers = () => {
    getMembersByWorkspaceId(workspaceId!)
      .then((res: ResponseType) => setMembers(res.payload))
      .catch(() => console.log('error'));
  };

  useEffect(() => {
    getAllUser().then((res: ResponseType) => setMemberOptions(formatSelectOptions(res.payload)));
  }, []);

  useEffect(() => {
    fetchMembers();
    getWorkspaceById(workspaceId!)
      .then((res: ResponseType) => setTitle(res.payload.title))
      .catch(() => console.log('error'));
  }, [workspaceId]);
  

  return (
    <div className='members-container'>
      <PageHeader 
        icon={<Avatar />} 
        title={title}
        buttonName='Add Member'
        buttonIcon={<PlusIcon />}
        onButtonClick={openModal}
      />
      <div className='members-body-container'>
        <Text className='members-title'>Members</Text>
        <AppTable className='members-table' columns={columns} data={getTableData()} rowSelection={rowSelection}/>
        <AddMemberModal 
          members={members}
          isOpen={isModalOpen} 
          onClose={onCloseModal} 
          memberOptions={memberOptions} 
          workspaceId={workspaceId!}/>
      </div>  
    </div>
    
  );
};

export default Members;