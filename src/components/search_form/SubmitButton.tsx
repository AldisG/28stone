import React, { FC } from 'react';
import searchIcn from '../../img/search.svg';
import LoadingElement from '../elements/LoadingElement';

type Props = {
  stillGettingData: boolean;
};

const SubmitButton: FC<Props> = ({ stillGettingData }) => {
  return (
    <button className="flex-c-c search-btn" disabled={stillGettingData}>
      {stillGettingData ? (
        <LoadingElement size={1.2} withText={false} />
      ) : (
        <img className="search-btn__icon" src={searchIcn} />
      )}
    </button>
  );
};

export default SubmitButton;
