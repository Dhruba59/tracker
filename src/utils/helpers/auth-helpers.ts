// import { UserDetailsResponse } from '@models/user-models';
import { LOCAL_STORAGE_KEYS } from '../constants/storage-constants';

export function ensureTrailingSlash(str: string = '/') {
  return str.endsWith('/') ? str : `${str}/`;
}

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  // const accessToken = tokenData ? JSON.parse(tokenData)?.access_token : '';
  return accessToken ?? '';
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
