import { TbArrowUp } from "react-icons/tb";
import Thermometer from "../icons/Thermometer";
import ContentSP from "./ContentSP";

export default function WeatherDetails({ weather }: { weather: IWeatherData }) {
  return (
    <ContentSP
      icon={<Thermometer />}
      title="Details"
      data={[
        {
          key: "Conditions",
          value: weather.weather[0].description,
        },
        {
          key: "Min",
          value: `${Math.floor(weather.main.temp_min) + "°"}`,
        },
        {
          key: "Max",
          value: `${Math.floor(weather.main.temp_max) + "°"}`,
        },
        {
          key: "Wind",
          value: Math.floor(weather.wind.speed) + "m/s",
          extra: (
            <TbArrowUp
              style={{
                transform: `rotate(${weather.wind.deg}deg)`,
              }}
            />
          ),
        },
        {
          key: "Humidity",
          value: `${weather.main.humidity + "%"}`,
        },
        {
          key: "Pressure",
          value: `${weather.main.pressure + "hPa"}`,
        },
        {
          key: "Cloudiness",
          value: weather.clouds.all + "%",
        },
        {
          key: "Visibility",
          value: weather.visibility + "m",
        },
      ]}
    />
  );
}
