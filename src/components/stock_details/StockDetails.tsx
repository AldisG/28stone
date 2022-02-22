import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/redux/hooks';
import { useGetDailyDataQuery } from '../../store/services/storeApiCalls';
import './StockDetails';
import { ExtraDetailsType } from '../../store/types';

const StockDetails = () => {
  const selectedStock = useAppSelector(
    ({ stockSlice }) => stockSlice.getMoreDetailsOfStock
  );
  const [stockDetails, setStockDetails] = useState<
    ExtraDetailsType | undefined
  >();
  const { data, isError, isLoading } = useGetDailyDataQuery(selectedStock);
  useEffect(() => {
    if (data) {
      const { 'Global Quote': globalData } = data;
      setStockDetails(globalData);
    }
  }, [selectedStock]);
  return (
    <div>
      <h3>{selectedStock && stockDetails && stockDetails['02. open']}</h3>
      one step delay...
    </div>
  );
};

export default StockDetails;
