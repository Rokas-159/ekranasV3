/**
 * @param displayed_hours an array in the format `[x, y, ...]` containing hours(from 0(00:00 today) to 47(23:00 tomorrow)) to gather the hourly weather forecast for
 * @param days_after_today an integer from 0 to 6 representing the number of additional days(excluding today) to gather the daily weather forecast for
 * 
 * @returns {Object} a JSON object that has three sections - `today`, `tomorrow` and `days_after_today`. 
 * 
 * The `today` section provides hourly forecast for today. In the `today` section each key is a time, and each value is an object with four numerical fields:
 *   - `weather_code` (int): a weather code, according to WMO code table 4677 (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
 *   - `temperature` (float): the temperature at that time in degrees Celsius, signed only when negative
 *   - `precipitation` (float): the amount of precipitation at that time, in millimeters
 *	 - `wind_gusts` (float): the speed of wind gusts at that time, in meters per second
 *
 * The `tomorrow` section provides hourly forecast for tomorrow. Its structure is the same as `today`'s structure.
 * 
 * The `days_after_today` section provides daily forecast for days as specified in the `days_after_today` parameter. In the `days_after_today` section each key is the index of the day(0 for tomorrow),
 * and each value is an object with three numerical fields:
 *   - `weather_code` (int): a weather code, according to WMO code table 4677 (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
 *   - `temperature_min` (float): the minimum temperature for that day in degrees Celsius, signed only when negative
 *   - `temperature_max` (float): the maximum temperature for that day in degrees Celsius, signed only when negative
 */
export async function getWeatherInfo(displayed_hours, days_after_today){
    const hourly_url = "https://api.open-meteo.com/v1/forecast?latitude=54.709257&longitude=25.160923&hourly=temperature_2m,precipitation,weather_code,wind_gusts_10m&forecast_days=2&wind_speed_unit=ms"
    const daily_url = "https://api.open-meteo.com/v1/forecast?latitude=54.709257&longitude=25.160923&daily=weather_code,temperature_2m_min,temperature_2m_max&timezone=Africa%2FCairo"
    let response = await fetch(hourly_url)
    let data = await response.json()
    let result = {
        today: {},
        tomorrow: {},
        days_after_today: {}
    }

    displayed_hours.forEach((hour) => {
        let hourly_forecast_object = {
            weather_code: data.hourly.weather_code[hour],
            temperature: data.hourly.temperature_2m[hour] || 0,
            precipitation: data.hourly.precipitation[hour],
            wind_gusts: data.hourly.wind_gusts_10m[hour]
        }

        if (hour < 24){
            result.today[`${hour}:00`] = hourly_forecast_object
        } else {
            result.tomorrow[`${hour % 24}:00`] = hourly_forecast_object
        }
    })

    response = await fetch(daily_url)
    data = await response.json()
    data.daily.time.slice(1, 1 + days_after_today).forEach((_, i) => {
        const original_index = i + 1 // i + 1, since we slice the original list and the indices are not the same
        result.days_after_today[`${i}`] = {
            weather_code: data.daily.weather_code[original_index],
            temperature_min: data.daily.temperature_2m_min[original_index] || 0,
            temperature_max: data.daily.temperature_2m_max[original_index] || 0
        }
    })

    return result
}