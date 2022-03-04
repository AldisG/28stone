import { FC } from 'react';
import { motion } from 'framer-motion';
import { animateDetails } from '../../store/util';
type Props = {
  isError: boolean;
};

const ErrorFetchingData: FC<Props> = ({ isError }) => {
  return (
    <motion.div
      initial={animateDetails.initial}
      animate={animateDetails.animate}
      exit={animateDetails.exit}
      className="graph-container"
    >
      <div className="error-wrapper">
        <h1>No data to show...</h1>
        {isError && (
          <div className="error-message">
            Either you have reached API call limit(https://www.alphavantage.co)
            or the data are not available.
            <br />
            <b>Either way, you can try later!</b>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorFetchingData;
