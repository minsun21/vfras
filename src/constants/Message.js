
export const errorMessages = {
    required: (label) => `${label}을(를) 입력해주세요.`,
    invalidEmail: () => `이메일 형식이 올바르지 않습니다.`,
    invalidPhone: () => `전화번호 형식이 올바르지 않습니다.`,
    lengthMismatch: (label, len) => `${label}은(는) ${len}자리여야 합니다.`,
    invalidPassword : () => `비밀번호는 8~20자의 영문, 숫자, 특수문자를 모두 포함해야 합니다.`,
    confirmPassword : () => `비밀번호 확인이 맞지 않습니다.`
  };

