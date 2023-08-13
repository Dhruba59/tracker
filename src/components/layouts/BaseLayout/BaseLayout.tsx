import { routes } from '@constants/route-constants';
import { useSession } from '@hooks/session-hooks';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import BaseSidebar from './base-sidebar';
import { Header } from 'antd/es/layout/layout';

const BaseLayout = (props: any) => {
  const { session, status } = useSession();
  const navigate = useNavigate();
  // if(!session) {
  //   navigate(routes.login.path);
  // };
 
  return (
    <Layout>
       {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header> */}
      <BaseSidebar />

      <Outlet/>
    </Layout>
  );
};

export default BaseLayout;