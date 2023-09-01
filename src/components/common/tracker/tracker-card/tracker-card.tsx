import { useEffect, useState } from 'react';
import { CorrectSignIcon, EditIcon, ThreeDotIcon } from '@icons';
import { Avatar, Form, Menu, MenuProps, Modal, Progress, Typography, message } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';

import TrackerProgressbar from '../tracker-progressbar';
import './tracker-card.css';
import { TRACKER_TYPE, TrackerCardInfo, TrackerCardProps } from '@models/tracker';
import { stringToDateOnly, tracker } from '@helpers/global-helpers';
import AppPopover from '@components/common/pop-over';
import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/route-constants';
import { getTrackerById, updateTracker } from '@services/tracker-service';
import { PaginationResponseType, ResponseType } from '@models/global-models';
import { getMembersByTrackerId } from '@services/tracker-member-service';
import UserAvatar from '@components/common/user-avatar';

const { Text, Paragraph } = Typography;

const TrackerCard = ({ trackerData, workspaceId }: TrackerCardProps) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<any>();
  const [tracker, setTracker] = useState<any>(trackerData);

  const fetchMembers = () => {
    getMembersByTrackerId(tracker.id)
      .then((res: ResponseType) => setMembers(res.payload))
      .catch((error: any) => console.log('Unable to fetch members'));
  };

  const fetchTracker = () => {
    getTrackerById(tracker.id)
    .then((res: ResponseType) => setTracker(res.payload))
    .catch((error: any) => console.log('Unable to fetch tracker'));
  };

  const threeDotItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Restore',
      onClick: () => console.log('s'),
      className: 'tracker-popover-item'
    },
    {
      key: '2',
      label: 'View',
      onClick: () => navigate(`${routes.workspace.path}/${workspaceId}/${routes.tracker.path}/${tracker?.id}`),
      className: 'tracker-popover-item'
    }
  ];

  const renderMembersAvatar = () => (
    members?.map((member: any) => (
      <UserAvatar title={member?.user.name} />
    ))
  );

  const threeDotContent = (
    <Menu items={threeDotItems}></Menu>
  );

  const handleOnTitleChange = (title: string) => {
    console.log(title);
    const payload = { title, workspace_id: workspaceId };
    if(title !== tracker.title) {
      updateTracker(tracker.id, payload)
      .then((res: ResponseType) => {
        message.success(res.message);
        fetchTracker();
      })
      .catch(error => message.error('unable to update!'));
    }
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
          icon: <EditIcon />
        }} className='tracker-title'>{tracker?.title}</Paragraph>
        <AppPopover className='tracker-popover' content={threeDotContent} placement='leftTop'>
          <ThreeDotIcon />
        </AppPopover>

      </div>
      <div className='tracker-row'>
        <div className='tracker-target'>
          <CorrectSignIcon width={12} height={12} />
          {tracker?.type === TRACKER_TYPE.TASK && <Text>Target: {tracker?.done_task ?? 0}/{tracker?.total_task ?? 0}</Text>}
          {tracker?.type === TRACKER_TYPE.NUMERIC && <Text>Target: {tracker?.target_start ?? 0}/{tracker?.target_end ?? 0}</Text>}
        </div>
        <Avatar.Group>
          {renderMembersAvatar()}
        </Avatar.Group>
      </div>
      <TrackerProgressbar type={tracker?.type} progressPercent={tracker?.percentage ?? 0} breakPoints={[23, 44, 90]} />
      <div className='tracker-row'>
        <div className='tracker-date-card'>{stringToDateOnly(tracker?.start_date)}</div>
        <Text className='tracker-progress-text'>Work Progress: <span>{tracker?.percentage ?? 0}%</span></Text>
        <div className='tracker-date-card'>{stringToDateOnly(tracker?.end_date)}</div>
      </div>
    </div>
  );
};

export default TrackerCard;