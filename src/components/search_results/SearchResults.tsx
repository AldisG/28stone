import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import { useGetSearchedStockQuery } from '../../store/services/storeApiCalls';
import { SearchApisType } from '../../store/types';
import { animateSearch } from '../../store/util';
import SearchedItem from './SearchedItem';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import stockSlice, {
  checkApiDataSuggestions,
  checkApiDataStatus,
  getDetailsOf,
} from '../../store/slices/stockSlice';
import './SearchResults.scss';

const SearchResults = () => {
  const [apiData, setapiData] = useState<SearchApisType[] | []>([]);
  const dispatch = useAppDispatch();
  const dataRecieved = apiData?.length > 1;

  const stockNameToSearch = useAppSelector(
    ({ stockSlice }) => stockSlice.searchStockName
  );
  const stillLoadingSuggestions = useAppSelector(
    ({ stockSlice }) => stockSlice.gotDataFromApiSuggestions
  );
  const [dontShowErrorOnFirstLoad, setdontShowErrorOnFirstLoad] = useState(0);
  const { data, isSuccess } =
    useGetSearchedStockQuery(stockNameToSearch) || undefined;

  useEffect(() => {
    if (dataRecieved || !dataRecieved) {
      dispatch(checkApiDataStatus(false));
      dispatch(checkApiDataSuggestions(false));
    }
    setdontShowErrorOnFirstLoad((prev) => prev + 1);
  }, [apiData]);

  useEffect(() => {
    if (data && isSuccess) {
      setapiData(data.bestMatches);
    }
  }, [data]);

  const handleClickItem = (stockName: string): void => {
    if (stockName) {
      dispatch(getDetailsOf(stockName));
    }
  };

  return (
    <motion.div className="search-res">
      {!dataRecieved &&
        dontShowErrorOnFirstLoad > 2 &&
        "Sorry, couldn't find any matches..."}
      {dataRecieved &&
        !stillLoadingSuggestions &&
        apiData.map(
          ({
            '1. symbol': symbol,
            '2. name': name,
            '3. type': type,
            '8. currency': currency,
          }) => {
            return (
              <AnimatePresence exitBeforeEnter key={uuidv4()}>
                <motion.div
                  animate={animateSearch.animate}
                  initial={animateSearch.initial}
                  exit={animateSearch.exit}
                  transition={animateSearch.transition}
                >
                  <SearchedItem
                    handleClickItem={handleClickItem}
                    stockName={name}
                    symbol={symbol}
                    currency={currency}
                    type={type}
                    key={uuidv4()}
                    data-testid="search-res"
                  />
                </motion.div>
              </AnimatePresence>
            );
          }
        )}
    </motion.div>
  );
};

export default SearchResults;
