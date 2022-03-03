import React, { FC } from 'react';

type Props = {
  dailyDataOf: string;
  apiResultLength: number;
};

const StockDetailsHeader: FC<Props> = ({ dailyDataOf, apiResultLength }) => {
  return (
    <div className="header-wrapper">
      <h1 className="stock-header">
        <span className="span--bolder-text">{dailyDataOf + ' ' || ''}</span>
        Stock prices per month in dollars
      </h1>
      Results currently displayed:
      <b>{' ' + apiResultLength}</b>
    </div>
  );
};

export default StockDetailsHeader;
