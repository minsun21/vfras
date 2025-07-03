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
