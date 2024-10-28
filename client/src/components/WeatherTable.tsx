import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import WeatherFilters from "./WeatherFilters";
import ForecastTable from "./ForeCastTable";
import WeatherHistory from "./WeatherHistory";
import toast from "react-hot-toast";

const GET_WEATHER = gql`
  query GetWeather($location: String!, $from: String!, $to: String!) {
    getWeather(location: $location, from: $from, to: $to) {
      current {
        location
        temperature
        feels_like
        description
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

const WeatherTable: React.FC = () => {
  const locations = [
    "Delhi",
    "Moscow",
    "Paris",
    "New York",
    "Sydney",
    "Riyadh",
  ];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [location, setLocation] = useState("");


  const [isSubmitted, setIsSubmitted] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_WEATHER, {
    variables: { location, from: fromDate, to: toDate },
    skip: !isSubmitted, 
  });

  const onFilter = () => {
    if (location && fromDate && toDate) {
      setIsSubmitted(true);
      refetch();
    } else {
      toast.error("Please select a location and date range.", {
        duration: 7000,
      });
    }
  };

  useEffect(() => {
    if (data?.getWeather?.current === null) {
      toast.error(
        "Weather data is not available! Try the date range from October 1, 2024, to October 27, 2024.",
        { duration: 7000 }
      );
    }
  }, [data?.getWeather]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-6">
      <WeatherFilters
        locations={locations}
        fromDate={fromDate}
        toDate={toDate}
        location={location}
        setFromDate={setFromDate}
        setToDate={setToDate}
        setLocation={setLocation}
        onFilter={onFilter} 
      />

      {data?.getWeather?.current && (
        <WeatherHistory current={data?.getWeather?.current} />
      )}
      {data?.getWeather?.forecast && (
        <ForecastTable forecast={data?.getWeather?.forecast} />
      )}
    </div>
  );
};

export default WeatherTable;
