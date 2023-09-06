import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import BaseSidebar from './base-sidebar';
import BaseHeader from './base-header';
import { routes } from '@constants/route-constants';
import { useSession } from '@hooks/session-hooks';

const BaseLayout = (props: any) => {
  const { session, status } = useSession();
  const navigate = useNavigate();
  if(!session) {
    navigate(routes.login.path);
  }; 
  
  return (
    <Layout>
      <BaseHeader />
      <Layout>
        <BaseSidebar />
        <Outlet/>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;