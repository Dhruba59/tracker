import { PlusCircleRoundedIcon } from '@icons';
import { Button, Card } from 'antd';
import TextInput from '@components/common/input-fields/text-input';
import './activity-bar.css';
import Activity from './activity/activity';

export interface ActivityProps {
  activities: any;
}

const ActivityBar = ({activities}: ActivityProps) => {
  return (
    <Card className='activity-card-container hide-scrollbar' title="Activities" bordered={false}>
      {activities?.map((activity: any) => (
        <Activity activity={activity}/>
      ))}
      {/* <Activity />
      <Activity />
      <Activity /> */}

    </Card>
  );
};

export default ActivityBar;