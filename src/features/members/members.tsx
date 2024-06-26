import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { Dropdown, MenuProps, Space, Typography, message, Checkbox } from 'antd';
import debounce from 'lodash/debounce';

import { MEMBER_ROLE_TYPE, TableDataType } from '@models/members';
import { DeleteIcon2, DownArrowIcon, PlusIcon, SearchIcon } from '@icons';
import AddMemberModal from '../../components/modal/add-member-modal';
import PageHeader from '@components/common/page-header';
import AppTable from '@components/common/table';
import { deleteWorkspaceMember, getMembersByWorkspaceId } from '@services/workspace-members-service';
import { ResponseType } from '@models/global-models';
import { getWorkspaceById } from '@services/workspace-services';
import { getAllUser } from '@services/user-services';
import UserAvatar from '@components/common/user-avatar';
import TextInput from '@components/common/input-fields/text-input';
import AppButton from '@components/common/button';
import { FullPageLoading } from '@components/full-page-loading';
import './members.css';

const { Text } = Typography;

const roleItems: MenuProps['items'] = [
  {
    key: MEMBER_ROLE_TYPE.OWNER,
    label: 'Owner',
  },
  {
    key: MEMBER_ROLE_TYPE.NOT_OWNER,
    label: 'Not Owner',
  },
];

const Members = () => {
  const [isLoadingMembersData, setIsLoadingMembersData] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [members, setMembers] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState('');
  const [memberOptions, setMemberOptions] = useState();
  const [searchText, setSearchText] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // New state for selected row keys
  const { workspaceId } = useParams();

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleRoleChange = (e: any) => {
    setSelectedRole(e.key);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: TableDataType) => ({
      disabled: record.role === MEMBER_ROLE_TYPE.OWNER,
      name: record.name,
    }),
    // hideSelectAll: true, // Disable the "Select All" checkbox
  };

  const handleDelete = (id?: string) => {
    let memberIdsToDelete: string[] = [];
  
    if (id) {
      // Individual delete: add the provided ID to the list
      memberIdsToDelete.push(id);
    } else {
      // Batch delete: use the selectedRowKeys
      memberIdsToDelete = selectedRowKeys.map((key) => key.toString());
    }
  
    if (memberIdsToDelete.length === 0) {
      message.warning('Please select members to delete.');
      return;
    }
  
    deleteWorkspaceMember({
      memberIds: memberIdsToDelete,
      workspaceId: workspaceId!,
    })
      .then((res: ResponseType) => {
        message.success(res?.message ?? 'Successfully Deleted!');
        fetchMembers();
        setSelectedRowKeys([]); // Clear selected rows after successful delete
      })
      .catch((error: any) => {
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
      render: (text, record) => (
        <Dropdown menu={{ items: roleItems, onClick: handleRoleChange }} arrow>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {record.role}
              <DownArrowIcon />
            </Space>
          </a>
        </Dropdown>
      ),
    },
    {
      title: <Text className='members-table-title'>Action</Text>,
      dataIndex: 'action',
      render: (_, record) => (
        <DeleteIcon2
          onClick={() => {
            if( record.role !== MEMBER_ROLE_TYPE.OWNER ) {
              handleDelete(record.id);
            }
          }}
          style={{cursor: record.role === MEMBER_ROLE_TYPE.OWNER ? 'not-allowed' : 'pointer'}} />
        ),
    }
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
    setIsLoadingMembersData(true);
    const membersQueryParams = { userName: searchText };
    getMembersByWorkspaceId(workspaceId!, membersQueryParams)
      .then((res: ResponseType) => setMembers(res.payload))
      .catch(() => message.error('unable to fetch informations!'))
      .finally(() => setIsLoadingMembersData(false));
  };

  const handleSearch = debounce((e: any) => {
    setSearchText(e.target.value);
  }, 500);

  useEffect(() => {
    getAllUser().then((res: ResponseType) => setMemberOptions(formatSelectOptions(res.payload)));
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [workspaceId, searchText]);

  useEffect(() => {
    getWorkspaceById(workspaceId!)
      .then((res: ResponseType) => setTitle(res.payload.title))
      .catch(() => message.error('unable to fetch informations!'));
  }, [workspaceId]);

  if(isLoadingMembersData) {
    return <FullPageLoading />;
  };

  return (
    <div className='members-container'>
      <PageHeader
        icon={<UserAvatar title={title ?? ''} />}
        title={title}
        buttonName='Add Member'
        buttonIcon={<PlusIcon />}
        onButtonClick={openModal}
      />
      <div className='members-body-container'>
        <div className='members-table-header'>
          <Text className='members-title'>Members</Text>
          <TextInput className='members-table-search-input' onChange={handleSearch} placeholder='search' prefix={<SearchIcon />} />
        </div>
        <AppButton 
          className='delete-button' 
          onClick={() => handleDelete()} 
          type='default'
          style={{ display: selectedRowKeys.length > 0 ? 'block' : 'none', background: '#e36464', color: 'white'}}
          >
            Delete Selected
          </AppButton>
        <AppTable className='members-table' columns={columns} data={getTableData()} rowSelection={rowSelection} />
        <AddMemberModal
          members={members}
          isOpen={isModalOpen}
          onClose={onCloseModal}
          memberOptions={memberOptions}
          workspaceId={workspaceId!}
          onMemberAddUpdate={fetchMembers}
        />
      </div>
    </div>
  );
};

export default Members;
