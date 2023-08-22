import { Spin } from 'antd';
import './full-page-loading.css';

const FullPageLoading = () => {
  return (
    <div className='loading-container screen-size'>
      <Spin size='large' />
    </div>
  );
};

export default FullPageLoading;
