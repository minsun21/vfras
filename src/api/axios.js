import axios from "axios";
import { errorMessages } from "../constants/Message";

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
          alertHandler({ message: errorMessages.noPermission });
          break;
        case 404:
          alertHandler({ message: errorMessages.noObject });
          break;
        case 500:
          alertHandler({ message: errorMessages.server });
          break;
        default:
          alertHandler({ message: message });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;