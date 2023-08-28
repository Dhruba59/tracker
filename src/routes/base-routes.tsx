import { createBrowserRouter } from 'react-router-dom';

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
import TrackerDetails from '@features/tracker';
import Members from '@features/members';
import Settings from '@features/settings';

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
      }
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
        path: routes.dashboard.path,
        element: <Dashboard />,
      },
      {
        path: `${routes.workspace.path}/:id`,
        element: <WorkspaceDetails />,
      },
      {
        path: `${routes.tracker.path}/:id`,
        element: <TrackerDetails />,
      },
      {
        path: routes.members.path,
        element: <Members />,
      },
      {
        path: routes.settings.path,
        element: <Settings />,
      },
    ],
  }
]);

export default MainRoutes;
