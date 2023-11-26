import {
  HeaderSearch,
  SearchForm,
  SearchBtn,
  SearchBtnLabel,
  SearchFormInput,
} from './SearchBar.styled.js';

export const Searchbar = ({ onSubmit }) => {
  return (
    <HeaderSearch>
      <SearchForm onSubmit={onSubmit}>
        <SearchBtn type="submit">
          <SearchBtnLabel>Search</SearchBtnLabel>
        </SearchBtn>

        <SearchFormInput
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </HeaderSearch>
  );
};