import { PlusCircleRoundedIcon } from '@icons';
import { Button, Card, Collapse } from 'antd';
import './milestone-bar.css';
import Milestone from './milestone';

export interface MilestoneProps {
  milestones: string[];
}

const MilestoneBar = ({milestones}: MilestoneProps) => {
  const renderMilestoneItems = () => (
    milestones.map((milestone) => (
      <Milestone milestone={milestone} />
    )
  ));
    
  return (
    <Card className='milestone-bar-container' title="Milestone" bordered={false}>
      {renderMilestoneItems()}
    </Card>
  );
};

export default MilestoneBar;