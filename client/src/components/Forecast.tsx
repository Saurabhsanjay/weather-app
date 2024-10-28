import React from "react";

interface ForecastProps {
  forecast: Array<{
    date: string;
    temp: number;
    feels_like: number;
    description: string;
    icon: string;
  }>;
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Forecast</h2>
      {forecast.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b py-2"
        >
          <div>
            <p>{new Date(item.date).toLocaleString()}</p>
            <p>{item.description}</p>
          </div>
          <div className="flex items-center">
            <p className="mr-2">{item.temp}°C</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={item.description}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
