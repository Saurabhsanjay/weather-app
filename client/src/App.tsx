import React from "react";

import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from "@apollo/client";
import WeatherCard from "./components/WeatherCard";
import WeatherTable from "./components/WeatherTable";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const GET_WEATHER = gql`
  query getWeather($location: String!) {
    getWeather(location: $location) {
      current {
        location
        temperature
        feels_like
        description
        sunset
        icon
        date
      }
      forecast {
        date
        temp
        feels_like
        description
        icon
      }
    }
  }
`;

const App: React.FC = () => {

  const { data, loading, error } = useQuery(GET_WEATHER, {
    client,
    variables: { location: "Delhi" },
  });

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error fetching data</p>
    );

  const { current, forecast } = data.getWeather;

  return (
    <ApolloProvider client={client}>
      <Toaster />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>
        <WeatherCard current={current} forecast={forecast} />
        <WeatherTable />
      </div>{" "}
    </ApolloProvider>
  );
};

export default App;
