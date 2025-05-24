import React from "react";

const formatPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 11)
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

const PhoneNumberInput = ({ value, onChange, placeholder, size = "nm" }) => {
  const handleChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange?.(formatted);
  };

  return (
    <input
      className={`form-input ${size}`}
      type="text"
      value={value}
      onChange={handleChange}
      maxLength={13}
      placeholder={placeholder}
    />
  );
};

export default PhoneNumberInput;
