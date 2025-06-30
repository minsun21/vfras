import { KEYS } from "../constants/Keys";
import { ErrorMessages } from "../constants/Message";

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone) => {
  //   const cleaned = phone.replace(/[^0-9]/g, "");
  // const regex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  // return regex.test(phone);
  return phone.length === 11;
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
    const {
      key,
      label,
      required,
      type,
      min,
      max,
      length,
      disabled,
      fields: nestedFields,
    } = field;

    if (disabled) continue;

    const value = formData[key];

    // ✅ 1. 기본 필수값 검사
    if (required && !value && !nestedFields) {
      return ErrorMessages.required(label);
    }

    // ✅ 2. 중첩 필드가 있는 경우
    if (required && nestedFields?.length) {
      for (const subField of nestedFields) {
        const subValue = formData[subField.key];

        // 2-1. 필수값
        if (subValue === undefined || subValue === "") {
          return ErrorMessages.required(`${label}`);
        }

        // 2-2. 길이 검사 (number 포함)
        if (subField.length) {
          const actualLength = String(subValue).length;
          if (actualLength !== subField.length) {
            return ErrorMessages.lengthMismatch2(`${label}`, subField.length);
          }
        }
      }
    }

    // ✅ 3. 타입별 validation
    if (key === KEYS.MOBILE && !isValidPhone(value)) {
      return ErrorMessages.invalidPhone;
    }

    if (type === "email" && !isValidEmail(value)) {
      return ErrorMessages.invalidEmail;
    }

    // ✅ 4. 길이 검사 (string)
    if (typeof value === "string") {
      if (min && max && (value.length < min || value.length > max)) {
        return ErrorMessages.lengthMismatch(label, min, max);
      }

      if (length && value.length !== length) {
        return ErrorMessages.lengthMismatch2(label, length);
      }
    }

    // ✅ 5. 비밀번호 검사
    if (type === "password") {
      if (!isValidPassword(value)) {
        return ErrorMessages.invalidPassword;
      }
      if (value !== formData[KEYS.PASSWORD_CONFIRM]) {
        return ErrorMessages.correctPassword;
      }
    }
  }

  return;
};