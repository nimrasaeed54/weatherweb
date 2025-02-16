
import { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

const TodayForecast = () => {
    const { weather, forecast, tempUnit } = useContext(WeatherContext);
    if (!forecast || !weather) return <p>No forecast available.</p>;

    const today = forecast[0];
    const dayName = new Date(today.date).toLocaleDateString("en-US", {
        weekday: "long",
    });
    const hourlyData = today.hour;
    const itemsPerPage = 4;
    const currentTime = new Date();
    let currentHourIndex = hourlyData.findIndex(
        (hour) => new Date(hour.time) >= currentTime
    );

    if (currentHourIndex === -1) {
        currentHourIndex = 0;
    }

    const [startIndex, setStartIndex] = useState(currentHourIndex);
    const currentItems = hourlyData.slice(startIndex, startIndex + itemsPerPage);

    const handleNext = () => {
        if (startIndex + itemsPerPage < hourlyData.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handleBack = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div className="flex flex-col items-center px-4">
            <h3 className="text-lg font-bold mb-4">
                {dayName}, {today.date}
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-2 md:space-y-0 md:space-x-2">
                <button
                    onClick={handleBack}
                    disabled={startIndex === 0}
                    className="bg-[#C96E6D] text-white px-4 py-2 rounded hover:bg-[#b55b5c] disabled:opacity-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentItems.map((hour, index) => {
                        const time = new Date(hour.time).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                        });
                        const displayTemp =
                            tempUnit === "C"
                         
                                ? `${Math.round(hour.temp_c)}°C`
                                : `${Math.round(hour.temp_f)}°F`
                        return (
                            <div
                                key={index}
                                className="px-2 md:px-9 py-4 border border-[#C96E6D] shadow-md rounded-3xl hover:scale-105 transition-transform duration-300 flex flex-col items-center"
                            >
                                <span className="text-md font-semibold">{time}</span>
                                <img
                                    src={hour.condition.icon}
                                    alt="Weather icon"
                                    className="w-14 h-14"
                                />
                                <span className="text-xl font-bold">{displayTemp}</span>
                                <p className="text-sm">{hour.condition.text}</p>
                            </div>
                        );
                    })}
                </div>
                <button
                    onClick={handleNext}
                    disabled={startIndex + itemsPerPage >= hourlyData.length}
                    className="bg-[#C96E6D] text-white px-4 py-2 rounded hover:bg-[#b55b5c] disabled:opacity-50"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TodayForecast;
