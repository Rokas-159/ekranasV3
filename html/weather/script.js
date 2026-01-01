const mainMain = document.querySelector("main");
const weatherHeader = document.getElementById("header");
const forecastTable = document.getElementById("forecast");
function generateTables() {
    for (let i = 0; i < 10; i++) {
        const div = document.createElement("div");
        div.id = `slot_${i}`;
        const date = document.createElement("h2");
        date.classList.add("time-heading");
        date.textContent = "Loading...";

        const imageSource = "pics/icon.png";
        const icon = document.createElement("img");
        icon.classList.add("weather-icon");
        icon.src = imageSource;
        icon.alt = "Loading...";
        const iconContainer = document.createElement("div");
        iconContainer.classList.add("icon-container");
        iconContainer.appendChild(icon);
        // iconContainer.style.backgroundImage = `url(${imageSource})`;

        const temperature = document.createElement("p");
        temperature.textContent = "Loading...";
        temperature.classList.add("temperature-text");

        div.appendChild(date);
        div.appendChild(iconContainer);
        div.appendChild(temperature);
        forecastTable.appendChild(div);
    }
}

async function updateWeather() {
    const hourCount = 5;
    let hours = [new Date().getHours()];
    while(hours.length < hourCount){
        hours.push((hours[hours.length-1]+1)%24);
    }
    const hourDisplays = hours.map(hour => `${hour}:00`);
    const response = await getWeatherInfo(hourDisplays);
    console.log(response);
    for (let i = 0; i < hourCount; i++){
        const currentObject = response[hourDisplays[i]];

        const table = document.getElementById("slot_" + i);

        const time = table.querySelector("h2");
        time.textContent = i == 0 ? "Dabar" : `${hours[i]} h`;

        const weatherCode = currentObject.weather_code;
        const imageSource = `pics/icon_${weatherCode}.png`;
        const iconContainer = table.getElementsByClassName("icon-container")[0];
        const icon = iconContainer.getElementsByClassName("weather-icon")[0];
        icon.src = imageSource;
        icon.alt = `Nėra paveiksliuko su kodu ${weatherCode} :(`;

        const temperature = table.querySelector("p");
        temperature.textContent = currentObject.temperature + "°C";
    }

    const objectNow = response[hourDisplays[0]];
    document.getElementById("feel").textContent = "NaN";
    document.getElementById("wind").textContent = "NaN";
    document.getElementById("wind-gusts").textContent = objectNow.wind_gusts;
    document.getElementById("UV").textContent = "NaN";
}

function main() {
    generateTables();
    updateWeather();
    setInterval(updateWeather, 1000*60);
}

main();