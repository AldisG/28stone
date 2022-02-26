import React, { FC, useEffect, useState } from 'react';
import { Chart } from 'react-charts';
import { useAppSelector } from '../../store/redux/hooks';
import { useGetDailyDataQuery } from '../../store/services/storeApiCalls';
import { searchFor } from '../../store/slices/stockSlice';
import { convertDataToCorrectNum } from '../../store/util';
import { DailyStars, Series } from '../../store/types';

// --------------------------------func
const StockDetails: FC = () => {
  const [searchDataOpen, setSearchDataOpen] = useState<DailyStars[]>([]);
  const [searchDataClose, setSearchDataClose] = useState<DailyStars[]>([]);
  const [searchDataHigh, setSearchDataHigh] = useState<DailyStars[]>([]);
  const [searchDataLow, setSearchDataLow] = useState<DailyStars[]>([]);
  const [datesData, setDatesData] = useState<string[]>([]);
  const [apiResultLength, setapiResultLength] = useState<number>(20);
  const dailyDataOf = useAppSelector(
    ({ stockSlice }) => stockSlice.getMoreDetailsOfStock
  );
  const { data } = useGetDailyDataQuery(dailyDataOf || 'acc');

  useEffect(() => {
    console.log(data);
    if (data) {
      const dataArray = Object.values(data['Monthly Time Series']).slice(
        0,
        apiResultLength
      ) as string[];
      const dataDates = Object.keys(data['Monthly Time Series']).slice(
        0,
        apiResultLength
      ) as string[];

      setSearchDataOpen(
        convertDataToCorrectNum(dataArray, '1. open', datesData) || []
      );
      setSearchDataHigh(
        convertDataToCorrectNum(dataArray, '2. high', datesData) || []
      );
      setSearchDataLow(
        convertDataToCorrectNum(dataArray, '3. low', datesData) || []
      );
      setSearchDataClose(
        convertDataToCorrectNum(dataArray, '4. close', datesData) || []
      );
      setDatesData(dataDates || []);
    }
  }, [data, apiResultLength]);

  const stockDataForChart: Series[] = [
    {
      label: 'Stock prices - Open',
      data: searchDataOpen || [],
    },
    {
      label: 'Stock prices - High',
      data: searchDataHigh || [],
    },
    {
      label: 'Stock prices - Low',
      data: searchDataLow || [],
    },
    {
      label: 'Stock prices - Close',
      data: searchDataClose || [],
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
      <div
        style={{
          minWidth: '300px',
          maxWidth: '500px',
          width: '100%',
          height: '300px',
        }}
      >
        {searchDataOpen.length > 0 && (
          <Chart
            options={{
              data: stockDataForChart,
              primaryAxis,
              secondaryAxes,
            }}
          />
        )}
      </div>
      <div>
        <label>
          {apiResultLength}
          <input
            type="range"
            name=""
            id=""
            min={10}
            step={10}
            max={200}
            value={apiResultLength}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setapiResultLength(Number(target.value));
            }}
          />
        </label>
      </div>
    </>
  );
};

export default StockDetails;
