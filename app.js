const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

});


app.post("/", function(req, res) {
    console.log("Post request recieved!")
    const city = req.body.cityName
    const apiKey = "f78bf422420665cdd451af4397d162c1"
    const units = req.body.units

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function(weatherRes) {
        console.log(weatherRes.statusCode);

        weatherRes.on("data", function(data) {
            const weatherData = JSON.parse(data); 
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon
            const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            console.log(temp);
            console.log(description);

            res.write("<h1>The temperature in " + city + " is " + temp + " degrees.</h1>");
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<img src=" + imgUrl + ">");
            res.send();
        });
    });
});





app.listen(3000, function() {
    console.log("Server is running on port 3000.")
});