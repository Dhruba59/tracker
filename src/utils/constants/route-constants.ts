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
  dashboard: {
    title: 'Dashboard',
    key: 'dashboard',
    path: '/dashboard',
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
