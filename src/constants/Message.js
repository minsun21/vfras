export const InfoMessages = {
  noSearchResult: `해당하는 데이터가 없습니다.`,
  successDelete: "삭제 되었습니다.",
  successEdit: "수정정보가 저장되었습니다.",
  confirmDelete: (size) => `${size}건 삭제하시겠습니까?`,
  confirmCancel: "취소하시겠습니까?",
  successAccountSave: `해당 계정이 등록되었습니다.`,
  confirmLogout: `로그아웃 하시겠습니까?`,
  confirmRegister: `등록 하시겠습니까?`,
  confirmSave: "저장 하시겠습니까?",
  confirmAdd: "추가 하시겠습니까?",
  mobile: "숫자만 입력해주세요.",
  successAdd: "추가 되었습니다.",
  confirmAllDelete: "전체 삭제하시겠습니까?",
};

export const ProfileMessages = {
  successUserEdit: `프로필이 성공적으로 저장되었습니다.`,
  successPasswordChange: `비밀번호가 변경되었습니다.`,
  info1: `※ 사용자구분, 부서 변경이 필요한 경우 시스템 관리자에게 문의해 주세요.`,
};

export const ErrorMessages = {
  expired: "세션이 만료되었습니다.\n다시 로그인해주세요.",
  required: (label) => `${label}을(를) 입력해주세요.`,
  invalidEmail: `이메일 형식이 올바르지 않습니다.`,
  invalidPhone: `전화번호 형식이 올바르지 않습니다.`,
  lengthMismatch: (label, min, max) =>
    `${label}은(는) ${min} ~ ${max}자리여야 합니다.`,
  lengthMismatch2: (label, length) =>
    `${label}은(는) ${length}자리여야 합니다.`,
  invalidPassword: `비밀번호는 8~20자의 영문, 숫자, 특수문자를 모두 포함해야 합니다.`,
  confirmPassword: `비밀번호 확인이 맞지 않습니다.`,
  confirmCurrentPassword: `현재 비밀번호가 맞지 않습니다.`,
  nonSelect: `항목을 먼저 선택해주세요.`,
  oneSelect: `하나의 항목을 선택해주세요.`,
  emptyValue: `빈 항목이 있습니다`,
  noPermission: `권한이 없습니다.`,
  noObject: `요청한 리소스를 찾을 수 없습니다.`,
  server: `서버 내부 오류입니다.`,
  correctPassword: `비밀번호가 일치하지 않습니다. 다시 확인해주세요.`,
  deleteBulk: "전체 삭제는 할 수 없습니다.",
  date: "시작 날짜는 종료 날짜보다 빠르거나 같아야 합니다.",
  time: "시작 시간은 종료 시간보다 빠르거나 같아야 합니다.",
  max: (title, max) => `${title} 항목은 최대 ${max}개까지 등록할 수 있습니다.`,
  dateStart: "시작일을 먼저 지정해주세요.",
  duplicateSave : "중복 회선은 생성할 수 없습니다."
};

export const LoginMessages = {
  title: `vFRAS 가입자 관리`,
  info1: `로그인이 안될 경우 관리자에게 문의하세요`,
  info2: `로그인이 안될 경우 관리자에게 문의하세요`,
  infoId: "아이디를 입력해주세요",
  infoPassword: "비밀번호를 입력해 주세요",
  errorId: `올바른 아이디를 입력해주세요`,
  errorPassword: `올바른 비밀번호를 입력해주세요`,
  errorIdConfirm: `아이디를 확인할 수 없습니다`,
  errorUsing: `이용중지 처리된 계정입니다.\n시스템 관리자에게 문의하세요`,
  errorNetwork: `일시적인 시스템 장애로 로그인할 수 없습니다`,
  errorPasswordAgreement: `비밀번호가 일치하지 않습니다\n비밀번호 검증 5회 실패 시 \n계정이 자동중지 처리되오니 주의하세요`,
  errorStopUser:
    "비밀번호 5회 이상 검증 실패로 사용자 계정이 자동중지 처리되었습니다.\n관리자에게 문의하세요.",
};

export const AccountMessages = {
  searchPlaceHolder: `아이디, 이름, 부서를 입력해주세요.`,
  adminIdPresent: "해당 아이디가 이미 존재합니다.",
};

export const SoundSourceMessages = {
  searchPlaceHolder: `음원코드, 제목/설명을 입력해주세요.`,
};

export const SubsriberMessages = {
  searchPlaceHolder: `가입자명, 번호를 입력해주세요.`,
  approvedError: `이미 가입되었거나 삭제된 행은 선택할 수 없습니다.`,
  resetPasswordConfirm: `패스워드를 초기화 하시겠습니까?`,
  didPlaceHolder: `부가서비스 설정을 원하는 행을 선택하세요.`,
  searchPlaceHolder2: `대표번호를 입력해주세요.`,
  resetPassword: `초기화 되었습니다.`,
  noSearchSubsriber: "가입자를 찾을 수 없습니다.",
  subsriberPresent: "해당 대표번호가 이미 존재합니다.",
};

export const LvMessages = {
  info1: `국번을 라인단위로 입력해주세요.`,
  info2: `라인간에는 반드시 엔터를 쳐주시기 바랍니다.`,
  info3: `변경할 국번을 준비하여 복사 후 붙여주세요.`,
  allChange: `전체 변경하시겠습니까?`,
  errorChange: `변경할 국번을 다시 확인해주세요`,
  successChange: `전체 변경되었습니다`,
};
