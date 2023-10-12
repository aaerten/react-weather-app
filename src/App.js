import "./App.css";
import React, { useEffect, useState } from "react";
import getFormattedWeatherData from "./services/weatherServices";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import {
  CityDetail,
  SearchInput,
  WeatherDetail,
  WeatherForecast,
} from "./components";
import getCityDetail from "./services/cityDetailService";

function App() {
  const [query, setQuery] = useState({ q: "sydney" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [cityImages, setCityImages] = useState(null);

  useEffect(() => {
    setWeather(null);
    setCityImages(null);
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);

  useEffect(() => {
    if (weather) {
      const fetchCityDetail = async () => {
        await getCityDetail(weather.name).then((data) => {
          setCityImages(data.photos[0].image);
        });
      };
      fetchCityDetail();
    }
  }, [weather]);

  return (
    <div className="container">
      {!weather && !cityImages && (
        <Grid container className="loadingContainer">
          <CircularProgress />
        </Grid>
      )}
      {weather && cityImages && (
        <Grid container className="weatherCard">
          <Grid item xs={4}>
            <Box p={2} className="cardLeft">
              <SearchInput
                units={units}
                setUnits={setUnits}
                setQuery={setQuery}
              />
              <CityDetail weather={weather} cityImages={cityImages} />
              <WeatherDetail weather={weather} />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box p={2} className="cardRight">
              <div className="cardRightHeader">
                <Typography variant="h5" className="cardRightTitle">
                  Welcome
                </Typography>
                <Typography variant="body1" className="cardRightSubTitle">
                  Check out weather information
                </Typography>
              </div>
              <WeatherForecast title="Hourly Forecast" items={weather.hourly} />
              <WeatherForecast title="Daily Forecast" items={weather.daily} />
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default App;
