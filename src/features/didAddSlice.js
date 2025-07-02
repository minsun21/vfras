import { createSlice } from "@reduxjs/toolkit";
import { DID_ADD_FIELDS } from "../config/FieldsConfig";
import { KEYS } from "../constants/Keys";

const initialState = {
  ...Object.fromEntries(
    DID_ADD_FIELDS.flatMap((field) =>
      field.fields ? field.fields.map((f) => [f.key, ""]) : [[field.key, ""]]
    )
  ),
  [KEYS.IS_INTERRUPT]: false,
  [KEYS.IS_CIRCULR_JOINED]: false,
  [KEYS.IS_WEEK_JOINED]: false,
  [KEYS.IS_TIME_JOINED]: false,
  [KEYS.IS_ORGN_JOINED]: false,
  [KEYS.IS_GROUP_JOINED]: false,
  [KEYS.IS_DURA_JOINED]: false,
};

const didAddSlice = createSlice({
  name: "didAdd",
  initialState,
  reducers: {
    setDidFormData: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetFormData: () => ({ ...initialState }),
  },
});

export const { setDidFormData, resetFormData } = didAddSlice.actions;
export default didAddSlice.reducer;
