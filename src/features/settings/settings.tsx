import { FC } from 'react';
import { Tabs } from 'antd';
import GeneralForm from './general-form';
import SecurityForm from './security-form';
import Notifications from './notifications/notifications-tab';
import './settings.css';

const Settings: FC = () => (
  <div className='settings-container'>
    <Tabs
      className='settings-tab-container'
      defaultActiveKey="1"
      items={[
      {
        label: 'General',
        key: '1',
        children: <GeneralForm />,
      },
      {
        label: 'Security',
        key: '2',
        children: <SecurityForm />,
      },
      {
        label: 'Notifications',
        key: '3',
        children: <Notifications />,
      },
    ]}
    />
  </div>
  );

export default Settings;