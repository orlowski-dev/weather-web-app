export function geolocationWatcher(
  successCallback: PositionCallback,
  errorCallback: PositionErrorCallback
) {
  return navigator.geolocation.watchPosition(successCallback, errorCallback);
}
