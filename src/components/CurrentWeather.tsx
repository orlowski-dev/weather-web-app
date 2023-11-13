import { TbMapPin } from "react-icons/tb";
import "./CurrentWeather.scss";

interface ICurrentWeatherProps {
  location: ICurrentLocation;
  weather: IWeatherData;
}

export default function CurrentWeather({
  location,
  weather,
}: ICurrentWeatherProps) {
  return (
    <article className="temp-and-cond">
      <header style={{ marginBottom: 0 }}>
        <h2>
          <TbMapPin /> {location.name}
        </h2>
      </header>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="condition icon"
        />
        <h2>{Math.floor(weather.main.temp)}&deg;</h2>
      </div>
      <p>Real feel {Math.floor(weather.main.feels_like)}&deg;</p>
    </article>
  );
}
