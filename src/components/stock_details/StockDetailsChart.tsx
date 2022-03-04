import React, { FC } from 'react';
import { Chart } from 'react-charts';
import RangeSlider from '../elements/RangeSlider';
import ChartTags from './ChartTags';
import StockDetailsHeader from './StockDetailsHeader';
import { Series } from '../../store/types';
type Props = {
  dailyDataOf: string;
  apiResultLength: number;
  stockDataForChart: Series[];
  setapiResultLength: (value: number) => void;
  primaryAxis: any;
  secondaryAxes: any[];
};

const StockDetailsChart: FC<Props> = ({
  dailyDataOf,
  apiResultLength,
  stockDataForChart,
  setapiResultLength,
  primaryAxis,
  secondaryAxes,
}) => {
  return (
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
  );
};

export default StockDetailsChart;
