import { PlusCircleRoundedIcon } from '@icons';
import { Button, Card, Collapse, message } from 'antd';
import './milestone-bar.css';
import Milestone from './milestone';
import { useState, useEffect } from 'react';
import { CreateOrUpdateMilestonePayload } from '@models/milestone';
import { createMilestone, updateMilestone } from '@services/milestone-service';
import { ResponseType } from '@models/global-models';
import { TRACKER_TYPE } from '@models/tracker';

export interface MilestoneProps {
  milestones: string[];
  tracker: any,
  refetchTracker: () => void;
}

const generateTitle = (length: number) => {
  return `milestone-${length+1}`;
};

const MilestoneBar = ({ milestones, tracker, refetchTracker }: MilestoneProps) => {
  const [isNewMilestoneTabOpen, setIsNewMilestoneTabOpen] = useState<boolean>(false);
  const [isMilestoneCreated, setIsMilestoneCreated] = useState<boolean>();

  const onCreateMilestone = async (data: CreateOrUpdateMilestonePayload): Promise<ResponseType> => {
    try {
      data = { ...data, title: generateTitle(milestones.length), tracker_id: tracker?.id, tracker_type: tracker?.type! };
      const res: ResponseType = await createMilestone(data);
      message.success(res?.message ?? 'Successfully created milestones');
      setIsMilestoneCreated(true);
      // refetchTracker();
      // setIsTextInputOpen(false);
      return res;
    } catch (error: any) {
      message.error(error?.message ?? 'Something went wrong!');
      return error;
    }
  };

  const onUpdateMilestone = (id: string, data: CreateOrUpdateMilestonePayload) => {
    updateMilestone(id, data).then((res: ResponseType) => {
      message.success(res?.message ?? 'Successfully created milestones');
      refetchTracker();
    }).catch((error: any) => {
      message.error(error?.message ?? 'Something went wrong!');
    });
  };

  const handleBtnClick = () => {
    setIsNewMilestoneTabOpen(true);
  };

  const renderMilestoneItems = () => (
    milestones?.map((milestone, index: number) => (
      <Milestone
        key={index}
        tracker={tracker}
        milestoneData={milestone} 
        refetchTracker={refetchTracker}
        createMilestone={onCreateMilestone} 
        updateMilestone={onUpdateMilestone} />
    )
  ));

  useEffect(() => {
    refetchTracker();
    setIsNewMilestoneTabOpen(false);
    setIsMilestoneCreated(false);
  }, [isMilestoneCreated]);
    
  return (
    <Card className='milestone-bar-container hide-scrollbar' title="Milestone" bordered={false}>
      <Button 
        icon={<PlusCircleRoundedIcon />} 
        type='link' 
        className='milestone-bar-btn' 
        onClick={handleBtnClick}>
          Create Milestone
      </Button>
      {renderMilestoneItems()}
      {isNewMilestoneTabOpen && !isMilestoneCreated &&
        <Milestone
          tracker={tracker}
          newMilestoneTitle={generateTitle(milestones.length)}
          refetchTracker={refetchTracker}
          createMilestone={onCreateMilestone} 
          updateMilestone={onUpdateMilestone} 
        /> }
    </Card>
  );
};

export default MilestoneBar;