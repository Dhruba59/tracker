// import { RecoilRoot } from 'recoil';
import { FC, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import './Global.css';
import MainRoutes from './routes/base-routes';
// import { FullPageLoading } from './components/full-page-loading';

const App: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={MainRoutes} />
    </Suspense>
  );
};

export default App;
