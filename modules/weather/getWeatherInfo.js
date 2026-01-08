function getHoursFromISO8601(datetime){
    return (`${datetime.slice(11,13)}:00`)
}

/**
 * @param displayed_hours an array in the format `["XY:00", "ZW:00", ...]` containing hours to gather the hourly weather forecast for
 * @param days_ahead an integer from 0 to 6 representing the number of additional days(excluding today) to gather the daily weather forecast for
 * 
 * @returns {Object} a JSON object that has two sections - `today` and `days_ahead`. In the `today` section each key is a time, 
 * and each value is an object with four numerical fields:
 *   - `weather_code` (int): a weather code, according to WMO code table 4677 (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
 *   - `temperature` (float): the temperature at that time in degrees Celsius, signed only when negative
 *   - `precipitation` (float): the amount of precipitation at that time, in millimeters
 *	 - `wind_gusts` (float): the speed of wind gusts at that time, in meters per second
 *
 * In the `days_ahead` section each key is the index of the day(0 for tomorrow),
 * and each value is an object with three numerical fields:
 *   - `weather_code` (int): a weather code, according to WMO code table 4677 (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
 *   - `temperature_min` (float): the minimum temperature for that day in degrees Celsius, signed only when negative
 *   - `temperature_max` (float): the maximum temperature for that day in degrees Celsius, signed only when negative
 */
export async function getWeatherInfo(displayed_hours, days_ahead){
    const hourly_url = "https://api.open-meteo.com/v1/forecast?latitude=54.709257&longitude=25.160923&hourly=temperature_2m,precipitation,weather_code,wind_gusts_10m&forecast_days=1&wind_speed_unit=ms"
    const daily_url = "https://api.open-meteo.com/v1/forecast?latitude=54.709256&longitude=25.160865&daily=weather_code,temperature_2m_min,temperature_2m_max&timezone=Africa%2FCairo"
    let response = await fetch(hourly_url)
    let data = await response.json()
    let result = {
        today: {},
        days_ahead: {}
    }
    let hour = ""

    data.hourly.time.forEach((datetime, i) => {
        hour = getHoursFromISO8601(datetime)
        if (displayed_hours.includes(hour)){
            result.today[hour] = {
                weather_code: data.hourly.weather_code[i],
                temperature: data.hourly.temperature_2m[i] || 0,
                precipitation: data.hourly.precipitation[i],
                wind_gusts: data.hourly.wind_gusts_10m[i]
            }
        }
    })

    response = await fetch(daily_url)
    data = await response.json()
    data.daily.time.slice(1, 1 + days_ahead).forEach((_, i) => {
        const original_index = i + 1 // i + 1, since we slice the original list and the indices are not the same
        result.days_ahead[`${i}`] = {
            weather_code: data.daily.weather_code[original_index],
            temperature_min: data.daily.temperature_2m_min[original_index] || 0,
            temperature_max: data.daily.temperature_2m_max[original_index] || 0
        }
    })

    return result
}