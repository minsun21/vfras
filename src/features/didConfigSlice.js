import { createSlice } from "@reduxjs/toolkit";
import { KEYS } from "../constants/Keys";
import { getDidKey } from "../utils/Util";

const initialState = {
  [KEYS.DID_CONFIG]: [],
  didList: [], // 전체 회선
  addDidList: [], // 추가할 회선
  deleteDidList: [], // 삭제할 회선
  bulkAddList: [], // 일괄 저장
  bulkRemoveList: [], // 일괄 삭제
  subChanges: [],
};

const findSubChangeIndex = (state, subNo, fromNo, toNo) =>
  state.subChanges.findIndex(
    (item) =>
      item.subNo === subNo && item.fromNo === fromNo && item.toNo === toNo
  );

const didConfigSlice = createSlice({
  name: [KEYS.DID_CONFIG],
  initialState,
  reducers: {
    setConfigData: (state, action) => {
      state[KEYS.DID_CONFIG] = action.payload;
    },
    setDidList: (state, action) => {
      // 회선 초기화
      state.didList = action.payload;
    },
    addDidItem: (state, action) => {
      const newItem = action.payload;

      // UI용 목록에 추가
      state.didList.push(newItem);

      // 서버 전송용 추가 목록에 저장
      state.addDidList.push(newItem);
    },
    deleteDidItem: (state, action) => {
      const itemsToDelete = action.payload;
      // didList에서 제거
      state.didList = state.didList.filter(
        (item) =>
          !itemsToDelete.some((del) => getDidKey(del) === getDidKey(item))
      );

      // deleteDidList에 추가 (중복 제거 없이 단순 누적)
      state.deleteDidList.push(...itemsToDelete);

      // 삭제 대상이 addDidList에 있었다면 제거
      state.addDidList = state.addDidList.filter(
        (item) =>
          !itemsToDelete.some((del) => getDidKey(del) === getDidKey(item))
      );
    },
    addSubItemToList: (state, action) => {
      const { selectDid, subFieldKey, newItem } = action.payload;
      const { subNo, fromNo, toNo, telFromNo, telToNo } = selectDid;

      const currentKey = getDidKey({ subNo, fromNo, toNo, telFromNo, telToNo });

      const didItem = state.didList.find(
        (item) => getDidKey(item) === currentKey
      );
      if (!didItem) return;

      // subs 초기화 및 대상 배열 준비
      if (!didItem.subs) didItem.subs = {};
      if (!Array.isArray(didItem.subs[subFieldKey])) {
        didItem.subs[subFieldKey] = [];
      }

      // 중복 추가 방지
      const exists = didItem.subs[subFieldKey].some(
        (item) => JSON.stringify(item) === JSON.stringify(newItem)
      );
      if (!exists) {
        didItem.subs[subFieldKey].push(newItem);
      }

      const index = findSubChangeIndex(state, subNo, fromNo, toNo);
      if (index === -1) {
        state.subChanges.push({
          subNo,
          fromNo,
          toNo,
          telFromNo,
          telToNo,
          add: { [subFieldKey]: [newItem] },
          remove: {},
        });
        return;
      }

      const change = state.subChanges[index];

      // remove에 있던 항목이면 제거 (취소 개념)
      if (Array.isArray(change.remove[subFieldKey])) {
        change.remove[subFieldKey] = change.remove[subFieldKey].filter(
          (item) => JSON.stringify(item) !== JSON.stringify(newItem)
        );
      }

      // add에 없으면 추가
      if (!Array.isArray(change.add[subFieldKey])) {
        change.add[subFieldKey] = [];
      }

      const alreadyAdded = change.add[subFieldKey].some(
        (item) => JSON.stringify(item) === JSON.stringify(newItem)
      );
      if (!alreadyAdded) {
        change.add[subFieldKey].push(newItem);
      }
    },
    removeSubItemFromList: (state, action) => {
      const { selectDid, subFieldKey, removeItem } = action.payload;
      const { subNo, fromNo, toNo, telFromNo, telToNo } = selectDid;

      const currentKey = getDidKey({ subNo, fromNo, toNo, telFromNo, telToNo });

      const didItem = state.didList.find(
        (item) => getDidKey(item) === currentKey
      );

      if (
        !didItem ||
        !didItem.subs ||
        !Array.isArray(didItem.subs[subFieldKey])
      ) {
        return;
      }

      // 🔸 모든 내용 비교하여 삭제
      didItem.subs[subFieldKey] = didItem.subs[subFieldKey].filter(
        (item) => JSON.stringify(item) !== JSON.stringify(removeItem)
      );

      const index = findSubChangeIndex(state, subNo, fromNo, toNo);

      if (index === -1) {
        state.subChanges.push({
          subNo,
          fromNo,
          toNo,
          telFromNo,
          telToNo,
          add: {},
          remove: { [subFieldKey]: [removeItem] },
        });
      } else {
        const { add, remove } = state.subChanges[index];

        // 🔸 remove에 중복 없이 추가
        if (!Array.isArray(remove[subFieldKey])) {
          remove[subFieldKey] = [];
        }
        const alreadyRemoved = remove[subFieldKey].some(
          (item) => JSON.stringify(item) === JSON.stringify(removeItem)
        );
        if (!alreadyRemoved) {
          remove[subFieldKey].push(removeItem);
        }

        // 🔸 add에 있었으면 제거 (취소)
        if (Array.isArray(add[subFieldKey])) {
          add[subFieldKey] = add[subFieldKey].filter(
            (item) => JSON.stringify(item) !== JSON.stringify(removeItem)
          );

          if (add[subFieldKey].length === 0) {
            delete add[subFieldKey];
          }
        }
      }
    },
    addBulkItem: (state, action) => {
      const { key, items } = action.payload;

      const existingIndex = state.bulkAddList.findIndex(
        (entry) => entry.key === key
      );

      if (existingIndex !== -1) {
        state.bulkAddList[existingIndex].items.push(...items);
      } else {
        // 새로운 key면 새로 추가
        state.bulkAddList.push({ key, items });
      }
    },
    removeBulkItem: (state, action) => {
      const { key, items } = action.payload;

      const existingIndex = state.bulkAddList.findIndex(
        (entry) => entry.key === key
      );

      if (existingIndex !== -1) {
        state.bulkRemoveList[existingIndex].items.push(...items);
      } else {
        // 새로운 key면 새로 추가
        state.bulkRemoveList.push({ key, items });
      }
    }
  },
});

export const {
  setConfigData,
  setDidList,
  addDidItem,
  deleteDidItem,
  addSubItemToList,
  removeSubItemFromList,
  addBulkItem,
  removeBulkItem
} = didConfigSlice.actions;
export default didConfigSlice.reducer;
