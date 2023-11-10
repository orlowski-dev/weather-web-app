export function canUpdateWeather(currentLocation: string): boolean {
  const lastUpdateLS = localStorage.getItem("weatherLastUpdate");
  const weatherLS = localStorage.getItem("weather");

  if (!lastUpdateLS || !weatherLS) return true;

  const weatherObj = JSON.parse(weatherLS) as IWeatherData;

  if (currentLocation !== weatherObj.name) return true;

  const canUpdateAt = new Date(lastUpdateLS);
  canUpdateAt.setHours(canUpdateAt.getHours() + 1);

  return new Date() > canUpdateAt ? true : false;
}
