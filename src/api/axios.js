import axios from "axios";
import { store } from "../store";
import { logout } from "../features/authSlice";
import { ErrorMessages } from "../constants/Message";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";

let alertHandler = null;
let setLoading = null;

export const AXIOS_NO_GLOBAL_ERROR = {
  suppressGlobalError: true, // 전역 에러 알림 방지
}

export const setAlertHandler = (handler) => {
  alertHandler = handler;
};

export const setLoadingHandler = (handler) => {
  setLoading = handler;
};

const instance = axios.create({
  baseURL: "/web",
  timeout: 10000,
});

// 요청 인터셉터
instance.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";

  const token = getCookie();
  if (token) {
    config.headers["x-authentication"] = token;
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

    // ✅ 공통 에러 처리 (suppress 옵션 없을 경우만)
    if (!originalRequest?.suppressGlobalError && alertHandler) {
      switch (status) {
        case 401:
          alertHandler({ message: ErrorMessages.expired });
          break;
        case 403:
          alertHandler({ message: ErrorMessages.noPermission });
          break;
        case 500:
          alertHandler({ message }); // 500 포함한 공통 처리
          break;
        default:
          alertHandler({ message }); // 기타 모든 에러
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
