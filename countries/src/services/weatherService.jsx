import axios from "axios";

const getWeatherData = async (lat, lon) => {
    const API_KEY = import.meta.env.VITE_SOME_KEY
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
};

export default getWeatherData;
