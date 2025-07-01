export const ROUTES = {
  SUBSCRIBERS: "/subscribers", // 가입자 조회
  SUBSCRIBERS_REGISTER: "/subscribers/register", // 가입자 등록
  SUBSCRIBERS_MANAGE: "/subscriber/manage", // 가입자 관리
  SUBSCRIBERS_APPROVE: "/subscribers/status/approve", // 가입자 승인
  SUBSCRIBERS_DETAIL: (subNo) => `/subscribers/${subNo}`, // 가입자 상세
  SUBSCRIBERS_RBT: (subNo) => `/subscriber/${subNo}/rbt`, // 회선 목록 조회
  RESET_SUBSCRIBER_PASSWORD: (subNo) => `/subscribers/${subNo}/password`, // 비밀번호 초기화
  LV: "/lvs", // 국번 관리
  CONTENTS: "/contents", // 음원 조회
  ACCOUNTS: "/accounts", // 관리자 계정 관리
  ACCOUNT_REGISTER: "/accounts/register", // 관리자 계정 등록
  ACCOUNT_EDIT: "/accounts/manage", // 관리자 계정 상세
  ACCOUNTS_MANAGE: (adminId) => `/accounts/${adminId}`, // 관리자 계정 삭제 / 상세 조회
  HISTORY: "/histories", // 접속 계정 이력
  HISTORY_DETAIL: (adminId) => `/histories/${adminId}`, // 상세 이력
  PASSWORD_CHANGE: (adminId) => `/my/${adminId}/password`, // 비밀번호 변경
  PROFILE_EDIT: (adminId) => `/my/${adminId}`,
  PROFILE: "/my", // 내 정보 조회
  LOGOUT: "/logout",
  LOGIN: "/login",
  UNAUTHORIZED: "/unauthorized",
  ROOT: "/",
  ALL: "*",
};
