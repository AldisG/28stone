import { FC } from 'react';
type Props = {
  isError: boolean;
};

const ErrorFetchingData: FC<Props> = ({ isError }) => {
  return (
    <div className="error-wrapper">
      <h1>No data to show...</h1>
      {isError && (
        <div className="error-message">
          Either you have reached API call limit(https://www.alphavantage.co) or
          the data are not available.
          <br />
          <b>Either way, you can try later!</b>
        </div>
      )}
    </div>
  );
};

export default ErrorFetchingData;
