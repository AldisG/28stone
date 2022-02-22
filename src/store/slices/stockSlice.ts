import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchStockName: '',
};

const stockSlice = createSlice({
  name: 'stockSlice',
  initialState,
  reducers: {
    searchFor: (state, {payload}) => {
      state.searchStockName = payload as string;
      console.log(payload)
    },
  },
});

export const { searchFor } = stockSlice.actions
export default stockSlice.reducer;
