import axios from "axios";
import { ErrorMessages } from "../constants/Message";

let alertHandler = null;

export const setAlertHandler = (handler) => {
  alertHandler = handler;
};

const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (alertHandler) {
      switch (status) {
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
          alertHandler({ message: message });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;