import React, { FC } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { animateDetails } from '../../store/util';
type Props = {
  size: number;
  withText: boolean;
};

const LoadingElement: FC<Props> = ({ size, withText }) => {
  return (
    <motion.div
      initial={animateDetails.initial}
      animate={animateDetails.animate}
      exit={animateDetails.exit}
      className="graph-container"
    >
      <div className="flex-c-c loading-wrapper">
        <div style={{ width: size + 'rem', height: size + 'rem' }}>
          <AiOutlineLoading3Quarters className="loading__element" />
        </div>
        {withText && <strong className="loading__text">Loading...</strong>}
      </div>
    </motion.div>
  );
};

export default LoadingElement;
