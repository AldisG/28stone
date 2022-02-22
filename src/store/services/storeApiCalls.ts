import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// full api example -> https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=coc&apikey=03D5ECWZDFY4FLM
const apiKey = '&apikey=03D5ECWZDFY4FLM'

const apiFunctions = {
  search: '/query?function=SYMBOL_SEARCH&keywords=',
  timeSeries: '/query?function=GLOBAL_QUOTE&symbol='
}

export const stocksApi = createApi({
  reducerPath: 'stocksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.alphavantage.co'
  }),
  endpoints: (builder) => ({
    getSearchedStock: builder.query({
      query: (searchFor: string) => apiFunctions.search + searchFor + apiKey
    }),
    getDailyData: builder.query({
      query: (searchFor: string) => apiFunctions.timeSeries + searchFor + apiKey
    }),
  })
})

export const { reducer } = stocksApi
export const { useGetSearchedStockQuery, useGetDailyDataQuery } = stocksApi
export default stocksApi