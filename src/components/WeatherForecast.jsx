import React from "react";
import { iconFromCode } from "../services/weatherServices";
import { Typography } from "@mui/material";

function WeatherForecast({ title, items }) {
  return (
    <div className="forecastTopContainer">
      <div className="forecastHeader">
        <Typography variant="subtitle1" className="forecastTitle">
          {title}
        </Typography>
      </div>
      <hr style={{ margin: "5px 0 15px 0" }} />

      <div className="forecastContainer">
        {items.map((item, idx) => (
          <div key={idx} className="forecastItem">
            <Typography variant="body1">{item.title}</Typography>
            <img src={iconFromCode(item.icon)} alt={item.icon} />
            <Typography variant="body1">{`${item.temp.toFixed()}°`}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast;
