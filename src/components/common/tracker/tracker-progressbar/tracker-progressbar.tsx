import { Form, Modal, Progress } from 'antd';

import { MilestoneBarIcon } from '@icons';
import { TrackerProgressbarProps } from '@models/tracker';
import './tracker-progressbar.css';
import TextInput from '../../input-fields/text-input';

const TrackerProgressbar = ({ breakPoints, progressPercent }: TrackerProgressbarProps) => {

  const handleMilestoneUpdate = () => {
    console.log('update milestone!');
  };

  return (
    <div className="progress-container">
      <Progress className='progress-bar' percent={progressPercent} showInfo={false} />
      {breakPoints?.map((point: number) => (
        <div key={point} className="progress-stop-point" style={{ left: `${point}%` }} >
          <MilestoneBarIcon />
        </div>
      ))}

      <Modal className='tracker-modal' title="Basic Modal" open={false} footer={false}>
        <hr />       
        <Form>
          <Form.Item name='target' rules={[{ required: true, message: 'Value required!' }]}>
            <TextInput className='tracker-modal-input'/>
          </Form.Item>
          <Form.Item name='date' rules={[{ required: true, message: 'Date is required!' }]}>
            <TextInput className='tracker-modal-input' type='date' onPressEnter={handleMilestoneUpdate}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TrackerProgressbar;