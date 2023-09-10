import React from 'react';
import { Button, Result } from 'antd';
import './not-found-page.css';
import { routes } from '@constants/route-constants';

const App: React.FC = () => (
  <div className='not-found-page-container'>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button href={routes.dashboard.path} type="primary">Back Home</Button>}
  />
  </div>
);

export default App;