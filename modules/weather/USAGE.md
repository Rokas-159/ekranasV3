# Weather module
Usage instructions for parsing weather forecasts.

### File: `/modules/weather/getWeatherInfo.js`
### `async function getWeatherInfo(displayed_hours: Array<string>): string`

Returns a JSON string representing an object where each key is a time, 
and each value is an object with four numerical fields:
- `weather_code` (int): a weather code, according to WMO code table 4677 (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
- `temperature` (int): the temperature at that time in degrees Celsius, signed only when negative
- `precipitation` (float): the amount of precipitation at that time, in millimeters
- `wind_gusts` (float): the speed of wind gusts at that time, in meters per second

#### Parameters

- `displayed_hours` *(Array\<string\>)* - an array in the format `["XX:00", "YY:00", ...]` containing hours to gather the weather forecast for