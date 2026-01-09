import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { exit } from 'process';

const busInfo = await import('../modules/buses/getBusStopInfo.js');
const weatherInfo = await import('../modules/weather/getWeatherInfo.js');

dotenv.config({quiet: true});
const PORT = process.env.PORT;
if (typeof PORT === "undefined"){
	console.error("Error: environment variable PORT is undefined.")
	exit(1)
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTML_FOLDER_PATH = path.join(__dirname, "../html");

var app = express();

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

app.use(express.static(HTML_FOLDER_PATH));

app.get('/api/buses', async (req, res) => {
    // syntax: /api/buses?stop_ids=0000,1111,2222
    const stop_ids = req.query.stop_ids.split(",");
    const bus_data = await busInfo.getBusStopInfo(stop_ids);
    res.json(bus_data);
});

app.get('/api/weather', async (req, res) => {
    const displayed_hours = req.query.displayed_hours.split(",");
    const days_ahead = req.query.days_ahead;
    const weather_data = await weatherInfo.getWeatherInfo(displayed_hours, days_ahead);
    res.json(weather_data);
});