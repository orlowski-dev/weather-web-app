import Card from "./Card";
import { TbArrowUp, TbCloud } from "react-icons/tb";

export default function CurrentWeatherDetails({
  weather,
}: {
  weather: IWeatherData;
}) {
  const cwD = weather.weather[0];
  const cwM = weather.main;
  return (
    <Card headerIcon={<TbCloud />} headerTitle="Details">
      <table className="cw-details">
        <tbody>
          <tr>
            <td>Conditions</td>
            <td>{cwD.description}</td>
          </tr>
          <tr>
            <td>Min</td>
            <td>{Math.floor(cwM.temp_max)}&deg;</td>
          </tr>
          <tr>
            <td>Max</td>
            <td>{Math.floor(cwM.temp_max)}&deg;</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>{cwM.humidity}%</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td>{cwM.pressure} hPa</td>
          </tr>
          <tr>
            <td>Wind</td>
            <td>
              <span className="d-if ai-c jc-fe" style={{ gap: 8 }}>
                <TbArrowUp
                  style={{ transform: `rotate(${weather.wind.deg}deg)` }}
                />
                {weather.wind.speed} m/s
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
