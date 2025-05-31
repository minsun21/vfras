import { KEYS } from "../constants/Keys";
import { LABELS } from "../constants/Labels";

export const DAY_TYPE = [
  { key: "1", value: "월" },
  { key: "2", value: "화" },
  { key: "3", value: "수" },
  { key: "4", value: "목" },
  { key: "5", value: "금" },
  { key: "6", value: "토" },
  { key: "0", value: "일" },
];

export const ORGNS = [
  { key: "02", value: "서울" },
  { key: "031", value: "경기" },
  { key: "052", value: "대구" },
];

// 사용자 구분
export const ADMIN_TYPES = [
  { key: "admin", value: "Admin" },
  { key: "user", value: "User" },
  { key: "guest", value: "Guest" },
];

// 사용자 상태
export const USER_STATES = [
  { key: "0", value: "가입" },
  { key: "1", value: "요청중" },
];

// 가입자 유형
export const SUBSRIBERS_TYPES = [
  { key: "0", value: "개인" },
  { key: "1", value: "법인" },
];

// 서비스 유형
export const SERVICE_TYPES = [
  { key: "0", value: "개인" },
  { key: "1", value: "개인DJ" },
  { key: "2", value: "기업" },
];

// 검색 구분
export const SEARCH_DIVISIONS = [
  { key: "", value: LABELS.ALL },
  { key: KEYS.NAME, value: LABELS.SUBSCRIBER_NAME },
  { key: KEYS.SUB_NO, value: LABELS.MAIN_NUMBER },
  { key: KEYS.PBX_NUMBER, value: LABELS.PBX_NUMBER },
  { key: KEYS.USER_NUMBER, value: LABELS.USER_NUMBER_F },
];

// 가입자 조회 > 가입자 유형
export const SEARCH_SUBSRIBERS_TYPES = [
  { key: "", value: "전체" },
  { key: "0", value: "개인" },
  { key: "1", value: "법인" },
];

// 가입자 조회 > 서비스 유형
export const SEARCH_SERVICE_TYPES = [
  { key: "", value: "전체" },
  { key: "0", value: "개인" },
  { key: "1", value: "개인DJ" },
  { key: "2", value: "기업" },
];

// 가입자 조회 > 가입자 상태
export const SEARCH_SUBSRIBERS_STATE = [
  { key: "", value: "전체" },
  { key: "0", value: "요청" },
  { key: "1", value: "가입" },
  { key: "2", value: "삭제" },
];

// 세션 시간 관리
export const SESSION_TIMEOUT = {
  HOUR_1: 3600, //1 시간
  HOUR_6: 21600, // 6시간
  DAY_1: 86400, // 하루
  DAY_7: 604800, // 일주일
};
