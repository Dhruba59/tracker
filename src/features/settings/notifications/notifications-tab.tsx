import { Divider, Switch, Typography } from 'antd';
import NotificationItem from './notification-item/notification-item';
import './notifications-tab.css';

const { Text } = Typography;

const NotificationsTab = () => {
  return (
    <div className='notifications-tab-container'>
      <div className='notifications-tab-header'>
        <span>Default Settings</span>
        <Switch />
      </div>
      <div className='notifications-tab-body'>
        <NotificationItem />
        <Divider className='notifications-item-divider'/>
        <NotificationItem />
        <Divider className='notifications-item-divider'/>
        <NotificationItem />
        <Divider className='notifications-item-divider'/>
        <NotificationItem />
      </div>
    </div>
  );
};

export default NotificationsTab;