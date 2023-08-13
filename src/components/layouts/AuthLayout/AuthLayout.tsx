import { Outlet, useNavigate } from 'react-router-dom';
import './style.css';
import authImage from 'assets/images/auth-image.png';
import { useSession } from '@hooks/session-hooks';
import { routes } from '@constants/route-constants';

const AuthLayout = () => {
  const { session, status } = useSession();
  const navigate = useNavigate();
  if(session) {
    navigate(routes.dashboard.path);
  }

  return (
    <div className="parent-container">
      <div className='col-1'><img src={authImage}></img></div>
      <div className="col-2" style={{background: '/assets/images/auth-bg.png'}}>
        <Outlet/>
      </div>
    </div>
  );
};

export default AuthLayout;