import axios from 'axios'
import { load } from 'cheerio'

function normalizeTemperatureSign(temperature){
    if (temperature[0] > 0 && temperature[0] <= 9)
        return ("+" + temperature)
    return temperature
}

function collapseSpaces(str) {
    return str.replace(/\s+/g, ' ');
}

/**
 * Returns a JSON string representing an object where each key is a time, 
 * and each value is an object with three string fields:
 *   - `description`: a short description of the weather situation at that time,
 *   - `temperature`: the temperature at that time, as a signed value in degrees Celsius,
 *   - `wind_gusts`: the speed of wind gusts at that time, in meters per second.
 *
 * @returns {string}
 */
async function getWeatherInfo (){
    const url = "https://meteofor.lt/weather-vilnius-4230/"
    const response = await axios.get(url)
    const html = response.data

    let result = {}

    const $ = load(html, {xml: {xmlMode: false, decodeEntities: true}})
    let $times_container = $("div.widget-row.widget-row-datetime-time")
    let $icons_container = $("div.widget-row.widget-row-icon")
    let $temperature_container = $("div.widget-row-chart.widget-row-chart-temperature-air")
    let $wind_gusts_container = $("div.widget-row.widget-row-wind.row-wind-gust")

    $times_container.children("div.row-item").each((i, time_el) => {
        let time = $(time_el).children("span").text()

        let $icon = $icons_container.children("div.row-item").eq(i)
        let retrieved_description = $icon.attr("data-tooltip")
        retrieved_description = collapseSpaces(retrieved_description)

        let $temperature_el = $temperature_container.find("div.chart div.values div.value").eq(i)
        let retrieved_temperature = $temperature_el.children("temperature-value").attr("value")
        retrieved_temperature = normalizeTemperatureSign(retrieved_temperature)

        let $wind_gusts_el = $wind_gusts_container.find(`div.row-item`).eq(i)
        let retrieved_wind_gusts = $wind_gusts_el.children("speed-value").attr("value")

        result[time] = {
            description: retrieved_description, 
            temperature: retrieved_temperature,
            wind_gusts: retrieved_wind_gusts
        }
    })

    return JSON.stringify(result)
}

console.log(await getWeatherInfo())