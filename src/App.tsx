import { useEffect, useState } from "react";
import { geolocationWatcher } from "./lib/geoloactionAPI";
import { getGeoDataByCoords } from "./lib/getData";
import Searchbar from "./components/Searchbar";

export default function App() {
  const [isLocationDenied, setIsLocationDenied] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<
    ICurrentLocation | undefined
  >(undefined);

  const geolocationSuccessCallback = (location: GeolocationPosition) => {
    const locationLS = localStorage.getItem("location");

    if (locationLS) {
      const tmpLocation = JSON.parse(locationLS) as ICurrentLocation;
      if (tmpLocation) {
        setCurrentLocation(tmpLocation);
        return;
      }
    }

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
    if (!navigator.geolocation) {
      console.log("Browser doesnt support geolocation.");
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
    </main>
  );
}
