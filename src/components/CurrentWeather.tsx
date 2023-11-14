import { TbMapPin } from "react-icons/tb";
import Card from "./Card";

export default function CurrentWeather({ weather }: { weather: IWeatherData }) {
  return (
    <Card
      headerIcon={<TbMapPin />}
      headerTitle={weather.name + ", " + weather.sys.country}
    >
      <div className="cw-d">
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />
        </div>
        <h3>{Math.floor(weather.main.temp)}&deg;</h3>
      </div>
      <p>Real feel {Math.floor(weather.main.feels_like)}&deg;</p>
    </Card>
  );
}
