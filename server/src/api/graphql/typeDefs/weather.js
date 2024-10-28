const { gql } = require("apollo-server-express");

const weatherTypeDefs = gql`
  type Weather {
    id: ID!
    location: String!
    temperature: Float!
    feels_like: Float!
    description: String!
    sunset: String!
    icon: String!
    date: String!
    createdAt: String!
  }

  type Forecast {
    date: String!
    temp: Float!
    feels_like: Float!
    description: String!
    icon: String!
  }

  type WeatherResponse {
    current: [Weather]
    forecast: [Forecast!]
  }

  type Query {
    getWeather(location: String!, from: String, to: String): WeatherResponse!
  }

  type Mutation {
    addWeather(
      location: String!
      temperature: Float!
      feels_like: Float!
      description: String!
      sunset: String!
      icon: String!
    ): Weather!

    deleteWeather(id: ID!): String!
  }
`;

module.exports = weatherTypeDefs;
