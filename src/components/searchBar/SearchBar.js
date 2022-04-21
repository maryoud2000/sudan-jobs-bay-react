import "./SearchBar.css";
import { useState } from "react";

const SearchBar = ({ filterOrigin, setFilterOrigin }) => {
  const [searchText, setSearchText] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchText) {
      setFilterOrigin({ origin: "searchBar", value: searchText });
      setSearchText("");
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          className="search-input"
          type="text"
          placeholder="Job title..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        ></input>
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </>
  );
};

export default SearchBar;