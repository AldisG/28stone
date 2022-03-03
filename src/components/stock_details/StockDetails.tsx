import React, { useEffect, useState } from 'react';
import { Chart } from 'react-charts';
import { useAppSelector } from '../../store/redux/hooks';
import { useGetDailyDataQuery } from '../../store/services/storeApiCalls';
import { convertDataToCorrectNum } from '../../store/util';
import { DailyStars, Series } from '../../store/types';
import ErrorFetchingData from '../elements/ErrorFetchingData';
import RangeSlider from '../elements/RangeSlider';
import StockDetailsHeader from './StockDetailsHeader';
import ChartTags from './ChartTags';

import './StockDetails.scss';
import LoadingElement from '../elements/LoadingElement';

const StockDetails = () => {
  const [searchDataOpen, setSearchDataOpen] = useState<DailyStars[]>([]);
  const [searchDataClose, setSearchDataClose] = useState<DailyStars[]>([]);
  const [searchDataHigh, setSearchDataHigh] = useState<DailyStars[]>([]);
  const [searchDataLow, setSearchDataLow] = useState<DailyStars[]>([]);

  const [apiResultLength, setapiResultLength] = useState<number>(20);
  const [failedToGetData, setfailedToGetData] = useState(false);
  const [initialLoadState, setInitialLoadState] = useState(true);

  const [fetchingDetailsFromApi, setfetchingDetailsFromApi] = useState(false);
  const dailyDataOf = useAppSelector(
    ({ stockSlice }) => stockSlice.getMoreDetailsOfStock
  );
  const { data, isError } = useGetDailyDataQuery(dailyDataOf);
  const safeToShowChart =
    searchDataOpen.length > 0 && dailyDataOf && !fetchingDetailsFromApi;
  const showErrorInfo =
    !fetchingDetailsFromApi && failedToGetData && !initialLoadState;
  useEffect(() => {
    if (!data || isError || data['Note']) {
      setfailedToGetData(true);
      setfetchingDetailsFromApi(false);
    }
  }, [data, dailyDataOf]);

  useEffect(() => {
    console.log('loading started');
    if (data) {
      setfetchingDetailsFromApi(true);
    }
  }, [dailyDataOf]);

  useEffect(() => {
    setfetchingDetailsFromApi(false);

    if (data) {
      if (data['Monthly Time Series']) {
        const dataArray = Object.values(data['Monthly Time Series']).slice(
          0,
          apiResultLength
        ) as string[];

        setSearchDataOpen(convertDataToCorrectNum(dataArray, '1. open') || []);
        setSearchDataHigh(convertDataToCorrectNum(dataArray, '2. high') || []);
        setSearchDataLow(convertDataToCorrectNum(dataArray, '3. low') || []);
        setSearchDataClose(
          convertDataToCorrectNum(dataArray, '4. close') || []
        );
        setfailedToGetData(false);
        setInitialLoadState(false);
      }
    }
  }, [data, apiResultLength]);

  const stockDataForChart: Series[] = [
    {
      label: 'Open',
      data: searchDataOpen,
    },
    {
      label: 'High',
      data: searchDataHigh,
    },
    {
      label: 'Low',
      data: searchDataLow,
    },
    {
      label: 'Close',
      data: searchDataClose,
    },
  ];

  const primaryAxis = React.useMemo(
    (): any => ({
      getValue: (datum: any) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): any[] => [
      {
        getValue: (datum: any) => datum.stars,
      },
    ],
    []
  );
  return (
    <>
      {fetchingDetailsFromApi && (
        <div className="graph-container">
          <LoadingElement size={2.8} withText={true} />
        </div>
      )}
      {showErrorInfo && (
        <div className="graph-container">
          <ErrorFetchingData isError={failedToGetData} />
        </div>
      )}
      {!isError && !failedToGetData && (
        <div className="graph-container">
          {safeToShowChart && (
            <div className="graph-wrapper">
              <StockDetailsHeader
                dailyDataOf={dailyDataOf}
                apiResultLength={apiResultLength}
              />
              <div className="graph">
                <Chart
                  options={{
                    data: stockDataForChart,
                    primaryAxis,
                    secondaryAxes,
                  }}
                />
              </div>
              <ChartTags stockDataForChart={stockDataForChart} />
              <RangeSlider
                apiResultLength={apiResultLength}
                setapiResultLength={setapiResultLength}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StockDetails;
