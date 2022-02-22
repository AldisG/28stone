import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchStockName: '',
  getMoreDetailsOfStock: '',
};

const stockSlice = createSlice({
  name: 'stockSlice',
  initialState,
  reducers: {
    searchFor: (state, {payload}) => {
      state.searchStockName = payload as string;
    },
    getDetailsOf: (state, {payload}) => {
      state.getMoreDetailsOfStock = payload as string;
    },
  },
});

export const { searchFor, getDetailsOf } = stockSlice.actions
export default stockSlice.reducer;
