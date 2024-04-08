import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import countryService from "./services/countryService";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountryNames, setFilteredCountryNames] = useState([]);

  useEffect(() => {
    const fetchCountryNames = async () => {
      try {
        const names = await countryService.getAllCountryNames();
        setCountryNames(names);
      } catch (error) {
        console.error("Error fetching country names:", error);
      }
    };

    fetchCountryNames();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      if (searchTerm.trim() !== "") {
        const filteredNames = countryNames.filter((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountryNames(filteredNames);
        if (filteredNames.length === 1) {
          fetchCountryDetails(filteredNames[0]);
        } else {
          setSelectedCountry(null);
        }
      } else {
        setFilteredCountryNames(countryNames);
        setSelectedCountry(null);
      }
    };

    handleSearch();
  }, [searchTerm, countryNames]);

  const fetchCountryDetails = async (name) => {
    try {
      const countryDetails = await countryService.getCountryByName(name);
      setSelectedCountry(countryDetails);
    } catch (error) {
      console.error("Error fetching country details:", error);
      setSelectedCountry(null);
    }
  };

  return (
    <div>
      <h1>Countries</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {selectedCountry ? (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital[0]}</p>
          <p>Area: {selectedCountry.area}</p>
          <p>
            <b>Languages</b>
          </p>
          <ul>
            {Object.entries(selectedCountry.languages).map(
              ([code, language]) => (
                <li key={code}>{language}</li>
              )
            )}
          </ul>
          <div>
            <h3>Flag:</h3>
            {selectedCountry.flags.png ? (
              <img
                src={selectedCountry.flags.png}
                alt={selectedCountry.flags.alt}
              />
            ) : (
              selectedCountry.flags.svg && (
                <img
                  src={selectedCountry.flags.svg}
                  alt={selectedCountry.flags.alt}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>Filtered Countries</h2>
          <ul>
            {filteredCountryNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
