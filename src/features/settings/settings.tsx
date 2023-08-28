import { FC } from 'react';
import { Tabs } from 'antd';
import GeneralForm from './general-form';
import SecurityForm from './security-form';
import Notifications from './notifications/notifications-tab';

const Settings: FC = () => (
  <Tabs
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
);

export default Settings;