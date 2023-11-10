import { useEffect, useState } from "react";
import { geolocationWatcher } from "./lib/geoloactionAPI";
import { getAirPollution, getGeoDataByCoords, getWeather } from "./lib/getData";
import Searchbar from "./components/Searchbar";
import { canUpdateWeather } from "./lib/utils";

export default function App() {
  const [isLocationDenied, setIsLocationDenied] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<
    ICurrentLocation | undefined
  >(undefined);
  const [watherData, setWeatherData] = useState<
    IWeatherData | null | undefined
  >(null);
  const [airPollution, setAirPollution] = useState<
    IAirPollution | undefined | null
  >(null);

  const geolocationSuccessCallback = (location: GeolocationPosition) => {
    getGeoDataByCoords(
      location.coords.latitude,
      location.coords.longitude
    ).then((res) => {
      if (!res) {
        setCurrentLocation(res);
        return;
      }
      const { country, lat, lon, name, state } = res[0];
      setCurrentLocation({ country, lat, lon, name, state });
      localStorage.setItem(
        "location",
        JSON.stringify({ country, lat, lon, name, state })
      );
    });
  };

  const searchbarResponseCallback = (location: ICurrentLocation) => {
    setCurrentLocation(location);
    localStorage.setItem("location", JSON.stringify(location));
  };

  useEffect(() => {
    // check for the weather in LS
    const weatherLS = localStorage.getItem("weather");
    if (weatherLS) {
      setWeatherData(JSON.parse(weatherLS));
    }

    // check for airPolluton in LS
    const airPollutionLS = localStorage.getItem("airPollution");
    if (airPollutionLS) {
      console.log();
      const tmpAirPollution = JSON.parse(airPollutionLS) as IAirPollution;
      if (tmpAirPollution) {
        setAirPollution(tmpAirPollution);
      }
    }

    // check for location is LS
    const locationLS = localStorage.getItem("location");
    if (locationLS) {
      const tmpLocation = JSON.parse(locationLS) as ICurrentLocation;
      if (tmpLocation) {
        setCurrentLocation(tmpLocation);
        return;
      }
    }

    if (!navigator.geolocation) {
      console.log("Browser doesnt support geolocation.");
      setIsLocationDenied(true);
      return;
    }

    const watcher = geolocationWatcher(
      (location) => geolocationSuccessCallback(location),
      () => setIsLocationDenied(true)
    );

    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  }, []);

  // on currentLocation change
  useEffect(() => {
    if (!currentLocation || !canUpdateWeather(currentLocation.name)) return;

    getWeather({
      lat: currentLocation.lat,
      lon: currentLocation.lon,
    }).then((res) => {
      setWeatherData(res);
      localStorage.setItem("weather", JSON.stringify(res));
      localStorage.setItem("weatherLastUpdate", new Date().toString());
    });
    getAirPollution(currentLocation.lat, currentLocation.lon).then((res) => {
      setAirPollution(res);
      localStorage.setItem("airPollution", JSON.stringify(res));
    });
  }, [currentLocation]);

  return (
    <main className="container-680">
      <Searchbar callback={searchbarResponseCallback} />
      <h1>Weather Web App</h1>
      {isLocationDenied && (
        <p>
          Browser geolocation is blocked by the user. Please enter your location
          manually.
        </p>
      )}
      {currentLocation && (
        <p>
          {currentLocation.lon}, {currentLocation.lat}
          <br />
          {currentLocation.name}, {currentLocation.state}{" "}
          {currentLocation.country}
        </p>
      )}
      {watherData && (
        <div>
          <p>{watherData.main.temp}</p>
          <p>{watherData.weather[0].description}</p>
        </div>
      )}
      {airPollution && (
        <div>
          <p>{airPollution.list[0].components.co}</p>
        </div>
      )}
    </main>
  );
}
