import React from "react";
import { iconFromCode } from "../services/weatherServices";
import { Typography } from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";

function WeatherDetail({
  weather: { details, icon, temp, speed, humidity, feels_like },
}) {
  return (
    <div className="weatherDetailContainer">
      <div className="weatherDetailHeader">
        <Typography variant="h5">{details}</Typography>
      </div>
      <div className="weatherDetailInfo">
        <div className="weatherDetailInfoBody">
          <img src={iconFromCode(icon)} alt={icon} />
          <Typography variant="h3">{`${temp.toFixed()}°`}</Typography>
        </div>
        <div className="weatherDetailInfoList">
          <div className="weatherDetailInfoListItem">
            <DeviceThermostatIcon className="weatherDetailInfoListItemIcon" />
            <Typography variant="caption">
              Real fell: <span>{`${feels_like.toFixed()}°`}</span>
            </Typography>
          </div>
          <div className="weatherDetailInfoListItem">
            <WaterDropIcon className="weatherDetailInfoListItemIcon" />
            <Typography variant="caption">
              Humidity: <span>{`${humidity.toFixed()}%`}</span>
            </Typography>
          </div>
          <div className="weatherDetailInfoListItem">
            <AirIcon className="weatherDetailInfoListItemIcon" />
            <Typography variant="caption">
              Wind: <span>{`${speed.toFixed()} km/h`}</span>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetail;
