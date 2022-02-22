import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import stockSlice from '../slices/stockSlice';
import stocksApi from '../services/storeApiCalls';

const store = configureStore({
  reducer: {
    [stocksApi.reducerPath]: stocksApi.reducer,
    stockSlice: stockSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stocksApi.middleware)
});
setupListeners(store.dispatch)

export default store;
export type RootState = ReturnType<typeof store.getState>
export type ApiDispatch = typeof store.dispatch
