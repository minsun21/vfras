export const infoMessage = {
  successUserEdit: `프로필이 성공적으로 저장되었습니다`,
};

export const errorMessages = {
  required: (label) => `${label}을(를) 입력해주세요.`,
  invalidEmail: `이메일 형식이 올바르지 않습니다.`,
  invalidPhone: `전화번호 형식이 올바르지 않습니다.`,
  lengthMismatch: (label, len) => `${label}은(는) ${len}자리여야 합니다.`,
  invalidPassword: `비밀번호는 8~20자의 영문, 숫자, 특수문자를 모두 포함해야 합니다.`,
  confirmPassword: `비밀번호 확인이 맞지 않습니다.`,
  nonSelect: `선택된 항목이 없습니다. 행을 선택한 후 버튼을 클릭해주세요`,
  oneSelect: `단일 행만 선택할 수 있습니다`,
  confirmDelete: (size) => `${size}건 삭제하시겠습니까?`,
};

export const loginMessages = {
  title: `vFRAS 가입자 관리`,
  info1: `로그인이 안될 경우 관리자에게 문의하세요`,
  info2: `로그인이 안될 경우 관리자에게 문의하세요`,
  infoId: "아이디를 입력해주세요",
  errorId: `올바른 아이디를 입력해주세요`,
  errorPassword: `올바른 비밀번호를 입력해주세요`,
  errorIdConfirm: `아이디를 확인할 수 없습니다`,
  errorUsing: `이용중지 처리된 계정입니다. 시스템 관리자에게 문의하세요`,
  errorNetwork: `일시적인 시스템 장애로 로그인할 수 없습니다`,
  errorPasswordAgreement: `비밀번호가 일치하지 않습니다\n비밀번호 검증 5회 실패 시 \n계정이 자동중지 처리되오니 주의하세요`,
};

export const accountMessages = {
  searchPlaceHolder: `아이디, 이름, 부서를 입력해주세요`,
  successAccountSave: `가입자 등록이 완료되었습니다`,
};

export const soundSourceMessage = {
  searchPlaceHolder: `음원코드, 제목/설명을 입력해주세요`,
};

export const subsriberMessage = {
  searchPlaceHolder: `가입자명, 번호를 입력해주세요`,
  approvedError: `이미 가입된 행은 선택할 수 없습니다`,
};

export const countryNumberMessage = {
  info1: `국번을 라인단위로 입력해주세요.`,
  info2: `라인간에는 반드시 엔터를 쳐주시기 바랍니다.`,
  info3: `변경할 국번을 준비하여 복사 후 붙여주세요.`,
};
