import { createSlice } from '@reduxjs/toolkit';

const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: [],
  reducers: {
    setBreadcrumb: (state, action) => action.payload,
    clearBreadcrumb: () => [],
  },
});

export const { setBreadcrumb, clearBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
