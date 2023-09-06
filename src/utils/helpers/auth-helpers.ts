// import { UserDetailsResponse } from '@models/user-models';
import { LOCAL_STORAGE_KEYS } from '../constants/storage-constants';

export function ensureTrailingSlash(str: string = '/') {
  return str.endsWith('/') ? str : `${str}/`;
}

export const getAccessToken = () => {
  const tokenData = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  const accessToken = tokenData ? JSON.parse(tokenData)?.access_token : '';
  return accessToken ?? '';
};

export const getRefreshToken = () => {
  const tokenData = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  const refreshToken = tokenData ? JSON.parse(tokenData)?.refresh_token : '';
  return refreshToken ?? '';
};

export const getCookies = () => {
  const cookieData = localStorage.getItem(LOCAL_STORAGE_KEYS.COOKIE);
  const accessCookie = cookieData ? JSON.parse(cookieData)?.access_token : '';

  return accessCookie;
};

// export function getUserDetails(): UserDetailsResponse {
//   return JSON.parse(
//     localStorage.getItem(LOCAL_STORAGE_KEYS.USER_INFO) || 'null'
//   );
// }
