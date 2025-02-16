
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("selectedCity") || "Lahore, Pakistan";
  });
 
  const [tempUnit, setTempUnit] = useState("C");

  const API_KEY = "6eab919153694582a3964917251202";

  // const fetchWeather = async (location) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const res = await axios.get(
  //       `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`
  //     );
  //     setWeather(res.data);
  //     setForecast(res.data.forecast.forecastday);
  //     setSelectedCity(location);
  //     localStorage.setItem("selectedCity", location);
  //   } catch (err) {
  //     setError("Failed to fetch weather");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchWeather = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=yes`
      );
      setWeather(res.data);
      setForecast(res.data.forecast.forecastday);
      setSelectedCity(location);
      localStorage.setItem("selectedCity", location);
    } catch (err) {
      setError("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };
  

  const searchCities = async (query) => {
    if (!query) return setSearchResults([]);
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error("Error fetching search results");
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        loading,
        error,
        fetchWeather,
        searchResults,
        searchCities,
        selectedCity,
        tempUnit,  
        setTempUnit,   
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
