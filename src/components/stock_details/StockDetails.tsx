import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/redux/hooks';
import { useGetDailyDataQuery } from '../../store/services/storeApiCalls';
import { animateDetails, convertDataToCorrectNum } from '../../store/util';
import { DailyStars, Series } from '../../store/types';
import ErrorFetchingData from '../elements/ErrorFetchingData';
import { AnimatePresence, motion } from 'framer-motion';
import './StockDetails.scss';
import LoadingElement from '../elements/LoadingElement';
import StockDetailsChart from './StockDetailsChart';

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
    if (data) {
      setfetchingDetailsFromApi(true);
    }
  }, [dailyDataOf]);

  useEffect(() => {
    setfetchingDetailsFromApi(false);

    if (data) {
      if (data['Monthly Time Series']) {
        const dataArr = Object.values(data['Monthly Time Series']).slice(
          0,
          apiResultLength
        ) as string[];

        setSearchDataOpen(convertDataToCorrectNum(dataArr, '1. open') || []);
        setSearchDataHigh(convertDataToCorrectNum(dataArr, '2. high') || []);
        setSearchDataLow(convertDataToCorrectNum(dataArr, '3. low') || []);
        setSearchDataClose(convertDataToCorrectNum(dataArr, '4. close') || []);
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
      {fetchingDetailsFromApi && <LoadingElement size={2.8} withText={true} />}

      {showErrorInfo && <ErrorFetchingData isError={failedToGetData} />}

      {!isError && !failedToGetData && !fetchingDetailsFromApi && (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={animateDetails.initial}
            animate={animateDetails.animate}
            exit={animateDetails.exit}
            className="graph-container"
          >
            {safeToShowChart && (
              <StockDetailsChart
                dailyDataOf={dailyDataOf}
                apiResultLength={apiResultLength}
                stockDataForChart={stockDataForChart}
                primaryAxis={primaryAxis}
                secondaryAxes={secondaryAxes}
                setapiResultLength={setapiResultLength}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default StockDetails;
