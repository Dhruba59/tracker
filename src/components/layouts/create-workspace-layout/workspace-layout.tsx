import { Outlet, useNavigate } from 'react-router-dom';

import { useSession } from '@hooks/session-hooks';
import { routes } from '@constants/route-constants';
import { LogoIcon } from '@icons';
import DoubleStarImage from '@images/workspace-layout-img.png';
import './workspace-layout.css';

const WorkspaceLayout = () => {
  
  return (
    <div className="workspace-layout-parent-container">
      <div className='workspace-layout-col-1'>
        <div className='workspace-layout-col-1-header'>
          <LogoIcon />
        </div>
      </div>
      <div className="workspace-layout-col-2" style={{background: '/assets/images/auth-bg.png'}}>
        <img className='workspace-layout-stars-image' src={DoubleStarImage} />
        <Outlet/>
      </div>
    </div>
  );
};

export default WorkspaceLayout;