import React from "react";
import { MapPin, Thermometer, Droplets } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  feels_like: number;
  description: string;
  icon: string;
  date: string;
}

interface WeatherHistoryProps {
  current: WeatherData[];
}

const WeatherHistory: React.FC<WeatherHistoryProps> = ({ current }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Weather History</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {current?.map((weather, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4 flex flex-col items-start "
          >
            {/* Location */}

            <div className="flex items-center space-x-2">
              <MapPin className="text-blue-500 w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {" "}
                  {new Date(Number(weather.date)).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-blue-500 w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{weather.location}</p>
              </div>
            </div>

            {/* Temperature */}
            <div className="flex items-center space-x-2">
              <Thermometer className="text-red-500 w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Temperature</p>
                <p className="font-medium">{weather.temperature}°C</p>
              </div>
            </div>

            {/* Feels Like */}
            <div className="flex items-center space-x-2">
              <Droplets className="text-blue-500 w-5 h-5" />
              <div>
                <p className="text-sm text-gray-500">Feels Like</p>
                <p className="font-medium">{weather.feels_like}°C</p>
              </div>
            </div>

            {/* Weather Icon and Description */}
            <div className="flex items-center space-x-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="w-12 h-12"
              />
              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <p className="font-medium capitalize">{weather.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherHistory;
