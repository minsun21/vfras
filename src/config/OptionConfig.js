import { LABELS } from "../constants/Labels";

export const DAY_TYPE = [
    { key: "0", value: "선택안함" },
    { key: "1", value: "일" },
    { key: "2", value: "월" },
    { key: "3", value: "화" },
    { key: "4", value: "수" },
    { key: "5", value: "목" },
    { key: "6", value: "금" },
    { key: "7", value: "토" },
];

export const AREA_CODES = [
    { key: "02", value: "서울(02)" },
    { key: "031", value: "경기(031)" },
    { key: "032", value: "인천(032)" },
    { key: "033", value: "강원(033)" },
    { key: "041", value: "충남(041)" },
    { key: "042", value: "대전(042)" },
    { key: "043", value: "충북(043)" },
    { key: "044", value: "세종(044)" },
    { key: "051", value: "부산(051)" },
    { key: "052", value: "울산(052)" },
    { key: "053", value: "대구(053)" },
    { key: "054", value: "경북(054)" },
    { key: "055", value: "경남(055)" },
    { key: "061", value: "전남(061)" },
    { key: "062", value: "광주(062)" },
    { key: "063", value: "전북(063)" },
    { key: "064", value: "제주(064)" },
];

// 사용자 구분
export const ADMIN_TYPES = [
    { key: "Admin", value: "Admin" },
    { key: "User", value: "User" },
    { key: "Guest", value: "Guest" },
];

// 사용자 상태
export const USER_STATES = [
    { key: "0", value: "요청중" },
    { key: "1", value: "가입" },
];

// 사용자 잠금 상태
export const STATUS = [
    { key: "N", value: "활성" },
    { key: "L", value: "잠금" },
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
export const SEARCH_TYPES = [
    { key: "", value: LABELS.ALL },
    { key: "NAME", value: LABELS.SUBSCRIBER_NAME },
    { key: "SUBSCRIBER_NO", value: LABELS.MAIN_NUMBER },
    { key: "RANGE_TEL", value: LABELS.PBX_NUMBER },
    { key: "TEL_NO", value: LABELS.USER_NUMBER_F },
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
    { key: "0", value: "요청중" },
    { key: "1", value: "가입" },
];

// 세션 시간 관리
export const SESSION_TIMEOUT = {
    HOUR_1: 3600, //1 시간
    HOUR_6: 21600, // 6시간
    DAY_1: 86400, // 하루
    DAY_7: 604800, // 일주일
};
