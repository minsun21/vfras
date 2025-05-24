import { createSlice } from '@reduxjs/toolkit';
import { KEYS } from '../constants/Keys';

const initialState = {
  [KEYS.DID_PERSONAL_CONFIG] : [],
};

const didPersonalSlice = createSlice({
  name: [KEYS.DID_PERSONAL_CONFIG],
  initialState,
  reducers: {
    setPersonalData: (state, action) => {
      state[KEYS.DID_PERSONAL_CONFIG]  = action.payload;
    },
  },
});

export const { setPersonalData } = didPersonalSlice.actions;
export default didPersonalSlice.reducer;
