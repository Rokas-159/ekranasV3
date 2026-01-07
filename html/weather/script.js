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

function setIcon(img, weatherCode){
    const imageSource = `pics/icon_${weatherCode}.png`;
    img.src = imageSource;
    img.alt = `Nėra paveiksliuko su kodu ${weatherCode} :(`;
}
async function updateWeather() {
    const hourCount = 5;
    let hours = [new Date().getHours()];
    while(hours.length < hourCount+1){
        hours.push((hours[hours.length-1]+1)%24);
    }
    const hourDisplays = hours.map(hour => `${hour}:00`);
    const response = await fetch(`/api/weather?displayed_hours=${hourDisplays.join(",")}`).then(res => res.json());
    for (let i = 1; i < hourCount+1; i++){
        const currentObject = response[hourDisplays[i]];

        const table = document.getElementById(`slot_${i-1}`);

        const time = table.querySelector("h2");
        time.textContent = i == 0 ? "Dabar" : `${hours[i]} h`;

        const temperature = table.querySelector("p");
        if(currentObject === undefined){
            temperature.textContent = "Klaida!";
            continue;
        }
        temperature.textContent = currentObject.temperature + "°C";

        const weatherCode = currentObject.weather_code;
        const iconContainer = table.getElementsByClassName("icon-container")[0];
        const icon = iconContainer.getElementsByClassName("weather-icon")[0];
        setIcon(icon, weatherCode);
    }

    const objectNow = response[hourDisplays[0]];
    document.getElementById("feel").textContent = "NaN";
    document.getElementById("wind").textContent = "NaN";
    document.getElementById("wind-gusts").textContent = objectNow.wind_gusts;
    document.getElementById("UV").textContent = "NaN";
    document.getElementById("temp").textContent = objectNow.temperature;
    setIcon(document.getElementById("main-icon"), objectNow.weather_code);
}

function main() {
    generateTables();
    updateWeather();
    setInterval(updateWeather, 1000*60);
}

main();