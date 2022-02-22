import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/redux/hooks';
import { useGetSearchedStockQuery } from '../../store/services/storeApiCalls';
import { SearchApisType } from '../../store/types';
import SearchedItem from './SearchedItem';
import './SearchResults.scss';

const SearchResults = () => {
  const [apiData, setapiData] = useState<SearchApisType[] | []>([]);
  const stockNameToSearch = useAppSelector(
    (state) => state.stockSlice.searchStockName
  );

  const { data, isLoading, isError, isSuccess } =
    useGetSearchedStockQuery('acc');

  const dataRecieved = apiData.length > 1;

  useEffect(() => {
    if (data && isSuccess) {
      setapiData(data.bestMatches);
    }
    console.log(stockNameToSearch);
  }, [stockNameToSearch && isSuccess]);

  const handleClickItem = (stockName: string) => {
    console.log('1');
  };

  return (
    <div className="search-res">
      {dataRecieved &&
        apiData.map(
          ({
            '1. symbol': symbol,
            '2. name': name,
            '3. type': type,
            '8. currency': currency,
          }) => (
            <SearchedItem
              key={name}
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
