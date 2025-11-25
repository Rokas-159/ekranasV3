import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { exit } from 'process';

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

app.get('/file', (req, res) => { 
    res.sendFile(path.join(HTML_FOLDER_PATH, "placeholder.html"));
});