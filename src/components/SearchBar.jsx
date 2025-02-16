
import { useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const SearchBar = () => {
  const { fetchWeather, searchCities, searchResults } = useContext(WeatherContext);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

  
    if (value.length >= 1) {
      await searchCities(value);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSelectCity = (city) => {
    fetchWeather(city.name);
    setQuery("");
    setShowResults(false);
  };

  const handleSearchButton = () => {
    if (query.trim() !== "") {
      fetchWeather(query);
      setShowResults(false);
    }
  };

  return (
    <div className="relative w-full max-w-md text-black z-50">
      <div className="flex">
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={handleSearch}
          className="flex-1 p-2 border border-r-0 rounded-l"
        />
        <button
          onClick={handleSearchButton}
          className="p-2 bg-[#C96E6D] text-white border border-l-0 rounded-r"
        >
          Search
        </button>
      </div>
      {showResults && searchResults.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md mt-1 z-10">
          {searchResults.map((city) => (
            <li
              key={city.id}
              onClick={() => handleSelectCity(city)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;