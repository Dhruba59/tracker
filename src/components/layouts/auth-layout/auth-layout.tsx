import { Outlet, useNavigate } from 'react-router-dom';

import authImage from 'assets/images/auth-image.png';
import { useSession } from '@hooks/session-hooks';
import { routes } from '@constants/route-constants';
import { EmailIcon2, LogoIcon } from '@icons';
import { Typography } from 'antd';
import './auth-layout.css';

const { Text } = Typography;

const AuthLayout = () => {
  const { session, status } = useSession();
  const navigate = useNavigate();
  console.log('session', session);
  if(session) {
    navigate(routes.dashboard.path);
  }
  
  return (
    <div className="parent-container">
      <div className='col-1'>
        <div className='auth-layout-col1-header'>
          <LogoIcon />
        </div>
        <div className='auth-layout-col1-center'>
          <img src={authImage}></img>
        </div>
        <div className='auth-layout-col1-footer'>
          <Text>© P.Tracker 2023</Text>
          <span>
            <EmailIcon2 />
            <Text>hi@ptracker.com</Text>
          </span>          
        </div>
      </div>
      <div className="col-2" style={{background: '/assets/images/auth-bg.png'}}>
        <Outlet/>
      </div>
    </div>
  );
};

export default AuthLayout;