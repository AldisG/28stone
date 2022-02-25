import React, { FC, useEffect, useState } from 'react';
import { Chart } from 'react-charts';
import { useAppSelector } from '../../store/redux/hooks';
import { useGetDailyDataQuery } from '../../store/services/storeApiCalls';
import { searchFor } from '../../store/slices/stockSlice';

type DailyStars = {
  date: string | number;
  stars: number;
};

type Series = {
  label: string;
  data: DailyStars[];
};

// --------------------------------func
const StockDetails: FC = () => {
  const [searchData, setSearchData] = useState<DailyStars[]>([]);
  const dailyDataOf = useAppSelector(
    ({ stockSlice }) => stockSlice.getMoreDetailsOfStock
  );
  const { data } = useGetDailyDataQuery(dailyDataOf || 'acc');

  useEffect(() => {
    if (data) {
      const dataArray = Object.values(data['Monthly Time Series']).slice(0, 20);
      const correctData = dataArray.map((item: any, i: number) => {
        return { date: i, stars: Number(Number(item['1. open']).toFixed(2)) };
      }) as any;
      setSearchData(correctData);
    }
  }, [data]);

  const dummyData: Series[] = [
    {
      label: 'Stock prices',
      data: searchData,
    },
    {
      label: 'Stock prices 2',
      data: searchData,
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
    <div
      style={{
        minWidth: '300px',
        maxWidth: '500px',
        width: '100%',
        height: '300px',
      }}
    >
      {searchData.length > 0 && (
        <Chart
          options={{
            data: dummyData,
            primaryAxis,
            secondaryAxes,
          }}
        />
      )}
    </div>
  );
};

export default StockDetails;
