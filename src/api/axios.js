import axios from "axios";
import { store } from "../store";
import { logout } from "../features/authSlice"; // 반드시 정의되어 있어야 함
import { ErrorMessages } from "../constants/Message";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";

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
    const message = error.response.data.resultData || ErrorMessages.server;
    const originalRequest = error.config;

    // ✅ Access Token 만료 시 재발급 시도
    // if (status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   try {
    //     const res = await axios.post("/auth/refresh", null, {
    //       withCredentials: true, // 🔑 HttpOnly 쿠키 자동 포함
    //     });

    //     const newToken = res.data.token;

    //     // ✅ 새 토큰 쿠키에 저장
    //     setCookie(newToken);

    //     // ✅ 요청 헤더에 새 토큰 추가
    //     originalRequest.headers.Authorization = `Bearer ${newToken}`;

    //     // ✅ 실패했던 요청 재시도
    //     return instance(originalRequest);
    //   } catch (refreshError) {
    //     // refresh 실패 → 로그아웃 처리
    //     deleteCookie("accessToken");
    //     store.dispatch(logout());

    //     alertHandler?.({
    //       message: ErrorMessages.expired,
    //     });

    //     return Promise.reject(refreshError);
    //   }
    // }

    // ✅ 기타 오류 처리
    if (alertHandler) {
      switch (status) {
        case 403:
          alertHandler({ message: ErrorMessages.noPermission });
          break;
        // case 404:
        //   alertHandler({ message: ErrorMessages.noObject });
        //   break;
        // case 500:
        //   alertHandler({ message: message });
        //   break;
        default:
          alertHandler({ message });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
