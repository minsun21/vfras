import { KEYS } from "../constants/Keys";

export const findMappedValue = (mapList, key) => {
  return mapList.find((item) => String(item.key) === String(key))?.value;
};

export const findMappedKey = (mapList, value) => {
  return mapList.find((item) => String(item.value) === String(value))?.key;
};

export const getDidKey = (item) =>
  `${item[KEYS.SUB_NO]}_${item[KEYS.FROM_NO]}_${item[KEYS.TO_NO]}_${
    item[KEYS.TEL_FROM_NO]
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
