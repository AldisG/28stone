import { FormEvent, useState } from 'react';
import searchIcn from '../../img/search.svg';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import { searchFor as searchForSlice } from '../../store/slices/stockSlice';
import './SearchForm.scss';

const SearchForm = () => {
  const [searchFor, setSearchFor] = useState<string>('');
  const dispatch = useAppDispatch();
  const currentSearch = useAppSelector(
    (state) => state.stockSlice.searchStockName
  );
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchFor && searchFor !== currentSearch) {
      dispatch(searchForSlice(searchFor));
    }
  };
  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
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
      <button className="flex-c-c search-btn">
        <img className="search-btn__icon" src={searchIcn} />
      </button>
    </form>
  );
};

export default SearchForm;
