import { KEYS } from "../constants/Keys";
import { ErrorMessages } from "../constants/Message";

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone) => {
  //   const cleaned = phone.replace(/[^0-9]/g, "");
  const regex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  return regex.test(phone);
};

export const isValidPassword = (password) => {
  // 8~20 영문/숫자/특수문자 혼합
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?`~\\]).{8,20}$/;
  return regex.test(password);
};

export const hasEmptyValue = (obj) => {
  if (!obj || Object.keys(obj).length === 0) return true;

  return Object.values(obj).some(
    (value) =>
      value == null || // null, undefined
      (typeof value === "string" && value.trim() === "") // 공백 문자열
  );
};

export const fieldsValidate = (fields, formData) => {
  for (const field of fields) {
    const { key, label, required, type, min, max } = field;
    // 1. 필수값인지 확인
    if (required && !formData[key]) {
      return ErrorMessages.required(label);
    }

    // 2. 타입에 따라 validation 체크(email, phone...)
    if (key === KEYS.MOBILE && !isValidPhone(formData[key])) {
      return ErrorMessages.invalidPhone;
    }

    if (type === "email" && !isValidEmail(formData[key])) {
      return ErrorMessages.invalidEmail;
    }

    // 3. 길이 체크
    if (
      min &&
      max &&
      (formData[key].length < min || formData[key].length > max)
    ) {
      return ErrorMessages.lengthMismatch(label, min, max);
    }

    // 비밀번호 체크
    if (type === "password") {
      if (!isValidPassword(formData[key])) {
        return ErrorMessages.invalidPassword;
      }

      if (formData[key] !== formData[KEYS.PASSWORD_CONFIRM]) {
        return ErrorMessages.correctPassword;
      }
    }
  }
};
