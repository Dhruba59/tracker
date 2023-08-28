export const routes = {
  login: {
    title: 'Login',
    key: 'login',
    path: '/auth/login',
  },
  sign_up: {
    title: 'Sign Up',
    key: 'sign_up',
    path: '/auth/sign-up',
  },
  logout: {
    title: 'Logout',
    key: 'logout',
    path: '/auth/logout',
  },
  reset_password: {
    title: 'Reset Password',
    key: 'reset_password',
    path: '/auth/reset-password',
  },
  set_new_password: {
    title: 'New Password',
    key: 'new_password',
    path: '/auth/reset-password/:token',
  },
  email_verification: {
    title: 'Email Verification',
    key: 'email_verification',
    path: '/auth/verify-email/:token',
  },
  dashboard: {
    title: 'Dashboard',
    key: 'dashboard',
    path: '/dashboard',
  },
  workspace: {
    title: 'Workspace',
    key: 'workspace',
    path: '/workspace'
  },
  tracker: {
    title: 'Tracker',
    key: 'tracker',
    path: '/tracker'
  },
  members: {
    title: 'Members',
    key: 'members',
    path: '/members'
  },
  settings: {
    title: 'Settings',
    key: 'settins',
    path: '/settings'
  },
  create_first_workspace: {
    title: 'Create First Workspace',
    key: 'create-first-workspace',
    path: 'workspace/first-workspace',
  },
  notFound: {
    title: 'Page Not Found',
    key: 'page-not-found',
    path: '*',
  },
  home: {
    title: 'Home',
    key: 'home',
    path: '/',
  },
};
