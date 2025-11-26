# Weather module
Usage instructions for parsing weather forecasts.

### File: `/modules/weather/getWeatherInfo.js`
### `async function getWeatherInfo(): string`

Returns a JSON string representing an object where each key is a time, 
and each value is an object with three string fields:
- `description`: a short description of the weather situation at that time,
- `temperature`: the temperature at that time, as a signed value in degrees Celsius,
- `wind_gusts`: the speed of wind gusts at that time, in meters per second.