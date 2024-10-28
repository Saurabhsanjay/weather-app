
import React from "react";

interface ForecastData {
  date: string;
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
}

interface ForecastTableProps {
  forecast: ForecastData[];
}

const ForecastTable: React.FC<ForecastTableProps> = ({ forecast }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Weather
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Date & Time
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Temperature
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Feels Like
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Condition
            </th>
          </tr>
        </thead>
        <tbody>
          {forecast?.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4">
                <img
                  src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                  alt={item.description}
                  className="w-10 h-10"
                />
              </td>
              <td className="py-3 px-4 text-gray-800">{item.date}</td>
              <td className="py-3 px-4 text-gray-800">{item.temp}°C</td>
              <td className="py-3 px-4 text-gray-800">{item.feels_like}°C</td>
              <td className="py-3 px-4 text-gray-800 capitalize">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ForecastTable;
