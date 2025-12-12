function getMinutesUntilBus(fetched_time) {
    let seconds_now = Math.trunc(new Date() / 1000) 
    let seconds_at_midnight = Math.trunc(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0) / 1000) 
    let seconds_since_midnight = seconds_now - seconds_at_midnight 
    let seconds_until_bus = fetched_time - seconds_since_midnight 
    let minutes_until_bus = Math.trunc(seconds_until_bus / 60) 

    return minutes_until_bus 
}

function CSVToJSON(csv) {
    const HEADERS = ["bus_type", "bus_num", "bus_direction", "bus_time"]
    const INDICES = [0, 1, 5, 3]

    let bus_lines = csv.trim().split("\n") 
    let json = [] 

    for(let i = 1; i < bus_lines.length; i++){
	    let bus = {} 
	    let current_line = bus_lines[i].split(",") 

	    for(let j = 0; j < HEADERS.length - 1; j++){
		    bus[HEADERS[j]] = current_line[INDICES[j]] 
	    }

        bus[HEADERS.at(-1)] = `${getMinutesUntilBus(current_line[INDICES.at(-1)])} min` 

	    json.push(bus) 
    }

    return json 
}
/**
 * @param {Array<string>} stop_ids An array of bus stop identifiers to gather the timetables for. Example values:  
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
 * @returns {Object} A JSON object where each field is a stop id. The ids are mapped to their corresponding arrays of buses. Each bus has four fields of type string: `bus_type`, `bus_num`, `bus_direction`, `bus_time`.
 */
export async function getBusStopInfo(stop_ids) {
    let url = ""
    let response = null
    let result = {}

    for (const stop_id of stop_ids) {
        url = `https://www.stops.lt/vilnius/departures2.php?stopid=${stop_id}`
        response = await fetch(url)
        result[stop_id] = CSVToJSON(await response.text()) 
    }

    return result
}