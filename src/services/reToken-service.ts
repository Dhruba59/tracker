import { API_END_POINTS, STATUS_CODES } from '@constants/global-constants';
import { routes } from '@constants/route-constants';
import { LOCAL_STORAGE_KEYS } from '@constants/storage-constants';
import { ensureTrailingSlash, getAccessToken, getRefreshToken } from '@helpers/auth-helpers';
import { clearStorage } from '@helpers/global-helpers';
import { LoginResponse } from '@models/auth-models';
import axios from 'axios';

export function getRetoken(): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    axios
      .create({
        baseURL: ensureTrailingSlash(process.env.REACT_APP_API_BASE_URL ?? ''),
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .post(API_END_POINTS.RE_TOKEN, {refreshToken: getRefreshToken()})
      .then(async (resp: any) => {
        await localStorage.setItem(
          LOCAL_STORAGE_KEYS.AUTH_TOKEN,
          JSON.stringify({ 
            access_token: resp.data.payload?.access_token ?? '', 
            refresh_token: resp.data.payload?.refresh_token ?? ''
          })
        );
        resolve(resp.data);
      })
      .catch((err) => {
        if(err?.response.status === STATUS_CODES.REFRESH_TOKEN_EXPIRED) {
          clearStorage();
          location.href = routes.login.path;
        }
        reject(err);
      });
  });
}