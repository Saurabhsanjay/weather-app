import React from "react";

interface WeatherData {
  location: string;
  temperature: number;
  feels_like: number;
  description: string;
  sunset: string;
  date: string;
  icon: string;
}

interface ForecastData {
  date: string;
  description: string;
  temp: number;
  feels_like: number;
  icon: string;
}

interface WeatherCardProps {
  current: WeatherData[];
  forecast: ForecastData[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ current, forecast }) => {
  const weatherData = current?.[0];

  if (!weatherData) {
    return <p>No data available</p>;
  }

  const { location, temperature, feels_like, description, sunset, date, icon } =
    weatherData;

  return (
    <div className="min-h-fit bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center lg:items-start">
          {/* Main weather card */}
          <div className="w-full lg:w-1/3 bg-orange-100 p-6 rounded-3xl">
            <div className="flex flex-col">
              <div className="text-orange-400 mb-2">Today ▼</div>
              <div className="flex items-center gap-2">
                <div className="text-6xl lg:text-8xl font-light text-orange-400">
                  {Math.round(temperature)}°
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt={description}
                  className="w-16 h-16 lg:w-24 lg:h-24"
                />
              </div>
              <div className="text-orange-400 mt-2 capitalize">
                {description}
              </div>
              <div className="text-orange-400 mt-1">{location}</div>
              <div className="text-orange-400 mt-4">
                {new Date(Number(date)).toLocaleDateString()}
              </div>
              <div className="text-orange-400 mt-1">
                Feels like {Math.round(feels_like)}° | Sunset{" "}
                {new Date(Number(sunset)).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          {/* Right side container for forecast and text */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Forecast card */}
            <div className="w-full bg-white/80 backdrop-blur p-4 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                {forecast.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs lg:text-sm text-gray-600">
                        {new Date(item.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="text-xs lg:text-sm mt-1 capitalize">
                        {item.description}
                      </span>
                      <span className="text-sm lg:text-base font-semibold">
                        {Math.round(item.temp)}°
                      </span>
                      <span className="text-xs text-gray-600">
                        Feels like {Math.round(item.feels_like)}°
                      </span>
                    </div>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                      alt={item.description}
                      className="w-12 h-12 lg:w-16 lg:h-16"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Random text section with better visibility */}
            <div className="w-full bg-black/20 backdrop-blur p-4 rounded-xl">
              <h3 className="text-white font-semibold mb-2">Random Text</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Improve him believe opinion offered met and end cheered forbade.
                Friendly as stronger speedily by recurred. Son interest wandered
                air addition end say. Manners beloved affixed picture men ask.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
