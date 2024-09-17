import axios from 'axios';
import {Platform} from 'react-native';

const port = 8000; // TODO: change to your port

const prefixUrl = __DEV__
  ? Platform.OS === 'ios'
    ? `http://localhost:${port}`
    : `http://10.0.2.2:${port}`
  : 'https://cutearecode.up.railway.app';
const version = 'v1';

const instance = axios.create({
  baseURL: `${prefixUrl}/api/${version}`,
  timeout: 60000, // 60 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  // Add token to request header
  // const accessToken = STORAGE.getString(
  //   APP_CONFIG.STORAGE_KEY.TOKEN.ACCESS_TOKEN,
  // );

  // if (accessToken && config.headers) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }

  return config;
});

instance.interceptors.response.use(
  response => {
    // if (response.data?.data?.accessToken) {
    //   STORAGE.set(
    //     APP_CONFIG.STORAGE_KEY.TOKEN.ACCESS_TOKEN,
    //     response.data.data.accessToken,
    //   );
    // }
    // if (response.data?.data?.refreshToken) {
    //   STORAGE.set(
    //     APP_CONFIG.STORAGE_KEY.TOKEN.REFRESH_TOKEN,
    //     response.data.data.refreshToken,
    //   );
    // }
    return response;
  },
  error => {
    // const originalRequest = error.config;
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const refreshToken = STORAGE.getString(
    //     APP_CONFIG.STORAGE_KEY.TOKEN.REFRESH_TOKEN,
    //   );
    //   return instance
    //     .post('/auth/refresh-token', {
    //       refresh_token: refreshToken,
    //     })
    //     .then(res => {
    //       if (res.data.data.access_token) {
    //         STORAGE.set(
    //           APP_CONFIG.STORAGE_KEY.TOKEN.ACCESS_TOKEN,
    //           res.data.data.access_token,
    //         );
    //         originalRequest.headers.Authorization = `Bearer ${res.data.data.access_token}`;
    //         return instance(originalRequest);
    //       }
    //     })
    //     .catch(() => {
    //       STORAGE.delete(APP_CONFIG.STORAGE_KEY.TOKEN.ACCESS_TOKEN);
    //       STORAGE.delete(APP_CONFIG.STORAGE_KEY.TOKEN.REFRESH_TOKEN);
    //       navigateFromRef('Onboarding');
    //     });
    // }
    return Promise.reject(error);
  },
);

export default instance;
