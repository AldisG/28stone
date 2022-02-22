import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import { useGetSearchedStockQuery } from '../../store/services/storeApiCalls';
import { SearchApisType } from '../../store/types';
import SearchedItem from './SearchedItem';
import './SearchResults.scss';
import { v4 as uuidv4 } from 'uuid';
import { getDetailsOf } from '../../store/slices/stockSlice';

const SearchResults = () => {
  const [apiData, setapiData] = useState<SearchApisType[] | []>([]);
  const stockNameToSearch = useAppSelector(
    (state) => state.stockSlice.searchStockName
  );
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, isSuccess } =
    useGetSearchedStockQuery(stockNameToSearch) || undefined;

  const dataRecieved = apiData?.length > 1;

  useEffect(() => {
    if (!data || isError) {
      console.log('no data');
    }
  }, [data]);

  useEffect(() => {
    if (data && isSuccess) {
      setapiData(data.bestMatches);
    }
  }, [stockNameToSearch, data]);

  const handleClickItem = (stockName: string): void => {
    if (stockName) {
      dispatch(getDetailsOf(stockName));
    }
  };

  return (
    <div className="search-res">
      {isLoading && <h1>Loading...</h1>}
      {dataRecieved &&
        apiData.map(
          ({
            '1. symbol': symbol,
            '2. name': name,
            '3. type': type,
            '8. currency': currency,
          }) => (
            <SearchedItem
              key={uuidv4()}
              handleClickItem={handleClickItem}
              stockName={name}
              symbol={symbol}
              currency={currency}
              type={type}
            />
          )
        )}
    </div>
  );
};

export default SearchResults;
