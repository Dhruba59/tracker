import { useEffect, useState } from 'react';
import { CorrectSignIcon, EditIcon, ThreeDotIcon } from '@icons';
import { Avatar, Form, Menu, MenuProps, Modal, Progress, Typography, message } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

import TrackerProgressbar from '../tracker-progressbar';
import './tracker-card.css';
import { ARCHIVE_TYPE_ENUM, TRACKER_TYPE, TrackerCardInfo, TrackerCardProps } from '@models/tracker';
import { formatNumberWithTwoDecimals, stringToDateOnly, tracker } from '@helpers/global-helpers';
import AppPopover from '@components/common/pop-over';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@constants/route-constants';
import { getTrackerById, updateTracker } from '@services/tracker-service';
import { PaginationResponseType, ResponseType } from '@models/global-models';
import { getMembersByTrackerId } from '@services/tracker-member-service';
import UserAvatar from '@components/common/user-avatar';
import TaskBar from '@features/tracker/task-bar';

const { Text, Paragraph } = Typography;

const TrackerCard = ({ trackerData, workspaceId, onUpdateTracker }: TrackerCardProps) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [members, setMembers] = useState<any>();
  const [tracker, setTracker] = useState<any>(trackerData);
  const [milestone, setMilestone] = useState<any>();

  const fetchMembers = () => {
    getMembersByTrackerId(tracker.id)
      .then((res: ResponseType) => setMembers(res.payload))
      .catch((error: any) => console.log('Unable to fetch members'));
  };

  const handleArchiveToogle = (isArchive: ARCHIVE_TYPE_ENUM) => {
    updateTracker(trackerData?.id, { is_archived: isArchive, workspace_id: workspaceId })
      .then((res: ResponseType) => {
        onUpdateTracker();
        message.success(res?.message);
        if(isArchive === ARCHIVE_TYPE_ENUM.RESTORE) {
          navigate(`${routes.workspace.path}/${workspaceId}/tracker/${tracker?.id}`);
        } else {
          navigate(routes.dashboard.path);
        } 
    
      })
      .catch((error: any) => console.log('Unable to archieve!'));
  };
  console.log('path', pathname.includes('tracker') && pathname.includes('workspace'));
  // const fetchTracker = () => {
  //   getTrackerById(tracker.id)
  //   .then((res: ResponseType) => setTracker(res.payload))
  //   .catch((error: any) => console.log('Unable to fetch tracker'));
  // };

  const threeDotItems: MenuProps['items'] = [
    
    tracker?.is_archived ? {
      key: '3',
      label: 'Restore',
      onClick: () => handleArchiveToogle(ARCHIVE_TYPE_ENUM.RESTORE),
      className: 'tracker-popover-item'
    } : 
    {      
      key: '1',
      label: 'Archive',
      onClick: () =>  handleArchiveToogle(ARCHIVE_TYPE_ENUM.ARCHIVE),
      className: 'tracker-popover-item'
    },
    {
      key: '2',
      label: 'View',
      onClick: () => navigate(`${routes.workspace.path}/${workspaceId}/tracker/${tracker?.id}`),
      className: 'tracker-popover-item',
      disabled:  (pathname.includes('tracker') && pathname.includes('workspace')) || pathname.includes('archive')
    }
  ];

  const renderMembersAvatar = () => (
    members?.map((member: any, index: number) => (
      <UserAvatar key={index} title={member?.user.name} />
    ))
  );

  const threeDotContent = (
    <Menu items={threeDotItems}></Menu>
  );

  const handleOnTitleChange = (title: string) => {
    const payload = { title, workspace_id: workspaceId };
    if(title !== tracker.title) {
      updateTracker(tracker.id, payload)
      .then((res: ResponseType) => {
        message.success(res.message);
        // fetchTracker();
        onUpdateTracker?.();
      })
      .catch(error => message.error('unable to update!'));
    }
  };

  
  useEffect(() => {
    fetchMembers();
    // fetchTracker();
    // onUpdateTracker?.();
  }, []);

  useEffect(() => {
    setTracker(trackerData);
  }, [trackerData]);

  return (
    <div className='tracker-main-container'>
      <div className='tracker-row'>
        <Paragraph editable={{
          onChange: handleOnTitleChange,
          icon: <EditIcon height={25} width={25} />,
          enterIcon: null,
        }} className='tracker-title'>{tracker?.title}</Paragraph>
        <AppPopover className='tracker-popover' content={threeDotContent} placement='leftTop'>
          <ThreeDotIcon style={{cursor: 'pointer'}}/>
        </AppPopover>
      </div>
      <div className='tracker-row'>
        <div className='tracker-target'>
          <CorrectSignIcon width={12} height={12} />
          <AppPopover content={<TaskBar tracker={tracker} refetchTracker={onUpdateTracker}/>}>
          {/* <AppPopover content={null}> */}
            {tracker?.type === TRACKER_TYPE.TASK && <Text>Task: {tracker?.done_task ?? 0}/{tracker?.total_task ?? 0}</Text>}
            {tracker?.type === TRACKER_TYPE.NUMERIC && <Text>Target: {tracker?.achieved_target ?? 0}/{tracker?.target_end ?? 0}</Text>}
          </AppPopover>
          {/* {tracker?.type === TRACKER_TYPE.TASK && <Text>Task: {tracker?.done_task ?? 0}/{tracker?.total_task ?? 0}</Text>}
          {tracker?.type === TRACKER_TYPE.NUMERIC && <Text>Target: {tracker?.target_start ?? 0}/{tracker?.target_end ?? 0}</Text>} */}
        </div>
        <Avatar.Group>
          {renderMembersAvatar()}
        </Avatar.Group>
      </div>
      <TrackerProgressbar tracker={tracker} progressPercent={tracker?.percentage ?? 0} milestones={tracker?.milestones} onUpdateTracker={onUpdateTracker}/>
      <div className='tracker-row'>
        <div className='tracker-date-card'>{stringToDateOnly(tracker?.start_date)}</div>
        <Text className='tracker-progress-text'>Work Progress: <span>{formatNumberWithTwoDecimals(tracker?.percentage) ?? 0}%</span></Text>
        <div className='tracker-date-card'>{stringToDateOnly(tracker?.end_date)}</div>
      </div>
    </div>
  );
};

export default TrackerCard;