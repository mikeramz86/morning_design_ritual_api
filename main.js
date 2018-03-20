var weather;

var url = 'http://api.openweathermap.org/data/2.5/weather?q=Portland&APPID=2ba09e63b596e2cf8a13f62cadc938ea&units=metric';

function setup() {
    createCanvas(400,200);
    loadJSON(url,gotData);
}

function gotData(data) {
    weather = data;
}

function draw() {
    backround(0);
    if (weather) {
        var temp = wather.main.temp;
        var humidity = weather.main.humidty;
        return temp
    }
}
