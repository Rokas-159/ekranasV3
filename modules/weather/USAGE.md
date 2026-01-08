# Weather module
Usage instructions for parsing weather forecasts.

### File: `/modules/weather/getWeatherInfo.js`
### `async function getWeatherInfo(displayed_hours: Array<string>, days_ahead: int): Object`

Returns a JSON object that has two sections - `today` and `days_ahead`. In the `today` section each key is a time, 
and each value is an object with four numerical fields:
  - `weather_code` (int): a weather code, according to WMO code table 4677 (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
  - `temperature` (float): the temperature at that time in degrees Celsius, signed only when negative
  - `precipitation` (float): the amount of precipitation at that time, in millimeters
  - `wind_gusts` (float): the speed of wind gusts at that time, in meters per second

In the `days_ahead` section each key is the index of the day(0 for tomorrow),
and each value is an object with three numerical fields:
  - `weather_code` (int): a weather code, according to WMO code table 4677 (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
  - `temperature_min` (float): the minimum temperature for that day in degrees Celsius, signed only when negative
  - `temperature_max` (float): the maximum temperature for that day in degrees Celsius, signed only when negative

#### Parameters

- `displayed_hours` *(Array\<string\>)* - an array in the format `["XY:00", "ZW:00", ...]` containing hours to gather the hourly weather forecast for
- `days_ahead` *(int)* - an integer from 0 to 6 representing the number of additional days(excluding today) to gather the daily weather forecast for