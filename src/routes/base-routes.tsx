import { createBrowserRouter, useNavigate } from 'react-router-dom';

import { routes } from '@constants/route-constants';
import BaseLayout from '@components/layouts/base-layout';
import AuthLayout from '@components/layouts/auth-layout';
import Login from '@features/auth/login';
import SignUp from '@features/auth/sign-up';
import Dashboard from '@features/dashboard';
import ResetPassword from '@features/reset-password';
import NewPasswordForm from '@features/reset-password/new-password-form';
import EmailVerification from '@features/auth/email-verification';
import WorkspaceLayout from '@components/layouts/create-workspace-layout';
import CreateFirstWorkspace from '@features/workspace/create-first-workspace';
import WorkspaceDetails from '@features/workspace/workspace-details';
import Tracker from '@features/tracker';
import Members from '@features/members';
import Settings from '@features/settings';
import Archive from '@features/archive';
import { useEffect } from 'react';
import NotFoundPage from '@features/not-found-page';

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.dashboard.path);
  },[]);

  return <></>;
};

const MainRoutes = createBrowserRouter([
  {
    element: <AuthLayout />,
    // errorElement: <BaseLayout errorBoundary={true} />,
    children: [
      {
        path: routes.login.path,
        element: <Login/>,
      },
      {
        path: routes.sign_up.path,
        element: <SignUp/>,
      },
      {
        path: routes.reset_password.path,
        element: <ResetPassword/>,
      },
      {
        path: routes.set_new_password.path,
        element: <NewPasswordForm />,
      },
      {
        path: routes.email_verification.path,
        element: <EmailVerification />,
      },
      {
        path: '/auth/*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: <WorkspaceLayout />,
    // errorElement: <BaseLayout errorBoundary={true} />,
    children: [
      {
        path: routes.create_first_workspace.path,
        element: <CreateFirstWorkspace />,
      },
    ],
  },
  {
    element: <BaseLayout />,
    // errorElement: <BaseLayout errorBoundary={true} />,
    children: [
      {
        path: routes.home.path,
        element: <Redirect/>
      },
      {
        path: routes.dashboard.path,
        element: <Dashboard />,
      },
      {
        path: `${routes.workspace.path}/:workspaceId`,
        element: <WorkspaceDetails />,
      },
      {
        path: `${routes.workspace.path}/:workspaceId/tracker/:trackerId`,
        element: <Tracker />,
      },
      {
        path: `${routes.workspace.path}/:workspaceId/members`,
        element: <Members />,
      },
      {
        path: '/:workspaceId/archive',
        element: <Archive />,
      },
      {
        path: routes.settings.path,
        element: <Settings />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },

]);

export default MainRoutes;
