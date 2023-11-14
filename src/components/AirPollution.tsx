import Card from "./Card";
import { TbPoint } from "react-icons/tb";

const airQualities = ["Good", "Fair", "Moderate", "Poor", "Good"];

export default function AirPollution({
  airPollution,
}: {
  airPollution: IAirPollution;
}) {
  const ap = airPollution.list[0];
  return (
    <Card headerIcon={<TbPoint />} headerTitle="Air pollution">
      <table className="cw-details">
        <tbody>
          <tr>
            <td>Air quality</td>
            <td className={`index-${ap.main.aqi}`}>
              {airQualities[ap.main.aqi - 1]}
            </td>
          </tr>
        </tbody>
        <table className="cw-details">
          <thead>
            <tr>
              <th>Pollutant</th>
              <th>
                μg/m<sup>3</sup>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Carbon monoxide (CO)</td>
              <td>{ap.components.co}</td>
            </tr>
            <tr>
              <td>Nitrogen monoxide (NO)</td>
              <td>{ap.components.no}</td>
            </tr>
            <tr>
              <td>
                Nitrogen dioxide (NO<sub>2</sub>)
              </td>
              <td>{ap.components.no2}</td>
            </tr>
            <tr>
              <td>
                Ozone (O<sub>3</sub>)
              </td>
              <td>{ap.components.o3}</td>
            </tr>
            <tr>
              <td>
                Sulphur dioxide (SO<sub>2</sub>)
              </td>
              <td>{ap.components.so2}</td>
            </tr>
            <tr>
              <td>
                Ammonia (NH<sub>3</sub>)
              </td>
              <td>{ap.components.nh3}</td>
            </tr>
            <tr>
              <td>
                Particulates (PM<sub>2.5</sub> and PM<sub>10</sub>)
              </td>
              <td>
                {ap.components.pm2_5}, {ap.components.pm10}
              </td>
            </tr>
          </tbody>
        </table>
      </table>
    </Card>
  );
}
