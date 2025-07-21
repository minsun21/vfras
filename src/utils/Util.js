import { KEYS } from "../constants/Keys";

export const findMappedValue = (mapList, key) => {
  return mapList.find((item) => String(item.key) === String(key))?.value;
};

export const findMappedKey = (mapList, value) => {
  return mapList.find((item) => String(item.value) === String(value))?.key;
};

export const getDidKey = (item) =>
  `${item[KEYS.SUB_NO]}_${item[KEYS.FROM_NO]}_${item[KEYS.TO_NO]}_${item[KEYS.TEL_FROM_NO]
  }_${item[KEYS.TEL_TO_NO]}}`;

export const deepEqual = (a, b) => {
  if (a === b) return true;

  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
};

export const isObjectInList = (target, list) => {
  return list.some(item =>
    Object.keys(target).length === Object.keys(item).length &&
    Object.keys(target).every(key => target[key] == item[key])
  );
};

export const isKeyValueInList = (key, value, list) => {
  return list.some(item => item[key] == value);
};

// "20250701" → "2025-07-01"
export const formatDateWithDash = (dateStr) => {
  if (!/^\d{8}$/.test(dateStr)) return dateStr; // 8자리 숫자 아니면 그대로 반환
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
};

// "2025-07-01" → "20250701"
export const removeDashFromDate = (dateStr) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  return dateStr.replace(/-/g, "");
};