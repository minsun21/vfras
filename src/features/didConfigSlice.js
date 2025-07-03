import { createSlice } from "@reduxjs/toolkit";
import { KEYS } from "../constants/Keys";

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

      const isDuplicate = state.didList.some(
        (item) =>
          item.subNo === newItem.subNo &&
          item.fromNo === newItem.fromNo &&
          item.toNo === newItem.toNo
      );

      // 이미 존재하면 무시
      if (isDuplicate) return;

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
          !itemsToDelete.some(
            (del) =>
              del.subNo === item.subNo &&
              del.fromNo === item.fromNo &&
              del.toNo === item.toNo
          )
      );

      // deleteDidList에 추가 (중복 제거 없이 단순 누적)
      state.deleteDidList.push(...itemsToDelete);

      // 삭제 대상이 addDidList에 있었다면 제거
      state.addDidList = state.addDidList.filter(
        (item) =>
          !itemsToDelete.some(
            (del) =>
              del.subNo === item.subNo &&
              del.fromNo === item.fromNo &&
              del.toNo === item.toNo
          )
      );
    },
    addSubItemToList: (state, action) => {
      const { subNo, fromNo, toNo, subFieldKey, newItem } = action.payload;
      const didItem = state.didList.find(
        (item) =>
          item.subNo === subNo && item.fromNo === fromNo && item.toNo === toNo
      );

      if (!didItem) return;

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
          add: { [subFieldKey]: [newItem] },
          remove: {},
        });
      } else {
        const change = state.subChanges[index];

        // remove 쪽에 같은 항목이 있으면 제거 (취소 처리)
        if (Array.isArray(change.remove[subFieldKey])) {
          change.remove[subFieldKey] = change.remove[subFieldKey].filter(
            (item) => JSON.stringify(item) !== JSON.stringify(newItem)
          );
        }

        // add에 push
        if (!Array.isArray(change.add[subFieldKey])) {
          change.add[subFieldKey] = [];
        }

        const alreadyAdded = change.add[subFieldKey].some(
          (item) => JSON.stringify(item) === JSON.stringify(newItem)
        );

        if (!alreadyAdded) {
          change.add[subFieldKey].push(newItem);
        }
      }
    },
    removeSubItemFromList: (state, action) => {
      const { subNo, fromNo, toNo, subFieldKey, removeItem } = action.payload;

      const didItem = state.didList.find(
        (item) =>
          item.subNo === subNo && item.fromNo === fromNo && item.toNo === toNo
      );
      if (
        !didItem ||
        !didItem.subs ||
        !Array.isArray(didItem.subs[subFieldKey])
      ) {
        return;
      }

      // id 기준으로 삭제
      didItem.subs[subFieldKey] = didItem.subs[subFieldKey].filter(
        (item) => item.id !== removeItem.id
      );

      const index = findSubChangeIndex(state, subNo, fromNo, toNo);
      if (index === -1) {
        state.subChanges.push({
          subNo,
          fromNo,
          toNo,
          add: {},
          remove: { [subFieldKey]: [removeItem] },
        });
      } else {
        const { add, remove } = state.subChanges[index];

        // remove에 push
        if (!Array.isArray(remove[subFieldKey])) {
          remove[subFieldKey] = [];
        }
        remove[subFieldKey].push(removeItem);

        // add에 이미 있었던 항목이면 제거
        if (Array.isArray(add[subFieldKey])) {
          add[subFieldKey] = add[subFieldKey].filter(
            (item) => item.id !== removeItem.id
          );

          // 빈 배열이 되면 키 제거(optional)
          if (add[subFieldKey].length === 0) {
            delete add[subFieldKey];
          }
        }
      }
    },
  },
  addBulkItem: (state, action) => {
    state.bulkAddList.push(action.payload);
  },

  removeBulkItem: (state, action) => {
    const index = state.bulkAddList.findIndex(
      (item) => item.subNo === action.payload.subNo
    );
    if (index !== -1) {
      state.bulkAddList.splice(index, 1);
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
} = didConfigSlice.actions;
export default didConfigSlice.reducer;
