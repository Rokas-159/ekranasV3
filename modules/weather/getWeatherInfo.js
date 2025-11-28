function getHoursFromISO8601(datetime){
    return (`${datetime.slice(11,13)}:00`)
}

function collapseSpaces(str) {
    return str.replace(/\s+/g, ' ')
}

/**
 * @param displayed_hours an array in the format `["XX:00", "YY:00", ...]` containing hours to gather the weather forecast for
 * 
 * @returns {string} Returns a JSON string representing an object where each key is a time, 
 * and each value is an object with four numerical fields:
 *   - `weather_code` (int): a weather code, according to WMO code table 4677 (https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM)
 *   - `temperature` (int): the temperature at that time in degrees Celsius, signed only when negative
 *   - `precipitation` (float): the amount of precipitation at that time, in millimeters
 *	 - `wind_gusts` (float): the speed of wind gusts at that time, in meters per second
 */
export async function getWeatherInfo(displayed_hours){
    const url = "https://api.open-meteo.com/v1/forecast?latitude=54.709257&longitude=25.160923&hourly=temperature_2m,precipitation,weather_code,wind_gusts_10m&forecast_days=1&wind_speed_unit=ms"
    const response = await fetch(url)
    const data = await response.json()
    let result = {}
    let hour = ""

    data.hourly.time.forEach((datetime, i) => {
        hour = getHoursFromISO8601(datetime)
        if (displayed_hours.includes(hour)){
            result[hour] = {
                weather_code: data.hourly.weather_code[i],
                temperature: Math.round(data.hourly.temperature_2m[i]) || 0,
                precipitation: data.hourly.precipitation[i],
                wind_gusts: Math.round(data.hourly.wind_gusts_10m[i]),
            }
        }
    })

    return result
}