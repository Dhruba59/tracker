import { PlusCircleRoundedIcon } from '@icons';
import { Button, Card } from 'antd';
import TextInput from '@components/common/input-fields/text-input';
import './activity-bar.css';
import Activity from './activity/activity';

const ActivityBar = () => {
  return (
    <Card className='activity-card-container' title="Activities" bordered={false}>
      <Activity />
      <Activity />
      <Activity />
      <Activity />
    </Card>
  );
};

export default ActivityBar;