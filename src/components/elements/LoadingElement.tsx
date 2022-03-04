import React, { FC } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
type Props = {
  size: number;
  withText: boolean;
};

const LoadingElement: FC<Props> = ({ size, withText }) => {
  return (
    <div className="graph-container">
      <div className="flex-c-c loading-wrapper">
        <div style={{ width: size + 'rem', height: size + 'rem' }}>
          <AiOutlineLoading3Quarters className="loading__element" />
        </div>
        {withText && <strong className="loading__text">Loading...</strong>}
      </div>
    </div>
  );
};

export default LoadingElement;
