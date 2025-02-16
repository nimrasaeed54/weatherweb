import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const WeeklyForecast = () => {
  const { forecast, tempUnit } = useContext(WeatherContext);
  if (!forecast) return <p>No forecast available.</p>;

  return (
    <div className="overflow-x-auto whitespace-nowrap hide-scrollbar">
      <div className="flex p-4 gap-2">
        {forecast.map((day) => {
          const dayName = new Date(day.date).toLocaleDateString("en-US", {
            weekday: "long",
          });

          const tempSymbol = tempUnit === "C" ? "°C" : "°F";
          const avgTemp =
            tempUnit === "C"
              ? Math.round(day.day.avgtemp_c)
              : Math.round(day.day.avgtemp_f);
          const maxTemp =
            tempUnit === "C"
              ? Math.round(day.day.maxtemp_c)
              : Math.round(day.day.maxtemp_f);
          const minTemp =
            tempUnit === "C"
              ? Math.round(day.day.mintemp_c)
              : Math.round(day.day.mintemp_f);

          return (
            <div
              key={day.date}
              className="min-w-[120px] border border-[#C96E6D] shadow-md rounded-3xl flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-md font-bold">{dayName}</h3>
              <p className="text-sm">{day.date}</p>
              <div className="flex flex-col items-center">
                <img
                  src={day.day.condition.icon}
                  alt="Weather icon"
                  className="w-12 h-12"
                />
                <span className="text-2xl font-bold">
                  {avgTemp}
                  {tempSymbol}
                </span>
              </div>
              <p className="text-center mt-2">{day.day.condition.text}</p>
              <p className="text-sm text-gray-600">
                {maxTemp}
                {tempSymbol} / {minTemp}
                {tempSymbol}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;
