import { useEffect, useState } from 'react';
import { CorrectSignIcon, EditIcon, ThreeDotIcon } from '@icons';
import { Avatar, Menu, MenuProps, Typography, message } from 'antd';

import TrackerProgressbar from '../tracker-progressbar';
import { ARCHIVE_TYPE_ENUM, TRACKER_TYPE, TrackerCardProps } from '@models/tracker';
import { formatNumberWithTwoDecimals, stringToDateOnly, tracker } from '@helpers/global-helpers';
import AppPopover from '@components/common/pop-over';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '@constants/route-constants';
import { updateTracker } from '@services/tracker-service';
import { ResponseType } from '@models/global-models';
import { getMembersByTrackerId } from '@services/tracker-member-service';
import UserAvatar from '@components/common/user-avatar';
import TaskBar from '@features/tracker/task-bar';
import './tracker-card.css';

const { Text, Paragraph } = Typography;

const TrackerCard = ({ trackerData, workspaceId, onUpdateTracker }: TrackerCardProps) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [members, setMembers] = useState<any>();
  const [tracker, setTracker] = useState<any>(trackerData);
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState<boolean>(false);

  const fetchMembers = () => {
    getMembersByTrackerId(tracker.id)
      .then((res: ResponseType) => setMembers(res.payload))
      .catch((error: any) => message.error('Unable to fetch members'));
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
      .catch((error: any) => message.error('Unable to archieve!'));
  };

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
    (pathname.includes('tracker') && pathname.includes('workspace')) || pathname.includes('archive') ?
      null : {
        key: '2',
        label: 'View',
        onClick: () => navigate(`${routes.workspace.path}/${workspaceId}/tracker/${tracker?.id}`),
        className: 'tracker-popover-item',
      }
  ];

  const renderMembersAvatar = () => (
    members?.map((member: any, index: number) => (
      <UserAvatar key={index} title={member?.user.name} src={member?.user?.profile_image_url}/>
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
        onUpdateTracker?.();
      })
      .catch(error => message.error('unable to update!'));
    }
  };

  const toggleTaskPopup = () => {
    setIsTaskPopupOpen(!isTaskPopupOpen);
  };
  
  useEffect(() => {
    fetchMembers();
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
      <AppPopover open={isTaskPopupOpen} placement='bottom' content={<TaskBar tracker={tracker} refetchTracker={onUpdateTracker} isDragDrop={false} isPopUp={true} onCloseIconClick={toggleTaskPopup}/>}>
        <div className='tracker-target' onClick={toggleTaskPopup}>
          <CorrectSignIcon width={12} height={12} />
          {tracker?.type === TRACKER_TYPE.TASK && <Text>Task: {tracker?.done_task ?? 0}/{tracker?.total_task ?? 0}</Text>}
          {tracker?.type === TRACKER_TYPE.NUMERIC && <Text>Target: {tracker?.achieved_target ?? 0}/{tracker?.target_end ?? 0}</Text>}
        </div>
      </AppPopover>
      
        <Avatar.Group maxCount={5}>
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