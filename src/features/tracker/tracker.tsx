import { Breadcrumb, Col, Row } from 'antd';
import TrackerCard from '@components/common/tracker/tracker-card';
import { tracker } from '@helpers/global-helpers';
import TaskBar from './task-bar';
import MilestoneBar from './milestone-bar';
import ActivityBar from './activity-bar';
import { routes } from '@constants/route-constants';
import './tracker.css';

const TrackerDetails = () => {
  const breadCumbItems = [
    {
      title: <a href={`${routes.workspace.path}/sdfsdfjsdfsds`}>Workspace</a>,
    },
    {
      title: <a href={`${routes.tracker.path}/${tracker.id}`}>{tracker.title}</a>,
    },
  ];

  return (
    <div className='tracker-details-container'>
      <Breadcrumb
        items={breadCumbItems}
      />
      <TrackerCard tracker={tracker}/>
      <Row className='tracker-details-row-2' gutter={16}>
        <Col span={8}>
          <TaskBar tracker={tracker}/>
        </Col>
        <Col span={8}>
          <MilestoneBar milestones={['sss', 'sss','sss']}/>
        </Col>
        <Col span={8}>
          <ActivityBar />
        </Col>
      </Row>
    </div>
  );
};

export default TrackerDetails;