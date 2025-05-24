
export const findMappedValue = (mapList, key) => {
  return mapList.find((item) => String(item.key) === String(key))?.value;
};

export const findMappedKey = (mapList, value) => {
  return mapList.find((item) => String(item.value) === String(value))?.key;
};
