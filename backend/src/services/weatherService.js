const openWeatherAPI = require("../config/openWeatherAPI");
const Weather = require("../models/Weather");
const logger = require("../utils/logger");
const { validateDateRange } = require("../utils/validators");

const getAllWeather = async () => {
  try {
    const data = await Weather.find({});
    return data;
  } catch (error) {
    logger.error(`Error fetching all weather data: ${error.message}`);
    throw new Error("Unable to fetch all weather data.");
  }
};

// Fetch weather for a location (today’s weather)
const getWeatherForToday = async (location) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let weatherData;
  try {
    weatherData = await Weather.findOne({
      location,
      date: { $gte: today },
    });
  } catch (error) {
    logger.error(`Error checking today's weather data: ${error.message}`);
    throw new Error("Unable to check today's weather data.");
  }

  const apiResponse = await fetchWeatherFromAPI(location);

  if (!weatherData) {
    console.log(`Cache miss: Saving weather data for ${location} to DB.`);
    weatherData = await saveWeatherData(apiResponse.current, location);
  } else {
    console.log(`Cache hit: Found weather data for ${location} in DB.`);
  }

  const forecastData = await fetchForecastFromAPI(location);

  return {
    current: weatherData ? [weatherData] : [], 
    forecast: forecastData,
  };
};

// Fetch weather data within a date range
const getWeatherByDateRange = async (location, from, to) => {
  if (!validateDateRange(from, to)) {
    const errorMessage = "Date range must not exceed 30 days.";
    throw new Error(errorMessage);
  }

  const startDate = new Date(from);
  
  const endDate = new Date(to);
  endDate.setUTCHours(23, 59, 59, 999);

  let weatherData;
  let forecastData;
  try {
    weatherData = await Weather.find({
      location,
      date: { $gte: startDate, $lte: endDate },
    });
    console.log(weatherData,"wdata")
    forecastData = await fetchForecastFromAPI(location);

  } catch (error) {
    console.log(error)
    logger.error(`Error fetching weather data by date range: ${error.message}`);
    throw new Error("Unable to fetch weather data by date range.");
  }

  if (weatherData.length === 0) {
    return [await getWeatherForToday(location)];
  }

  return { current: weatherData, forecast: forecastData };
};

const fetchWeatherFromAPI = async (location) => {
  try {
    const response = await openWeatherAPI.get("/weather", {
      params: { q: location },
    });

    return {
      current: response.data,
    };
  } catch (error) {
    logger.error(`Error fetching current weather: ${error.message}`);
    throw new Error(`Unable to fetch current weather for ${location}.`);
  }
};

const fetchForecastFromAPI = async (location) => {
  try {
    const response = await openWeatherAPI.get("/forecast", {
      params: { q: location, cnt: 6 },
    });

    return response.data.list.map((item) => ({
      date: item.dt_txt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));
  } catch (error) {
    logger.error(`Error fetching forecast: ${error.message}`);
    return [];
  }
};

const saveWeatherData = async (data, location) => {
  const weatherEntry = new Weather({
    location,
    temperature: data.main.temp,
    feels_like: data.main.feels_like,
    description: data.weather[0].description,
    sunset: new Date(data.sys.sunset * 1000),
    icon: data.weather[0].icon,
    date: new Date(),
  });

  try {
    const savedEntry = await weatherEntry.save();
    return savedEntry;
  } catch (error) {
    logger.error(`Error saving weather data: ${error.message}`);
    throw new Error("Unable to save weather data.");
  }
};

const deleteWeather = async (id) => {
  try {
    await Weather.findByIdAndDelete(id);
    return `Weather entry with ID ${id} deleted successfully.`;
  } catch (error) {
    logger.error(
      `Error deleting weather entry with ID ${id}: ${error.message}`
    );
    throw new Error(`Unable to delete weather entry with ID ${id}.`);
  }
};

module.exports = {
  getAllWeather,
  getWeatherForToday,
  getWeatherByDateRange,
  deleteWeather,
};
