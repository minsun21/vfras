import axios from 'axios';
import { store } from '../store';
import { logout } from '../features/authSlice';
import { ErrorMessages } from '../constants/Message';
import { getCookie } from '../utils/cookies';

let alertHandler = null;
let setLoading = null;

export const AXIOS_NO_GLOBAL_ERROR = {
  suppressGlobalError: true, // 전역 에러 알림 방지
};

export const setAlertHandler = (handler) => {
  alertHandler = handler;
};

export const setLoadingHandler = (handler) => {
  setLoading = handler;
};

const instance = axios.create({
  baseURL: "/web",
  // baseURL: window.__ENV__?.API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// 요청 인터셉터
instance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';

  const token = getCookie();
  if (token) {
    config.headers['x-authentication'] = token;
  }

  return config;
});

// 응답 인터셉터
instance.interceptors.response.use(
  (res) => {
    setLoading?.(false);
    return res;
  },
  async (error) => {
    setLoading?.(false);

    const status = error.response?.status;
    const message = error.response?.data?.resultData || ErrorMessages.server;
    const originalRequest = error.config;

    if (status === 401) {
      const errMsg = error.response?.data?.resultData;
      if (errMsg === '로그인 정보가 존재하지 않습니다.') {
        sessionStorage.setItem('expiredMessage', ErrorMessages.expired);
        store.dispatch(logout());
        return Promise.reject(error);
      }
    }
    // ✅ 공통 에러 처리 (suppress 옵션 없을 경우만)
    if (!originalRequest?.suppressGlobalError && alertHandler) {
      if (status === 403) {
        alertHandler({ message: ErrorMessages.noPermission });
      } else if (status === 500) {
        alertHandler({ message });
      } else {
        alertHandler({ message });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
