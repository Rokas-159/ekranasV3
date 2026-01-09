# Weather module
Usage instructions for parsing weather forecasts.

### File: `/modules/weather/getWeatherInfo.js`
### `async function getWeatherInfo(displayed_hours: Array<int>, days_ahead: int): Object`

Returns a JSON object that has three sections - `today`, `tomorrow` and `days_after_today`.

The `today` section provides hourly forecast for today. In the `today` section each key is a time, and each value is an object with four numerical fields:
  - `weather_code` (int): a weather code, according to WMO code table 4677 (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
  - `temperature` (float): the temperature at that time in degrees Celsius, signed only when negative
  - `precipitation` (float): the amount of precipitation at that time, in millimeters
  - `wind_gusts` (float): the speed of wind gusts at that time, in meters per second

The `tomorrow` section provides hourly forecast for tomorrow. Its structure is the same as `today`'s structure.

The `days_after_today` section provides daily forecast for days as specified in the `days_after_today` parameter. In the `days_after_today` section each key is the index of the day(0 for tomorrow), 
and each value is an object with three numerical fields:
  - `weather_code` (int): a weather code, according to WMO code table 4677 (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
  - `temperature_min` (float): the minimum temperature for that day in degrees Celsius, signed only when negative
  - `temperature_max` (float): the maximum temperature for that day in degrees Celsius, signed only when negative

#### Parameters

- `displayed_hours` *(Array\<int\>)* - an array in the format `[x, y, ...]` containing hours(from 0(00:00 today) to 47(23:00 tomorrow)) to gather the hourly weather forecast for
- `days_ahead` *(int)* - an integer from 0 to 6 representing the number of additional days(excluding today) to gather the daily weather forecast for