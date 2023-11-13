interface IGetWeatherProps {
  lat: number;
  lon: number;
  units?: "metric" | "imperial";
  lang?: "en" | "pl";
}

const API_KEY = import.meta.env.VITE_OPEN_WEATHER;

if (!API_KEY) {
  throw Error("Please set VITE_OPEN_WEATHER if .env file.");
}

export async function getGeoDataByCoords(
  lat: number,
  lon: number
): Promise<ICurrentLocation[] | undefined> {
  const apiCall = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`;
  const res = await fetch(apiCall);

  return !res.ok ? undefined : await res.json();
}

export async function getGeoDataByName(
  name: string,
  signal?: AbortSignal
): Promise<ICurrentLocation[] | undefined> {
  const apiCall = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=10&appid=${API_KEY}`;
  const res = await fetch(apiCall, { signal });

  return !res.ok ? undefined : await res.json();
}

export async function getWeather({
  lat,
  lon,
  units,
  lang,
}: IGetWeatherProps): Promise<IWeatherData | undefined> {
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?units=${
    units || "metric"
  }&lang=${lang || "en"}&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const res = await fetch(apiCall);
  return !res.ok ? undefined : await res.json();
}

export async function getAirPollution(
  lat: number,
  lon: number
): Promise<IAirPollution | undefined> {
  const apiCall = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const res = await fetch(apiCall);
  return !res.ok ? undefined : await res.json();
}
