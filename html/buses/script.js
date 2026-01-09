const mainMain = document.querySelector("main");

const stops = {
    "2016": {name: "Licėjus", dir: "Akropolio kryptimi"},
    "0710": {name: "Licėjus", dir: "Žirmunų kryptimi"},
    "0804": {name: "Pramogų arena", dir: "Žirmūnų kryptimi"},
    "0802": {name: "Pramogų arena", dir: "Santariškių kryptimi"},
    "0709": {name: "Pramogų arena", dir: "Centro kryptimi"},
    "2015": {name: "Pramogų arena", dir: "Ozo kryptimi"},
    "0708": {name: "Tauragnų st.", dir: "Centro kryptimi"},
    "0803": {name: "Tauragnų st.", dir: "Santariškių kryptimi"}
};
function generateTables() {
    Object.keys(stops).forEach(stopId => {
        const table = document.createElement("div");
        const header = document.createElement("div");
        header.innerHTML = stops[stopId].name + "<br>" + stops[stopId].dir;
        header.classList.add("bus_header");
        table.appendChild(header);
        const body = document.createElement("div");
        body.id = "table_" + stopId;
        body.classList.add("bus_list");
        table.appendChild(body);
        mainMain.appendChild(table);
    });
}
async function updateStops(stopIds){
    let response = await fetch(`/api/buses?stop_ids=${stopIds}`);
    response = await response.json();
    Object.keys(response).forEach(stopId => {
        const table = document.getElementById("table_" + stopId);
        table.innerHTML = "";
        response[stopId].forEach(bus => {

            const busDiv = document.createElement("div");
            busDiv.innerHTML = `<span class="bus_num type_${bus.bus_type}">${bus.bus_num}</span> ${bus.bus_time}`;
            table.appendChild(busDiv);
        });
    })
}

function main() {
    generateTables();
    updateStops(Object.keys(stops));
    setInterval(updateStops, 1000*5);
}

main();