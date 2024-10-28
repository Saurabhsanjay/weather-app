const WeatherService = require("../../../services/weatherService");

const weatherResolvers = {
  Query: {
    getWeather: async (_, { location, from, to }) => {
      if (from && to) {
        return await WeatherService.getWeatherByDateRange(location, from, to);
      }

      if (location) {
        const weatherData = await WeatherService.getWeatherForToday(location);
        return {
          current: weatherData?.current || null, 
          forecast: weatherData?.forecast || null, 
        };
      }

      const allWeatherData = await WeatherService.getAllWeather();
      return { current: null, forecast: allWeatherData };
    },
  },

  Mutation: {
    addWeather: async (
      _,
      { location, temperature, feels_like, description, sunset, icon }
    ) =>
      await WeatherService.addWeather({
        location,
        temperature,
        feels_like,
        description,
        sunset,
        icon,
      }),

    deleteWeather: async (_, { id }) => await WeatherService.deleteWeather(id),
  },
};

module.exports = weatherResolvers;
