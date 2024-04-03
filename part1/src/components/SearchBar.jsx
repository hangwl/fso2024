import React from "react";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      Search: <input value={searchTerm} onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;
