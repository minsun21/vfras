import { createSlice } from "@reduxjs/toolkit";
import { KEYS } from "../constants/Keys";

const initialState = {
  [KEYS.OLD_PASSWORD]: "",
  [KEYS.NEW_PASSWORD1]: "",
  [KEYS.NEW_PASSWORD2]: "",
};

const passwordSlice = createSlice({
  name: [KEYS.PASSWORD],
  initialState,
  reducers: {
    setPasswordField: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetPasswordFields: () => ({ ...initialState }),
  },
});

export const { setPasswordField, resetPasswordFields } = passwordSlice.actions;
export default passwordSlice.reducer;
