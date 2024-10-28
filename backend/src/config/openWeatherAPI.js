const axios = require("axios");
const ENV = require("./env");

const openWeatherAPI = axios.create({
  baseURL: ENV.OPENWEATHER_BASE_URL,
  params: { appid: ENV.OPENWEATHER_API_KEY, units: "metric" },
});

module.exports = openWeatherAPI;
