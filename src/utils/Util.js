
export const findMappedValue = (mapList, key) => {
  return mapList.find((item) => String(item.key) === String(key))?.value;
};
