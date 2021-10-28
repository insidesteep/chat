import "./Search.styles.scss";
import searchIcon from "../../assets/img/search-icon.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../store/user/user.thunk";
import { SearchList } from ".";

const Search = () => {
  const [searchValue, setSearchValue] = useState([]);
  const { searchResult } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const clear = () => setSearchValue("");
  const handleSearch = (e) => setSearchValue(e.target.value);

  useEffect(() => {
    setTimeout(() => {
      dispatch(search(searchValue));
    }, 500);
  }, [searchValue]);

  return (
    <div className="search">
      <form className="search__form">
        <input
          className="search__input"
          placeholder="Global Search"
          value={searchValue}
          onChange={handleSearch}
        />
        <img className="search__icon" src={searchIcon} />
        <button type="button" className="search__close" onClick={clear}>
          +
        </button>
      </form>
      <div className="search__result">
        {searchResult.length ? (
          <SearchList users={searchResult} />
        ) : (
          <div className="search__empty">
            <h3>Empty</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
