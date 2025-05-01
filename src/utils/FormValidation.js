import { errorMessages } from "../constants/Message";

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
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,20}$/;
  return regex.test(password);
};


export const accountValidate = (fields, formData) => {
  for (const field of fields) {
    const { key, label, required, type, requiredLength } = field;
    // 1. 필수값인지 확인
    if (required && !formData[key]) {
      alert(errorMessages.required(label));
      return false;
    }

    // 2. 타입에 따라 validation 체크(email, phone...)
    if (type === "email" && !isValidEmail(formData[key])) {
      alert(errorMessages.invalidEmail());
      return;
    }

    if (type === "phone" && !isValidPhone(formData[key])) {
      alert(errorMessages.invalidPhone());
      return;
    }

    // 3. 최소 길이 체크
    if (requiredLength && formData[key].length !== requiredLength) {
      alert(errorMessages.lengthMismatch(label, requiredLength));
      return;
    }

    // 4. 비밀번호 체크
    if (type === "password") {
      if(!isValidPassword(key)){
        alert(errorMessages.invalidPassword());
        return;
      }
      if(formData[key] === formData['passwordConfirm']){
        alert(errorMessages.confirmPassword());
        return;
      }
    }
  }

  return true;
};