import { FC } from 'react';

type Props = {
  handleClickItem: (stockName: string) => void;
  stockName: string;
  symbol: string;
  currency: string;
  type: string;
};

const SearchedItem: FC<Props> = ({
  handleClickItem,
  stockName,
  symbol,
  currency,
  type,
}) => {
  return (
    <div className="search-res__item" onClick={() => handleClickItem(symbol)}>
      <div className="search-res__head">
        <span className="search-res__header">{symbol}</span>
        <span className="search-res__full-name">{stockName}</span>
      </div>
      <div className="search-res__type">{type}</div>
      <div className="search-res__currency">{currency}</div>
    </div>
  );
};

export default SearchedItem;
