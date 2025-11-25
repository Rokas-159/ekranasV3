import express from 'express';
const app=express();
import { request } from "https";
const port=8080;
let temperature = 69;
function main(){
  getTemperature();
  setInterval(getTemperature,10*60000)
}

app.listen(port,()=>{
    console.log('live on port '+port);
});

function getTemperature(){
  var url="https://api.open-meteo.com/v1/forecast?latitude=54.6892&longitude=25.2798&hourly=temperature_2m&timezone=auto&forecast_days=1";
  var req = request(url,res=>{
    res.on('data', (chunk) => {
      let instant = new Date();
      const obj = JSON.parse(chunk);
      result = obj.hourly.temperature_2m[instant.getHours()];
      console.log(result);
      temperature = result;
    });
  });
  req.on('error', (err) => {
    console.log("Huston, we have ein problem.");
  });

  req.end();
}

app.get('/getWeather', (req, res) => { 
    res.send(temperature); 
}); 


app.get('/test',(req,res)=>{
    console.log('route /test')
    var response=req.query;
    console.log(response);
    res.send(response);
});
main();