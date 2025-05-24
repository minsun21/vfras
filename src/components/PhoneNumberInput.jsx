import React from "react";
import { InfoMessages } from "../constants/Message";

const formatPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 11)
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

const PhoneNumberInput = ({ value, onChange, size = "nm" }) => {
  const handleChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: formatted,
      },
    };
    onChange?.(syntheticEvent);
  };

  return (
    <input
      className={`form-input ${size}`}
      type="text"
      value={value}
      onChange={handleChange}
      maxLength={13}
      placeholder={InfoMessages.mobile}
    />
  );
};

export default PhoneNumberInput;
