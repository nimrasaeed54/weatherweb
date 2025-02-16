
import { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import SearchBar from "./SearchBar";
import TodayForecast from "./TodayForecast";
import WeeklyForecast from "./WeeklyForecast";
import TodayConditionsMeters from "./TodayConditionsMeters";
const WeatherDetails = () => {
  const { weather, tempUnit, setTempUnit } = useContext(WeatherContext);
  const [activeTab, setActiveTab] = useState("today");

  if (!weather) return <p>Loading...</p>;

  const tempC = Math.round(weather.current.temp_c);
  const tempF = Math.round((weather.current.temp_c * 9) / 5 + 32);
  const feelsLikeC = Math.round(weather.current.feelslike_c);
  const feelsLikeF = Math.round((weather.current.feelslike_c * 9) / 5 + 32);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
 
    <div className="w-full md:w-[25%] h-auto md:h-screen flex flex-col md:sticky top-0">
      <div className="flex-1 relative flex flex-col items-center justify-center text-white rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-[#C96E6D] to-pink-500">
        <div className="absolute top-0 left-0 right-0 p-2 z-20">
          <SearchBar />
        </div>
        <div className="relative z-10 text-center sm:p-10 lg:p-0 p-10 rounded-xl">
          <img
            src={weather.current.condition.icon}
            alt="Weather icon"
            className="inline-block mt-4 w-20 h-20"
          />
          <h2 className="text-5xl font-extrabold uppercase tracking-wide">
            {weather.location.name}
          </h2>
          <p className="text-3xl mt-4 font-semibold">
            {tempUnit === "C" ? `${tempC}°C` : `${tempF}°F`}
          </p>
          <p className="text-xl mt-2 italic text-white/80">
            {weather.current.condition.text}
          </p>
          <p className="text-md mt-2 text-white/80 italic">
            Feels like {tempUnit === "C" ? `${feelsLikeC}°C` : `${feelsLikeF}°F`}
          </p>
        </div>
      </div>
    </div>
    
      <div className="w-full md:w-[75%] p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex gap-4 mb-4 md:mb-0">
            <button
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
                activeTab === "today"
                  ? "bg-[#C96E6D] text-white shadow-lg"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab("today")}
            >
              Today
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
                activeTab === "weekly"
                  ? "bg-[#C96E6D] text-white shadow-lg"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setActiveTab("weekly")}
            >
              Weekly
            </button>
          </div>
          <div className="flex gap-4">
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-300 ${
                tempUnit === "C"
                  ? "bg-[#C96E6D] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setTempUnit("C")}
            >
              C
            </button>
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-300 ${
                tempUnit === "F"
                  ? "bg-[#C96E6D] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setTempUnit("F")}
            >
              F
            </button>
          </div>
        </div>
        <div className="mb-6">
          {activeTab === "today" ? (
            <TodayForecast tempUnit={tempUnit} />
          ) : (
            <WeeklyForecast tempUnit={tempUnit} />
          )}
        </div>
        <TodayConditionsMeters
          weather={weather}
          tempUnit={tempUnit}
          feelsLikeC={feelsLikeC}
          feelsLikeF={feelsLikeF}
        />
      </div>
    </div>
  );
};

export default WeatherDetails;
