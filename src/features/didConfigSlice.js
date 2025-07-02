import { createSlice } from "@reduxjs/toolkit";
import { KEYS } from "../constants/Keys";

const initialState = {
  [KEYS.DID_CONFIG]: [],
  didList: [], // 전체 회선
  addDidList: [], // 추가할 회선
  deleteDidList: [], // 삭제할 회선
  bulkAddList: [], // 일괄 저장
  bulkRemoveList: [], // 일괄 삭제
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
    deleteDidItem: (state, action) => {
      const { subNo, fromNo, toNo } = action.payload;
      state.didList = state.didList.filter(
        (item) =>
          !(item.subNo === subNo && item.fromNo === fromNo && item.toNo === toNo)
      );
      state.deleteDidList.push(action.payload);
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
      didItem.subs[subFieldKey].push(newItem);

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
        const addList = state.subChanges[index].add;
        if (!Array.isArray(addList[subFieldKey])) {
          addList[subFieldKey] = [];
        }
        addList[subFieldKey].push(newItem);
      }
    },

    removeSubItemFromList: (state, action) => {
      const { subNo, fromNo, toNo, subFieldKey, removeItem } = action.payload;
      const didItem = state.didList.find(
        (item) =>
          item.subNo === subNo && item.fromNo === fromNo && item.toNo === toNo
      );
      if (!didItem || !didItem.subs || !Array.isArray(didItem.subs[subFieldKey])) {
        return;
      }
      didItem.subs[subFieldKey] = didItem.subs[subFieldKey].filter(
        (item) => item.rbtId !== removeItem.rbtId
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
        const removeList = state.subChanges[index].remove;
        if (!Array.isArray(removeList[subFieldKey])) {
          removeList[subFieldKey] = [];
        }
        removeList[subFieldKey].push(removeItem);
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
