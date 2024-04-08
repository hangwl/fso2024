import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import countryService from "./services/countryService";
import getWeatherData from "./services/weatherService";

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
      const weatherData = await getWeatherData(
        countryDetails.capitalInfo.latlng[0],
        countryDetails.capitalInfo.latlng[1]
      );
      setSelectedCountry((prev) => ({
        ...prev,
        weather: weatherData.weather[0].description, // Assuming you want to display weather description
        temperature: weatherData.main.temp, // Temperature in Kelvin
      }));
    } catch (error) {
      console.error("Error fetching country details:", error);
      setSelectedCountry(null);
    }
  };

  const handleShowClick = async (countryName) => {
    try {
      const countryData = await countryService.getCountryByName(countryName);
      setSelectedCountry(countryData);
      const weatherData = await getWeatherData(
        countryData.capitalInfo.latlng[0],
        countryData.capitalInfo.latlng[1]
      );
      setSelectedCountry((prev) => ({
        ...prev,
        weather: weatherData.weather[0].description, // Assuming you want to display weather description
        temperature: weatherData.main.temp, // Temperature in Kelvin
      }));
    } catch (error) {
      console.error("Error fetching country data:", error);
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
          <p>Latitude: {selectedCountry.capitalInfo.latlng[0]}</p>
          <p>Longitude: {selectedCountry.capitalInfo.latlng[1]}</p>
          {selectedCountry.weather && <p>Weather: {selectedCountry.weather}</p>}
          {selectedCountry.temperature && <p>Temperature: {selectedCountry.temperature} K</p>}
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
          {filteredCountryNames.length <= 10 ? (
            <ul className="country-list">
              {filteredCountryNames.map((name, index) => (
                <li key={index}>
                  {name}
                  <button onClick={() => handleShowClick(name)}>Show</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Too many matches, specify another filter</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
