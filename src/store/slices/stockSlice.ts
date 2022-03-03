import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchStockName: '',
  getMoreDetailsOfStock: '',
  gotDataFromApiSearch: false,
  gotDataFromApiSuggestions: false,
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
    },
    checkApiDataSuggestions: (state, {payload}) =>{
      state.gotDataFromApiSuggestions = payload
    }
  },
});

export const { searchFor, getDetailsOf, checkApiDataStatus, checkApiDataSuggestions } = stockSlice.actions
export default stockSlice.reducer;
