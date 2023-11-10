const API_KEY = import.meta.env.VITE_OPEN_WEATHER;

if (!API_KEY) {
  throw Error("Please set VITE_OPEN_WEATHER if .env file.");
}

export async function getGeoDataByCoords(
  lat: number,
  lon: number
): Promise<ICurrentLocation[] | undefined> {
  const api_call = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`;
  const res = await fetch(api_call);

  return !res.ok ? undefined : await res.json();
}

export async function getGeoDataByName(
  name: string,
  signal?: AbortSignal
): Promise<ICurrentLocation[] | undefined> {
  const api_call = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
  const res = await fetch(api_call, { signal });

  return !res.ok ? undefined : await res.json();
}
