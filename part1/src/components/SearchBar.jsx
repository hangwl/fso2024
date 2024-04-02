import React from "react";

export const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      Search: <input value={searchTerm} onChange={handleSearch} />
    </div>
  );
};
