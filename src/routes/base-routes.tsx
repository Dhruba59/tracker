import { createBrowserRouter } from 'react-router-dom';

import { routes } from '@constants/route-constants';
import BaseLayout from '@components/layouts/base-layout';
import AuthLayout from '@components/layouts/auth-layout';
import Login from '@features/login';
import SignUp from '@features/sign-up';
import Dashboard from '@features/dashboard';
import ResetPassword from '@features/reset-password';
import NewPasswordForm from '@features/reset-password/new-password-form';
import EmailVerification from '@features/email-verification';

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
    element: <BaseLayout />,
    // errorElement: <BaseLayout errorBoundary={true} />,
    children: [
      {
        path: routes.dashboard.path,
        element: <Dashboard />,
      },
    ],
  }
]);

export default MainRoutes;
