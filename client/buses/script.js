const mainMain = document.querySelector("main");

const stops = [
    {id: "2016", name: "Licėjus", dir: "Akropolio kryptimi"},
    {id: "0710", name: "Licėjus", dir: "Žirmunų kryptimi"},
    {id: "0804", name: "Pramogų arena", dir: "Žirmūnų kryptimi"},
    {id: "0802", name: "Pramogų arena", dir: "Santariškių kryptimi"},
    {id: "0709", name: "Pramogų arena", dir: "Centro kryptimi"},
    {id: "2015", name: "Pramogų arena", dir: "Ozo kryptimi"},
    {id: "0708", name: "Tauragnų st.", dir: "Centro kryptimi"},
    {id: "0803", name: "Tauragnų st.", dir: "Santariškių kryptimi"}
];
function generateTables() {
    stops.forEach(stop => {
        const table = document.createElement("div");
        const header = document.createElement("div");
        header.innerHTML = stop.name + "<br>" + stop.dir;
        header.classList.add("top_header");
        table.appendChild(header);
        const body = document.createElement("div");
        body.id = "table_" + stop.id;
        body.classList.add("bus_list");
        table.appendChild(body);
        mainMain.appendChild(table);
    });
}
async function loadBuses(stopId){
    const response = await getBusStopInfo(stopId);
    const table = document.getElementById("table_" + stopId);
    table.innerHTML = "";
    let counter = 0;
    response.forEach(bus => {
        if(counter >= 10) return;
        counter++;

        const busDiv = document.createElement("div");
        busDiv.innerHTML = `<span class="bus_num type_${bus.bus_type}">${bus.bus_num}</span> ${bus.bus_time}`;
        table.appendChild(busDiv);
    });
}
async function updateStops(){
    stops.forEach(stop => loadBuses(stop.id));
}

function main() {
    generateTables();
    updateStops();
    setInterval(updateStops, 1000*5);
}

main();