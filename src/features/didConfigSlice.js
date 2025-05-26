import { createSlice } from '@reduxjs/toolkit';
import { KEYS } from '../constants/Keys';

const initialState = {
  [KEYS.DID_CONFIG] : [],
};

const didConfigSlice = createSlice({
  name: [KEYS.DID_CONFIG],
  initialState,
  reducers: {
    setConfigData: (state, action) => {
      state[KEYS.DID_CONFIG]  = action.payload;
    },
  },
});

export const { setConfigData } = didConfigSlice.actions;
export default didConfigSlice.reducer;
