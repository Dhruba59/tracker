import TrackerCard from '../../components/common/tracker/tracker-card';
import './dashboard.css';
const Dashboard =  () => {
  const trackerDetails = {
    title: 'Design tracker',
    progressPercent: 33,
    startDate: '12-08-2023',
    endDate: '12-08-2023',
    target: '22/333'
  };

  return (
    <div className='dashboard-main-container'>
      <TrackerCard tracker={trackerDetails} />
    </div>
  );
};

export default Dashboard;