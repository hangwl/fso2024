const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      Search: <input value={searchTerm} onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
