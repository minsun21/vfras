import axios from "axios";
import { store } from "../store";
import { logout } from "../features/authSlice"; // 반드시 정의되어 있어야 함
import { ErrorMessages } from "../constants/Message";
import { ROUTES } from "../constants/routes";

let alertHandler = null;
let setLoading = null;

// ✅ 외부에서 alert 핸들러 등록
export const setAlertHandler = (handler) => {
  alertHandler = handler;
};

// ✅ 외부에서 loading 핸들러 등록
export const setLoadingHandler = (handler) => {
  setLoading = handler;
};

const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// 요청 인터셉터
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  setLoading?.(true);
  return config;
});

// 응답 인터셉터
instance.interceptors.response.use(
  (res) => {
    setLoading?.(false);
    return res;
  },
  (error) => {
    setLoading?.(false);

    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (alertHandler) {
      switch (status) {
        case 401:
          // ✅ 토큰/상태 제거
          localStorage.removeItem("accessToken");

          // ✅ 메시지 표시
          alertHandler({
            message: ErrorMessages.expired,
            onConfirm: () => {
              store.dispatch(logout());
            },
          });
          break;

        case 403:
          alertHandler({ message: ErrorMessages.noPermission });
          break;

        case 404:
          alertHandler({ message: ErrorMessages.noObject });
          break;

        case 500:
          alertHandler({ message: ErrorMessages.server });
          break;

        default:
          alertHandler({ message });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
