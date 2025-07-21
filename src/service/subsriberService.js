import axios from "../api/axios";
import { ROUTES } from "../constants/routes";
import { KEYS } from "../constants/Keys";
import { SEARCH_SUBSRIBERS_STATE } from "../config/OptionConfig";
import { ErrorMessages } from "../constants/Message";

/**
 * 승인 전 유효성 검사
 * @returns 에러 메시지 또는 null
 */
export const validateSubscribersBeforeApprove = (selectRows) => {
  if (selectRows.length === 0) {
    return "선택된 가입자가 없습니다.";
  }

  const invalid = selectRows.find(
    (row) => row[KEYS.SUB_STATUS] !== SEARCH_SUBSRIBERS_STATE[1].key
  );

  if (invalid) {
    return "승인 가능한 상태가 아닌 가입자가 포함되어 있습니다.";
  }

  return null;
};

/**
 * 가입자 승인 요청
 */
export const approveSubscribers = async (subNos) => {
  await axios.put(ROUTES.SUBSCRIBERS_APPROVE, subNos);
};

/**
 * 삭제 전 유효성 검사
 */
export const validateSubscribersBeforeDelete = (selectRows) => {
  if (selectRows.length === 0) {
    return ErrorMessages.nonSelect;
  }
  return null;
};

/**
 * 가입자 삭제 요청
 */
export const deleteSubscribers = async (subNos) => {
  return axios.delete(ROUTES.SUBSCRIBERS, {
    data: subNos,
  });
};