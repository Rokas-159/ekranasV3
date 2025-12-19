const mainMain = document.querySelector("main");
const forecastTable = document.getElementById("forecast");

function generateTables() {
    for (let i = 0; i < 10; i++) {
        const div = document.createElement("div");
        const date = document.createElement("h2");
        date.textContent = i;
        const imgContainer = document.createElement("div");
        const img = document.createElement("img");
        img.src = "pic.png";
        // imgContainer.appendChild(img);
        imgContainer.classList.add("img-container");
        imgContainer.style.backgroundImage = "url(pic.png)";
        const temp = document.createElement("p");
        temp.textContent = i + "°C";
        div.appendChild(date);
        div.appendChild(imgContainer);
        div.appendChild(temp);
        forecastTable.appendChild(div);
    }
}
async function loadBuses(stopId){
    
}
async function updateStops(){
    
}

function main() {
    generateTables();
    updateStops();
    setInterval(updateStops, 1000*5);
}

main();