export const ROUTES = {
  SUBSCRIBERS: "/subscribers", // 가입자 조회
  SUBSCRIBERS_REGISTER: "/subscribers/register", // 가입자 등록
  SUBSCRIBERS_MANAGE: "/subscriber/manage", // 가입자 관리
  SUBSCRIBERS_APPROVE: "/subscribers/status/approve", // 가입자 승인
  SUBSCRIBERS_DETAIL: (subNo) => `/subscribers/${subNo}`, // 가입자 상세
  SUBSCRIBERS_RBT: (subNo) => `/subscriber/${subNo}/rbt`, // 회선 조회 / 생성
  SUBSRIBER_RBT_DETAIL: (subNo, fromNo, toNo) =>
    `/subscriber/${subNo}/rbt/${fromNo}/${toNo}`, // 부가서비스 상세 조회
  CIRCULAR: (subNo, fromNo, toNo) =>
    `/subscriber/${subNo}/rbt/${fromNo}/${toNo}/circular`, // 순환링 부가서비스 저장
  CIRCULAR_BULK: (subNo) => `/subscriber/${subNo}/rbt/circular_blk`, // 순환링 부가서비스 일괄 저장
  TIME: (subNo, fromNo, toNo) =>
    `/subscriber/${subNo}/rbt/${fromNo}/${toNo}/time`, // 시간대별 부가서비스 저장
  TIME_BULK: (subNo) => `/subscriber/${subNo}/rbt/time_blk`, // 순환링 부가서비스 일괄 저장
  WEEK: (subNo, fromNo, toNo) =>
    `/subscriber/${subNo}/rbt/${fromNo}/${toNo}/week`, // 요일별 부가서비스 저장
  WEEK_BULK: (subNo) => `/subscriber/${subNo}/rbt/week_blk`, // 요일별 부가서비스 일괄 저장
  ORGN: (subNo, fromNo, toNo) =>
    `/subscriber/${subNo}/rbt/${fromNo}/${toNo}/orgn`, // 지역별 부가서비스 저장
  ORGN_BULK: (subNo) => `/subscriber/${subNo}/rbt/orgn_blk`, // 지역별 부가서비스 일괄 저장
  DURA: (subNo, fromNo, toNo) =>
    `/subscriber/${subNo}/rbt/${fromNo}/${toNo}/dura`, // 기념일별 부가서비스 저장
  DURA_BULK: (subNo) => `/subscriber/${subNo}/rbt/dura_blk`, // 기념일별 부가서비스 일괄 저장
  GROUP: (subNo, fromNo, toNo) =>
    `/subscriber/${subNo}/rbt/${fromNo}/${toNo}/group`, // 기념일별 부가서비스 저장
  STOP: (subNo, fromNo, toNo) =>
    `/subscriber/${subNo}/rbt/${fromNo}/${toNo}/stop`, // 부가서비스 일시정지
  GROUP_BULK: (subNo) =>
    `/subscriber/${subNo}/rbt/group_blk`, // 기념일별 부가서비스 일괄 저장
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
