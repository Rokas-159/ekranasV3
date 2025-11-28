function getMinutesUntilBus(fetched_time) {
    
    let seconds_now = Math.trunc(new Date() / 1000);
    let seconds_at_midnight = Math.trunc(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0) / 1000);
    let seconds_since_midnight = seconds_now - seconds_at_midnight;
    let seconds_until_bus = fetched_time - seconds_since_midnight;
    let minutes_until_bus = Math.trunc(seconds_until_bus / 60);

    return minutes_until_bus;
}

function CSVToJSON(csv) {
    const HEADERS = ["bus_type", "bus_num", "bus_direction", "bus_time"]
    const INDICES = [0, 1, 5, 3]

    let bus_lines = csv.trim().split("\n");
    let json = [];

    for(let i = 1; i < bus_lines.length; i++){

	    let bus = {};
	    let current_line = bus_lines[i].split(",");

	    for(let j = 0; j < HEADERS.length - 1; j++){
		    bus[HEADERS[j]] = current_line[INDICES[j]];
	    }

        bus[HEADERS.at(-1)] = `${getMinutesUntilBus(current_line[INDICES.at(-1)])} min`;

	    json.push(bus);
    }

    return json;
}

/**
 * @param {string} stop_id -
 * - **2016**: Licėjus (Akropolio kryptimi); 
 * - **0710**: Licėjus (Žirmunų kryptimi); 
 * - **0804**: Pramogų arena. Kareivių g. (Žirmūnų kryptimi); 
 * - **0802**: Pramogų arena, Kalvarijų g. (Santariškių kryptimi); 
 * - **0709**: Pramogų arena. Kalvarijų g. (Centro kryptimi); 
 * - **2015**: Pramogų arena. Kareivių g. (Ozo kryptimi); 
 * - **0708**: Tauragnų st. (Centro kryptimi); 
 * - **0803**: Tauragnų st. (Santariškių kryptimi); 
 * - Consult https://docs.google.com/spreadsheets/d/1FaRhmFvxCVLVhHCnEjrGq3l42fSa1R648fk2H3xqHuQ/pubhtml for every available `stop_id`
 * 
 * @returns {string} Returns a JSON string, representing an array of buses where each entry has four fields of type string: `bus_type`, `bus_num`, `bus_direction`, `bus_time`.
 */
export async function getBusStopInfo(stop_id) {

    const url = `https://www.stops.lt/vilnius/departures2.php?stopid=${stop_id}`;

    const response = await fetch(url);
    return CSVToJSON(await response.text());
}