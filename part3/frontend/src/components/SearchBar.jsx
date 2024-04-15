import React from "react";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        name="search"
      />
    </div>
  );
};

export default SearchBar;
