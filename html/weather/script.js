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
function setSlot(slot, currentObject, display){
    const time = slot.querySelector("h2");
    time.textContent = display;

    const temperature = slot.querySelector("p");
    if(currentObject === undefined){
        temperature.textContent = "Klaida!";
        return;
    }
    if(typeof currentObject.temperature === "undefined"){
        temperature.textContent = currentObject.temperature_min + "°C — "  + currentObject.temperature_max + "°C";
    }else{
        temperature.textContent = currentObject.temperature + "°C";
    }

    const weatherCode = currentObject.weather_code;
    const iconContainer = slot.getElementsByClassName("icon-container")[0];
    const icon = iconContainer.getElementsByClassName("weather-icon")[0];
    setIcon(icon, weatherCode);
}
async function updateWeather() {
    const hourCount = 5;
    const dayCount = 5;
    const dayNames = ["Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis", "Sekmadienis"];
    const d = new Date();
    const hours = [d.getHours()];
    const weekday = ((d.getDay() - 1) + 7) % 7;
    while(hours.length < hourCount+1){
        hours.push((hours[hours.length-1]+1)%24);
    }
    const hourDisplays = hours.map(hour => `${hour}:00`);
    const response = await fetch(`/api/weather?displayed_hours=${hourDisplays.join(",")}&days_ahead=${dayCount}`).then(res => res.json());
    for (let i = 1; i < hourCount+1; i++){
        const currentObject = response.today[hourDisplays[i]];
        const table = document.getElementById(`slot_${i-1}`);
        setSlot(table, currentObject, `${hours[i]} h`);        
    }

    const objectNow = response.today[hourDisplays[0]];
    document.getElementById("feel").textContent = "NaN";
    document.getElementById("wind").textContent = "NaN";
    document.getElementById("wind-gusts").textContent = objectNow.wind_gusts;
    document.getElementById("UV").textContent = "NaN";
    document.getElementById("temp").textContent = objectNow.temperature;
    setIcon(document.getElementById("main-icon"), objectNow.weather_code);

    for (let i = hourCount; i < hourCount+dayCount; i++){
        let dayOffset = i - hourCount + 1;
        const currentObject = response.days_ahead[dayOffset-1];
        const table = document.getElementById(`slot_${i}`);
        setSlot(table, currentObject, `${dayNames[(weekday+dayOffset)%7]}`);        
    }
}

function main() {
    generateTables();
    updateWeather();
    setInterval(updateWeather, 1000*60);
}

main();