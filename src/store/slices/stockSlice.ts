import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchStockName: '',
  getMoreDetailsOfStock: '',
  gotDataFromApiSearch: false,
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
    checkApiDataStatus: (state, {payload}) =>{
      state.gotDataFromApiSearch = payload
    }
  },
});

export const { searchFor, getDetailsOf, checkApiDataStatus } = stockSlice.actions
export default stockSlice.reducer;
