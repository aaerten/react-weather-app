import React from "react";
import { formatToLocaleTime } from "../services/weatherServices";
import { Typography } from "@mui/material";

function CityDetail({ weather: { dt, timezone, name, country }, cityImages }) {
  return (
    <div className="cityDetailContainer">
      <div className="cityDetailInfo">
        <Typography variant="h6">{`${name}, ${country}`}</Typography>
      </div>
      <div className="cityDetailDateTime">
        <Typography variant="subtitle1">
          {formatToLocaleTime(dt, timezone)}
        </Typography>
      </div>
      <img
        className="cityDetailImage"
        src={cityImages.mobile}
        alt="CityImage"
      />
    </div>
  );
}

export default CityDetail;
