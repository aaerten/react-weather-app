import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(process.env.REACT_APP_API_URL + "/" + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: process.env.REACT_APP_API_KEY,
  });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, humidity },
    name,
    dt,
    sys: { country },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    humidity,
    name,
    dt,
    country,
    details,
    icon,
    speed,
  };
};

const formatToLocaleTime = (secs, zone, format = "MMMM D, YYYY h:mm A") => {
  return dayjs(secs * 1000)
    .tz(zone)
    .format(format);
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocaleTime(d.dt, timezone, "ddd"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((h) => {
    return {
      title: formatToLocaleTime(h.dt, timezone, "h:mm A"),
      temp: h.temp,
      icon: h.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;
  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const iconFromCode = (code) => {
  return `${process.env.REACT_APP_ICON_URL}/${code}@2x.png`;
};

export default getFormattedWeatherData;
export { formatToLocaleTime, iconFromCode };
