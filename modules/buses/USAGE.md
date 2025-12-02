# Buses module
Usage instructions for parsing bus stop timetables.

### File: `/modules/buses/getBusStopInfo.js`
### `async function getBusStopInfo(stop_ids: Array<string>): Object`

Returns a JSON object where each field is a stop id. The ids are mapped to their corresponding arrays of buses. 
Each bus has four fields:
- `bus_type` (expressbus/bus/trol)
- `bus_num`
- `bus_direction`
- `bus_time` (time until the bus arrives in the format `"X min"`)

#### Parameters

- `stop_ids` *(Array\<string\>)* — An array of bus stop identifiers to gather the timetables for. Example values:  
  - **2016**: Licėjus (Akropolio kryptimi)  
  - **0710**: Licėjus (Žirmunų kryptimi)  
  - **0804**: Pramogų arena, Kareivių g. (Žirmūnų kryptimi)  
  - **0802**: Pramogų arena, Kalvarijų g. (Santariškių kryptimi)  
  - **0709**: Pramogų arena, Kalvarijų g. (Centro kryptimi)  
  - **2015**: Pramogų arena, Kareivių g. (Ozo kryptimi)  
  - **0708**: Tauragnų st. (Centro kryptimi)  
  - **0803**: Tauragnų st. (Santariškių kryptimi)  

For a full list of available `stop_ids`, consult [this Google Spreadsheet](https://docs.google.com/spreadsheets/d/1FaRhmFvxCVLVhHCnEjrGq3l42fSa1R648fk2H3xqHuQ/pubhtml).