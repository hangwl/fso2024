import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

const countryService = {
  getAllCountryNames: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all`);
      return response.data.map((country) => String(country.name.common));
    } catch (error) {
      console.error("Error fetching country names:", error);
      throw new Error("Failed to fetch country names");
    }
  },

  getCountryByName: async (name) => {
    try {
      const response = await axios.get(`${BASE_URL}/name/${name}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching country by name:", error);
      throw new Error("Failed to fetch country");
    }
  },
};

export default countryService;
