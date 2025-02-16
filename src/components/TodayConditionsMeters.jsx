import React from "react";
import { FaTint, FaSun, FaEye, FaWind, FaSmog, FaArrowUp, FaArrowDown } from "react-icons/fa";
import GaugeChart from "react-gauge-chart";

const TodayConditionsMeters = ({ weather }) => {
  const sunrise = weather.forecast.forecastday[0].astro.sunrise;
  const sunset = weather.forecast.forecastday[0].astro.sunset;
  const airQuality = weather.current.air_quality?.pm2_5;
  const airQualityMsg = airQuality ? (airQuality > 100 ? "Poor Air" : "Good Air") : "No Data";
  const visibility = weather.current.vis_km ?? 0;
  const visibilityColor = visibility > 10 ? "text-green-500" : visibility > 5 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center p-4">
      <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center w-full">
        <FaWind className="text-sky-500 text-3xl" />
        <h4 className="text-md font-semibold mt-2">Wind Speed</h4>
        <p className="text-2xl font-bold">{weather.current.wind_kph} km/h</p>
        <GaugeChart
          id="wind-gauge"
          percent={weather.current.wind_kph / 100}
          colors={["#A6D8FF", "#66B2FF", "#3399FF", "#0073E6", "#0059B3"]}
          arcWidth={0.3}
          textColor="#000"
          needleColor="#0073E6"
          needleBaseColor="#0073E6"
          style={{ width: "140px" }}
        />
      </div>

      <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center w-full">
        <FaSun className="text-yellow-500 text-3xl" />
        <h4 className="text-md font-semibold mt-2">UV Index</h4>
        <p className="text-2xl font-bold">{weather.current.uv}</p>
        <GaugeChart
          id="uv-gauge"
          percent={weather.current.uv / 10}
          colors={["#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C"]}
          arcWidth={0.3}
          textColor="#000"
          needleColor="#FFA500"
          needleBaseColor="#FFA500"
          style={{ width: "140px" }}
        />
      </div>

      <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center w-full">
        <h4 className="text-md font-semibold mt-2">Sunset & Sunrise</h4>
        <div className="flex space-x-6 mt-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-yellow-300 rounded-full shadow-lg">
              <FaArrowUp className="text-white text-xl" />
            </div>
            <p className="text-lg font-bold mt-2">{sunrise}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-orange-500 rounded-full shadow-lg">
              <FaArrowDown className="text-white text-xl" />
            </div>
            <p className="text-lg font-bold mt-2">{sunset}</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center w-full">
        <FaTint className="text-blue-500 text-3xl" />
        <h4 className="text-md font-semibold mt-2">Humidity</h4>
        <p className="text-2xl font-bold">{weather.current.humidity}%</p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center w-full">
        <FaEye className={`${visibilityColor} text-3xl`} />
        <h4 className="text-md font-semibold mt-2">Visibility</h4>
        <p className={`text-2xl font-bold ${visibilityColor}`}>{visibility > 0 ? `${visibility} km` : "No Data"}</p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center w-full">
        <FaSmog className="text-red-500 text-3xl" />
        <h4 className="text-md font-semibold mt-2">Air Quality</h4>
        <p className="text-2xl font-bold">{airQualityMsg}</p>
      </div>
    </div>
  );
};

export default TodayConditionsMeters;
