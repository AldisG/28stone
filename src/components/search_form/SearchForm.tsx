import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import {
  checkApiDataStatus,
  checkApiDataSuggestions,
  searchFor as searchForSlice,
} from '../../store/slices/stockSlice';
import './SearchForm.scss';
import SubmitButton from './SubmitButton';

const SearchForm = () => {
  const [searchFor, setSearchFor] = useState<string>('');
  const dispatch = useAppDispatch();

  const currentSearch = useAppSelector(
    (state) => state.stockSlice.searchStockName
  );

  const stillGettingData = useAppSelector(
    ({ stockSlice }) => stockSlice.gotDataFromApiSearch
  );

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchFor && searchFor !== currentSearch) {
      dispatch(searchForSlice(searchFor));
      dispatch(checkApiDataStatus(true));
      dispatch(checkApiDataSuggestions(true));
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        data-testid="search-input"
        className="search-form__input"
        type="text"
        placeholder="Search..."
        value={searchFor}
        onInput={(e: FormEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement;
          setSearchFor(target.value);
        }}
        autoFocus={true}
      />
      <SubmitButton stillGettingData={stillGettingData} />
    </form>
  );
};

export default SearchForm;
